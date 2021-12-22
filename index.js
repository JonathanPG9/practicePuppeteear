const fs = require('fs'),
      path = require('path'),
      exec = require('child_process').exec,
      destinationFolder = path.join(__dirname,'/rescraped'),
      {test} = require("./urls");
      dataLength = test.length,
      classNames = ["usat-interactive-graphic",],
      classNamesLength = classNames.length;
let message = "";
(() => {
  for (let i = 1; i < dataLength; i++) {
    const command = `curl ${test[i]}`,
          domainName = `${test[i]?.split('.')[1]}`,
          pathUrl = `${test[i].slice(test[i].indexOf(".com/") + 5, test[i].length - 2)}`,
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

 