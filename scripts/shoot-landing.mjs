import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "C:/Users/filip/IdeaProjects/leadbot.it/.omc/screenshots";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto("http://localhost:3003/", { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(1200);

await page.screenshot({ path: `${OUT}/landing-hero.png` });
console.log("OK hero");

await page.screenshot({ path: `${OUT}/landing-full.png`, fullPage: true });
console.log("OK full");

await browser.close();
console.log("DONE");
