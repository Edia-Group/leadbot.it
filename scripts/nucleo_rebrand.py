#!/usr/bin/env python3
"""One-shot user-facing rebrand LeadBot/Leadbot -> NUCLEO.

Identifier-safe: protects React component identifiers (LeadBotLogo, WhyLeadbotCta,
the lazy `Leadbot` component), package scopes (@leadbot/*), the `Leadbot-demo`
publicId, the `/leadbots` route, and `leadbot-js`/`leadbot-lib` CDN paths.

Does NOT touch 'Typebot' identifiers or brand (handled separately / lower risk),
docker/compose/CI, or the rebrand plan file itself.
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Files skipped entirely: they only contain *identifiers* that collide with the
# display tokens (the lazy `Leadbot` component, LeadbotLogo*), no user-facing text.
SKIP = {
    "apps/landing-page/src/components/TypebotLogo.tsx",   # defines LeadbotLogo/Full
    "apps/landing-page/src/components/Typebot.tsx",       # defines lazy `Leadbot`
    "apps/landing-page/src/features/blog/components/mdx.tsx",  # imports/uses lazy `Leadbot`
    "packages/embeds/js/src/components/icons/TypebotLogo.tsx",
    "packages/embeds/js/src/components/LiteBadge.tsx",
    "apps/viewer/src/components/TypebotLogo.tsx",
    "apps/builder/src/components/TypebotLogo.tsx",
}

SKIP_DIRS = {".git", "node_modules", ".next", "dist", "build", ".turbo",
             ".omc", "coverage", ".playwright"}
EXTS = {".tsx", ".ts", ".json", ".mdx", ".md", ".example"}
ROOT_FILES = ["README.md", "TODO.md", "AGENTS.md", "CLAUDE.md",
              ".env.example", ".env.dev.example"]

# Ordered (regex, replacement). Applied top to bottom.
RULES = [
    (re.compile(r"docs\.leadbot\.it"), "docs.nucleoai.it"),
    (re.compile(r"app\.leadbot\.it"), "app.nucleoai.it"),
    (re.compile(r"leadbot\.it"), "nucleoai.it"),
    # natural-Italian fixes (plural brand reads badly -> "bot")
    (re.compile(r"i tuoi LeadBot"), "i tuoi bot"),
    (re.compile(r"gestire i LeadBot"), "gestire i bot"),
    (re.compile(r"il tuo LeadBot"), "il tuo bot"),
    (re.compile(r"Leadbot illimitati"), "Bot illimitati"),
    # brand tokens
    (re.compile(r"Leadbot\.it"), "NUCLEO"),
    (re.compile(r"LeadBot\.io"), "NUCLEO AI"),
    # protected: keep LeadBotLogo / WhyLeadBotCta
    (re.compile(r"(?<!Why)LeadBot(?!Logo|Cta)"), "NUCLEO"),
    # protected: keep WhyLeadbotCta path, LeadbotLogo, Leadbot-demo
    (re.compile(r"(?<!Why)Leadbot(?!Logo|-demo)"), "NUCLEO"),
]

def process(path, rel):
    with open(path, "r", encoding="utf-8") as f:
        original = f.read()
    text = original
    for rx, rep in RULES:
        text = rx.sub(rep, text)
    if text != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(text)
        # crude change count
        return sum(1 for a, b in zip(original.splitlines(), text.splitlines()) if a != b)
    return 0

def main():
    changed = []
    for base in ("apps", "packages"):
        for dirpath, dirnames, filenames in os.walk(os.path.join(ROOT, base)):
            dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
            for fn in filenames:
                ext = os.path.splitext(fn)[1]
                if ext not in EXTS:
                    continue
                full = os.path.join(dirpath, fn)
                rel = os.path.relpath(full, ROOT).replace("\\", "/")
                if rel in SKIP:
                    continue
                n = process(full, rel)
                if n:
                    changed.append((rel, n))
    for fn in ROOT_FILES:
        full = os.path.join(ROOT, fn)
        if os.path.exists(full):
            n = process(full, fn)
            if n:
                changed.append((fn, n))
    print(f"Changed {len(changed)} files:")
    for rel, n in sorted(changed):
        print(f"  {n:4d} lines  {rel}")

if __name__ == "__main__":
    main()
