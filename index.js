const fs = require('fs'),
      path = require('path'),
      exec = require('child_process').exec,
      destinationFolder = path.join(__dirname,'/interactives'),
      urls = require("./urls"),
      dataLength = urls.length;
let messageError = '';
(() => {
  fs.mkdirSync(destinationFolder);
  for (let i = 1; i < dataLength; i++) {
    const command = `curl ${urls[i]}`,
          domainName = `${urls[i]?.split('.')[1]}`,
          pathUrl = `${urls[i].slice(urls[i].indexOf(".com/") + 5, urls[i].trim().length - 1)}`,
          pathFolder = `${destinationFolder}/${domainName}/${pathUrl}`;
    exec(command, (err, stdout) => {
      if (err) {
        console.log(err)
        messageError += command.slice(5);
        fs.appendFile(`${destinationFolder}/error.txt`, messageError, (err) => {
          if (err) console.log(err);
        })
      }
      else {
        fs.mkdir(pathFolder, { recursive: true }, (err) => {
          if (err) console.log(err);
          fs.writeFile(`${pathFolder}/index.html`, stdout, (err) => {
            if (err) console.log(err);
          });
        })
      }
    })
  }
})();
