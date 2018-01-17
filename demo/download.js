const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const fs = require('fs');
const Path = require('path');
puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  const savedName = 'download.jpeg';
  const savedPath = Path.resolve(__dirname, '..', 'result', savedName);
  const url = 'http://cdn-ak.f.st-hatena.com/images/fotolife/c/cyokodog-etc/20090329/20090329201219.jpg';
  const response = await fetch(url);
  const contentType = response.headers.get('content-type');               const buffer = await response.buffer();
  await fs.writeFileSync(savedPath, buffer);
  await browser.close();
});
