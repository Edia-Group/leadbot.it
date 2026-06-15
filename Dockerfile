# ================= INSTALL BUN ===================
ARG BUN_VERSION=1.3.6
FROM debian:bullseye-slim AS build-bun
ARG BUN_VERSION
RUN apt-get update -qq \
    && apt-get install -qq --no-install-recommends \
    ca-certificates \
    curl \
    dirmngr \
    gpg \
    gpg-agent \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && arch="$(dpkg --print-architecture)" \
    && case "${arch##*-}" in \
    amd64) build="x64-baseline";; \
    arm64) build="aarch64";; \
    *) echo "error: unsupported architecture: $arch"; exit 1 ;; \
    esac \
    && version="$BUN_VERSION" \
    && case "$version" in \
    latest | canary | bun-v*) tag="$version"; ;; \
    v*)                       tag="bun-$version"; ;; \
    *)                        tag="bun-v$version"; ;; \
    esac \
    && case "$tag" in \
    latest) release="latest/download"; ;; \
    *)      release="download/$tag"; ;; \
    esac \
    && curl "https://github.com/oven-sh/bun/releases/$release/bun-linux-$build.zip" \
    -fsSLO \
    --compressed \
    --retry 5 \
    || (echo "error: failed to download: $tag" && exit 1) \
    && for key in \
    "F3DCC08A8572C0749B3E18888EAB4D40A7B22B59" \
    ; do \
    gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys "$key" \
    || gpg --batch --keyserver keyserver.ubuntu.com --recv-keys "$key" ; \
    done \
    && curl "https://github.com/oven-sh/bun/releases/$release/SHASUMS256.txt.asc" \
    -fsSLO \
    --compressed \
    --retry 5 \
    && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
    || (echo "error: failed to verify: $tag" && exit 1) \
    && grep " bun-linux-$build.zip\$" SHASUMS256.txt | sha256sum -c - \
    || (echo "error: failed to verify: $tag" && exit 1) \
    && unzip "bun-linux-$build.zip" \
    && mv "bun-linux-$build/bun" /usr/local/bin/bun \
    && rm -f "bun-linux-$build.zip" SHASUMS256.txt.asc SHASUMS256.txt \
    && chmod +x /usr/local/bin/bun \
    && which bun \
    && bun --version

# ================= ADD BUN IN NODE 22 IMAGE ===================

FROM node:22-bullseye-slim AS base
ARG BUN_RUNTIME_TRANSPILER_CACHE_PATH=0
ENV BUN_RUNTIME_TRANSPILER_CACHE_PATH=${BUN_RUNTIME_TRANSPILER_CACHE_PATH}
ARG BUN_INSTALL_BIN=/usr/local/bin
ENV BUN_INSTALL_BIN=${BUN_INSTALL_BIN}
COPY --from=build-bun /usr/local/bin/bun /usr/local/bin/bun
RUN groupadd bun \
    --gid 2000 \
    && useradd bun \
    --uid 2000 \
    --gid bun \
    --shell /bin/sh \
    --create-home \
    && ln -s /usr/local/bin/bun /usr/local/bin/bunx \
    && which bun \
    && which bunx \
    && bun --version
RUN apt-get -qy update \
    && apt-get -qy --no-install-recommends install openssl ca-certificates git python3 g++ build-essential \
    && update-ca-certificates
WORKDIR /app

# ================= TURBO PRUNE ===================

FROM base AS pruned
ARG SCOPE
COPY . .
RUN bunx turbo prune "${SCOPE}" --docker

# =============== INSTALL & BUILD =================

FROM base AS builder
ARG BUN_PKG_MANAGER
ARG SCOPE
ARG APP_DIR
ARG DATABASE_URL=postgresql://
# Build-resource caps to avoid OOM-ing a shared host (Dokploy). Tune via buildArgs:
#   MAKE_JOBS         parallel native (g++) compile jobs for isolated-vm/sharp
#   BUILD_CONCURRENCY turbo tasks built in parallel (workspace packages)
#   NODE_HEAP_MB      max old-space per Node process during the build
ARG MAKE_JOBS=2
ARG BUILD_CONCURRENCY=1
ARG NODE_HEAP_MB=4096
COPY --from=pruned /app/out/full/ .
COPY bun.lock .
COPY bunfig.toml .
RUN SENTRYCLI_SKIP_DOWNLOAD=1 MAKEFLAGS="-j${MAKE_JOBS}" bun install
RUN SKIP_ENV_CHECK=true NEXT_PUBLIC_VIEWER_URL=http://localhost \
    NODE_OPTIONS="--max-old-space-size=${NODE_HEAP_MB}" \
    bunx turbo build --filter="${SCOPE}" --concurrency=${BUILD_CONCURRENCY}
RUN DATABASE_URL=$DATABASE_URL bunx tsx packages/prisma/scripts/db-generate.ts

# Runtime-only tools, kept outside the app's node_modules: prisma CLI for
# migrations at boot, next-runtime-env for the entrypoint's __ENV.js generation.
# Everything else the server needs is already traced into .next/standalone.
RUN mkdir /runtime-deps && cd /runtime-deps \
    && npm install --no-audit --no-fund \
    "prisma@$(node -p "require('/app/packages/prisma/package.json').dependencies.prisma")" \
    "next-runtime-env@$(node -p "require('/app/apps/${APP_DIR}/package.json').devDependencies['next-runtime-env']")"

# ================== RELEASE ======================

FROM node:22-bullseye-slim AS release
ARG APP_DIR
ENV APP_DIR=${APP_DIR}
RUN apt-get -qy update \
    && apt-get -qy --no-install-recommends install openssl ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && update-ca-certificates
WORKDIR /app
COPY --from=builder /runtime-deps/node_modules ./node_modules
COPY --from=builder /app/packages/prisma/postgresql ./packages/prisma/postgresql
COPY --from=builder --chown=node:node /app/apps/${APP_DIR}/.next/standalone ./
COPY --from=builder --chown=node:node /app/apps/${APP_DIR}/.next/static ./apps/${APP_DIR}/.next/static
COPY --from=builder --chown=node:node /app/apps/${APP_DIR}/public ./apps/${APP_DIR}/public

COPY scripts/${APP_DIR}-entrypoint.sh ./
RUN chmod +x ./${APP_DIR}-entrypoint.sh
ENTRYPOINT ./${APP_DIR}-entrypoint.sh

EXPOSE 3000
ENV PORT=3000
