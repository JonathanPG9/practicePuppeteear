const puppeteer = require('puppeteer');
const fs = require('fs');
const data = require('./urls.json');
const path = require('path');
const dist = path.join(__dirname,"/","dist");

( async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const dataLength = data.urls.length;
    for (let i = 0; i < dataLength; i++) {
      await page.goto(data.urls[i].url,{
          waitUntil: 'networkidle2',
        });
      let html = await page.content()
      fs.writeFile(`${data.urls[i].name}.html`,html,(err) => {
        if(err) throw err;
        console.log(`${data.urls[i].name}.html created`)
        fs.rename(__dirname + `/${data.urls[i].name}.html`,dist + `/${data.urls[i].name}.html`, (err) => {
          if (err) throw err;
          console.log(`Move ${data.urls[i].name}.html complete.`);
        });
      })
      if(i === data.urls.length - 1) return await browser.close();
    }
  }
  catch(err) {
    return err
  }
})();
