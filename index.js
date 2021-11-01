const puppeteer = require('puppeteer');
const fs = require('fs');
const data = require('./urls.json');
const path = require('path');
const dist = path.join(__dirname,'/','dist');
const dataLength = data.urls.length;
const exec = require('child_process').exec;

(() => { 
  for (let i = 0; i < dataLength; i++) {
    let command = `curl ${data.urls[i].url}`
    exec(command, (err, stdout, stderr) => {
      if (err) {
        return err;
      }
      console.log(`stdout: ${stdout}`);
    fs.writeFile(`${data.urls[i].name}.html`,stdout,(err) => {
      if(err) throw err;
      console.log(`${data.urls[i].name}.html created`);
      fs.rename(__dirname + `/${data.urls[i].name}.html`,dist + `/${data.urls[i].name}.html`, (err) => {
        if (err) throw err;
        console.log(`Move ${data.urls[i].name}.html complete.`);
      });
    });
  }); 
  }
})();