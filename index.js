const fs = require('fs'),
      path = require('path'),
      exec = require('child_process').exec,
      destinationFolder = path.join(__dirname,'/static'),
      {urls} = require("./urls");
      dataLength = urls.length,
      classNames = ["usat-interactive-graphic",],
      classNamesLength = classNames.length;
let message = "";
(() => {
  for (let i = 1; i < dataLength; i++) {
    const command = `curl ${urls[i]}`,
          domainName = `${urls[i]?.split('.')[1]}`,
          pathUrl = `${urls[i].slice(urls[i].indexOf(".com/") + 5, urls[i].length - 2)}`,
          pathFolder = `${destinationFolder}/${domainName}/${pathUrl}`;
    exec(command, (err, stdout) => {
      if (err) {
        console.log(err)
        message += command.slice(5);
        fs.appendFile(`${destinationFolder}/error.txt`, message, (err) => {
          if (err) console.log(err);
        })
      }
      fs.mkdir(pathFolder, { recursive: true }, (err) => {
        if (err) console.log(err);
        let index = 0;
          while (classNamesLength > index) {
            const classFolder = classNames[index];
            if (stdout.includes(classFolder)) {
              fs.mkdir(`${pathFolder}/${classFolder}`, (err) => {
                if (err) console.log(err)
                fs.writeFile(`${pathFolder}/${classFolder}/index.html`, stdout, err => {
                  if(err) console.log(err)
                })
              })
            }
            else {
              fs.writeFile(`${pathFolder}/index.html`, stdout, (err) => {
                if (err) console.log(err);
              });
            }
            index++;
          }
      })
    })
  }
})();

 