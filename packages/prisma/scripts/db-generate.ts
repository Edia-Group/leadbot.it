import { executePrismaCommand } from "./executeCommand";
import { patchEffectClient } from "./patchEffectClient";
import { withPrismaGenerateLock } from "./prismaGenerateDevLock";

const isWindowsFileLockError = (message: string) =>
  message.includes("EPERM") ||
  message.includes("operation not permitted") ||
  message.includes("EBUSY");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const run = async () => {
  await withPrismaGenerateLock(async () => {
    const maxAttempts = process.platform === "win32" ? 12 : 1;
    const baseDelayMs = 1000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await executePrismaCommand("prisma generate --no-hints", {
          force: true,
        });
        break;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (!isWindowsFileLockError(message) || attempt === maxAttempts) {
          if (
            process.platform === "win32" &&
            attempt === maxAttempts &&
            isWindowsFileLockError(message)
          ) {
            throw new Error(
              [
                message,
                "",
                "Prisma could not replace the Windows query engine DLL because it is still in use.",
                "Stop dev servers, test runners, and any Node/Bun process that loads @prisma/client, then run db:generate again.",
                "If it persists, close other terminals/IDE windows using this repo or temporarily pause real-time antivirus on node_modules/.prisma.",
              ].join("\n"),
            );
          }
          throw error;
        }
        const delayMs = baseDelayMs * attempt;
        console.warn(
          `prisma generate: engine file busy (Windows); attempt ${attempt}/${maxAttempts}, waiting ${delayMs}ms.`,
        );
        await sleep(delayMs);
      }
    }

    await patchEffectClient();
  });
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
