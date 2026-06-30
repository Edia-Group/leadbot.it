import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3010";
const OUT = "C:/Users/filip/IdeaProjects/leadbot.it/.omc/screenshots";
mkdirSync(OUT, { recursive: true });

const routes = [
  ["dashboard", "/"],
  ["cervello", "/cervello"],
  ["workflow", "/workflow"],
  ["appuntamenti", "/appuntamenti"],
  ["chatbot", "/chatbot"],
  ["portale", "/portale"],
  ["integrazioni", "/integrazioni"],
];

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

for (const [name, path] of routes) {
  try {
    await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(700);
    const file = `${OUT}/${name}.png`;
    await page.screenshot({ path: file });
    console.log(`OK  ${path} -> ${file}`);
  } catch (e) {
    console.log(`ERR ${path}: ${e.message}`);
  }
}

await browser.close();
console.log("DONE");
