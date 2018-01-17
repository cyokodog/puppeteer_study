const puppeteer = require('puppeteer');
const Path = require('path');
puppeteer.launch({
  headless: false,
  slowMo: 250 // slow down by 250ms
}).then(async browser => {
  const page = await browser.newPage();
  const savedName = 'search_result.png';
  const savedPath = Path.resolve(__dirname, '..', 'result', savedName);
  await page.goto('http://www.google.com', {waitUntil: 'networkidle'});
  await page.type('headless chrome puppeteer');
  await page.click('input[type="submit"]');
  await page.waitForNavigation();
  await page.screenshot({path: savedPath});
  browser.close();
});
