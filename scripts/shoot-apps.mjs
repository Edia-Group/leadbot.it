import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "C:/Users/filip/IdeaProjects/leadbot.it/.omc/screenshots";
mkdirSync(OUT, { recursive: true });

const targets = [
  ["builder-signin", "http://localhost:3005/"],
  ["viewer-root", "http://localhost:3001/"],
];

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const [name, url] of targets) {
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log(`OK ${name} -> ${page.url()}`);
  } catch (e) {
    console.log(`ERR ${name}: ${e.message}`);
  }
}
await browser.close();
console.log("DONE");
