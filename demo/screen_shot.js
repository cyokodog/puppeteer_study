const puppeteer = require('puppeteer');
const Path = require('path');
puppeteer.launch().then(async browser => {
  const savedName = 'screen_shot.png';
  const savedPath = Path.resolve(__dirname, '..', 'result', savedName);
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  await page.screenshot({path: savedPath});
  await browser.close();
});
