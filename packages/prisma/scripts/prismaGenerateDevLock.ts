import { mkdir, open, readFile, unlink } from "fs/promises";
import { dirname, join } from "path";

/** Serialize prisma generate across Turbo workers / parallel terminals (Windows EPERM on query_engine rename). */
const LOCK_RELATIVE_SEGMENTS = [
  "node_modules",
  ".prisma",
  "prisma-generate.lock",
];
const STALE_LOCK_MS = 10 * 60 * 1000;
const ACQUIRE_LOCK_MS = 4 * 60 * 1000;

function getLockPath(): string {
  return join(__dirname, "../../..", ...LOCK_RELATIVE_SEGMENTS);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function withPrismaGenerateLock<T>(
  run: () => Promise<T>,
): Promise<T> {
  const lockPath = getLockPath();
  await mkdir(dirname(lockPath), { recursive: true });

  const waitDeadline = Date.now() + ACQUIRE_LOCK_MS;
  let lockHandle: Awaited<ReturnType<typeof open>> | undefined;

  while (Date.now() < waitDeadline) {
    try {
      lockHandle = await open(lockPath, "wx");
      await lockHandle.writeFile(
        JSON.stringify({
          pid: process.pid,
          startedAt: Date.now(),
        }),
        "utf8",
      );
      break;
    } catch {
      try {
        const raw = await readFile(lockPath, "utf8");
        const data = JSON.parse(raw) as { startedAt?: number };
        if (
          typeof data.startedAt === "number" &&
          Date.now() - data.startedAt > STALE_LOCK_MS
        ) {
          await unlink(lockPath).catch(() => {});
        }
      } catch {
        await unlink(lockPath).catch(() => {});
      }
      await sleep(200 + Math.random() * 300);
    }
  }

  if (!lockHandle) {
    throw new Error(
      `Could not acquire Prisma generate lock after ${ACQUIRE_LOCK_MS}ms. Delete ${lockPath} if no other install/dev is running.`,
    );
  }

  try {
    return await run();
  } finally {
    try {
      await lockHandle.close();
    } catch {
      // ignore
    }
    try {
      await unlink(lockPath);
    } catch {
      // ignore
    }
  }
}
