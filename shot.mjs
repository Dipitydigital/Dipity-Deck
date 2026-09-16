// Screenshot every slide at a given viewport. Usage: node shot.mjs <w> <h> <outdir>
import { chromium } from 'playwright-core';
const [w, h, outdir] = [parseInt(process.argv[2]), parseInt(process.argv[3]), process.argv[4]];
const exe = process.env.LOCALAPPDATA + '\\ms-playwright\\chromium-1243\\chrome-win64\\chrome.exe';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: w, height: h } });
await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
await page.addStyleTag({ content: '.rv{opacity:1!important;transform:none!important}' });
const n = await page.locator('section').count();
for (let i = 0; i < n; i++) {
  await page.locator('section').nth(i).scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${outdir}/slide-${String(i + 1).padStart(2, '0')}.png` });
}
await browser.close();
console.log(`${n} slides shot at ${w}x${h}`);
