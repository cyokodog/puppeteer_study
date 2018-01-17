const puppeteer = require('puppeteer');
const Path = require('path');
(async () => {
  const savedName = 'hn.pdf';
  const savedPath = Path.resolve(__dirname, '..', 'result', savedName);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle'});
  await page.pdf({path: savedPath, format: 'A4'});

  browser.close();
})();