// Render each .banner artboard in banners.html to a 2x PNG. Run from repo root: node banners/render.mjs
import { chromium } from 'playwright-core';
const exe = process.env.LOCALAPPDATA + '/ms-playwright/chromium-1243/chrome-win64/chrome.exe';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1700, height: 1400 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:4173/banners/banners.html', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
for (const id of ['x', 'li-personal', 'li-company']) {
  await page.locator('#' + id).screenshot({ path: `banners/banner-${id}.png` });
  console.log(`banner-${id}.png`);
}
await browser.close();
