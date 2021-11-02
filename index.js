const fs = require('fs');
const data = require('./urls.json');
const path = require('path');
const dist = path.join(__dirname,'/dist');
const exec = require('child_process').exec;
const urls = data.urls;
const dataLength = data.urls.length;

(() => {
  for (let i = 0; i < dataLength; i++) {
    const command = `curl ${urls[i]?.url}`;
    exec(command, (err, stdout) => {
      if(err) throw err;
      console.log(`stdout: ${stdout}`);
    fs.writeFile(`${urls[i].name}.html`, stdout, (err) => {
      if(err) throw err;
      console.log(`${urls[i].name}.html created`);
      fs.rename(`${__dirname}/${urls[i].name}.html`,`${dist}/${urls[i].name}.html`, (err) => {
        if(err) throw err;
        console.log(`Move ${urls[i].name}.html complete.`);
        });
      });
    }); 
  };
})();