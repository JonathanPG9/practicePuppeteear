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
    fs.stat(folderName, function (err) {
      if (err.code === 'ENOENT') {
        // file does not exist
        fs.mkdir(folderName, () => {
          fs.mkdir(pathFolder, (err) => {
            if (err) return err
            exec(command, (err, stdout) => {
              if (err) console.log(err)
              fs.writeFile(`${pathFolder}/index.html`, stdout, (err) => {
                if (err) console.log(err)
              });
            });
          })
        })
      } else {
        console.log(err);
      }
    })
  }
})();