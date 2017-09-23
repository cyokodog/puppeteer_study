const puppeteer = require('puppeteer');
const assert = require("assert");

describe('TODOアプリのテスト', function(){

  // mocha のタイムアウトを設定
  this.timeout(5000);

  const appUrl = 'http://localhost:8080/demo/todo.html';
  let browser, page;

  before(async function(done){

    // CIとlocalでpuppeteerの起動パラメータを切り替える
    const params = process.env.CI ? {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    } : {
      headless: false,
      slowMo: 250
    };

    browser = await puppeteer.launch(params);
    page = await browser.newPage();
    page.on('console', console.log);
    done();
  });

  describe('画面遷移時', () => {

    before(async function(done){
      await page.goto(appUrl, {waitUntil: 'networkidle'});
      done();
    });

    it('タスクが2つ表示されていること', async () => {
      const tasks = await page.$$('.tasks li');
      assert.equal(tasks.length, 2);
    });
  });
  
  describe('新規タスク入力後', () => {

    const newTaskValue = '勉強するぞ！';

    before(async function(done){
      await page.focus('.newTask');    
      await page.type(newTaskValue);
      await page.click('input[type=submit]');
      done();
    });

    it('タスクが3つ表示されること', async () => {
      const tasks = await page.$$('li');
      assert.equal(tasks.length, 3);
    });

    it('新規タスク入力フィールドが空になっていること', async () => {
      const val = await page.evaluate(() => 
        document.querySelector('.newTask').value
      );
      assert.equal(val, '');
    });

    it('最終行に表示されたタスクが新規入力したタスクと一致すること', async () => {
      const val = await page.evaluate(() => {
        const list = document.querySelectorAll('.tasks li');
        return list.length ? list[list.length-1].innerText : '';
      });
      assert.equal(val, newTaskValue);
    });

  });

  after(async (done) => {
    browser.close();
    done();
  });
  
});
