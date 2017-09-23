const puppeteer = require('puppeteer');
puppeteer.launch({
  headless: false,
  slowMo: 250 // slow down by 250ms
}).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  page.on('console', (...args) => console.log('PAGE LOG:', ...args));
  await page.evaluate(() => console.log(`url is ${location.href}`));  
  browser.close();
});
