const fs = require('fs'),
      path = require('path'),
      exec = require('child_process').exec,
      destinationFolder = path.join(__dirname,'/newTask'),
      urls = require("./urls"),
      dataLength = urls.length;
let messageError = '';
(() => {
  fs.mkdirSync(destinationFolder);
  for (let i = 1; i < dataLength; i++) {
    const domainName = `${urls[i]?.split('.')[1]}`,
          pathUrl = `${urls[i].slice(urls[i].indexOf(".com/") + 5, urls[i].trim().length - 1)}`,
          pathFolder = `${destinationFolder}/${domainName}/${pathUrl}`,
          command = `curl -H Host:static.${domainName}.com https://usat-network-static.herokuapp.com/${pathUrl}/`;

    exec(command, (err, stdout) => {
        fs.mkdir(pathFolder, { recursive: true }, (err) => {
          if (err) console.log(err);
          fs.writeFile(`${pathFolder}/index.html`, stdout, (err) => {
            if (err) console.log(err);
          });
        })
    })
  }
})();
