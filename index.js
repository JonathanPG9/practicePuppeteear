const puppeteer = require('puppeteer');
const fs = require('fs');

( async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/',{
      waitUntil: 'networkidle2',
    });
    await page.screenshot({path: 'test.jpg'});
    const html = await page.content()
    fs.writeFile('test.html',html,(err) => {
      if(err) return err
      console.log('html saved')
    })
    await browser.close();
  }
  catch(err) {
    return err
  }
})();
