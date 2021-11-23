const fs = require('fs'),
      path = require('path'),
      exec = require('child_process').exec,
      static = path.join(__dirname,'/static'),
      {urls} = require("./urlsString");
      dataLength = urls.length,
      classNames = ["mapbox","usat-interactive-graphic"],
      classNamesLength = classNames.length;
(() => {
  for (let i = 1; i < dataLength; i++) {
    const command = `curl ${urls[i]}`,
          domainName = `${urls[i]?.split('.')[1]}`,
          pathUrl = `${urls[i]?.split('/')[3]}`,
          folderName = `${static}/${domainName}`,
          pathFolder = `${folderName}/${pathUrl}`;
    if (!fs.existsSync(folderName)) {
      fs.mkdir(folderName,(err) => {
        if(err) throw err
      })
    }
    if (!fs.existsSync(pathFolder)) {
      fs.mkdir(pathFolder,(err) => {
        if(err) throw err
      })
    }
    exec(command, (err, stdout) => {
      if (err) console.log(err)
      let index = 0;
      while (classNamesLength > index) {
        if (stdout.includes(classNames[index])) {
          if (!fs.existsSync(`${pathFolder}/${classNames[index]}`)) {
            fs.mkdirSync(`${pathFolder}/${classNames[index]}`);
          }
          if (fs.existsSync(`${pathFolder}/index.html`)) {
            fs.renameSync(`${pathFolder}/index.html`, `${pathFolder}/${classNames[index]}/index.html`);
          } else {
            fs.writeFile(`${pathFolder}/${classNames[index]}/index.html`, stdout, (err) => {
              if (err) throw err;
            });
          }
        } else {
          fs.writeFile(`${pathFolder}/index.html`, stdout, (err) => {
            if (err) throw err;
          });
        }
        index++;
      }
    });
  }
})();