const puppeteer = require('puppeteer');
puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  await page.screenshot({path: 'google_screenshot.png'});
  await browser.close();
});
