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
    fs.stat(folderName, (err) => {
      if (err.code === null) return console.log(`${folderName} exist`); // folder exist
      if (err.code === 'ENOENT') {
        // folder does not exist
        fs.mkdir(folderName, () => {
          fs.mkdir(pathFolder, (err) => {
            if (err) console.log(err);
            exec(command, (err, stdout, stderr) => {
              if (err) {
                console.log(err)
                const message = `${command}\n ${stderr}`;
                fs.appendFile(`error.txt`, message, (error) => {
                  if (error) console.log(error);
                });
              }
              fs.writeFile(`${pathFolder}/index.html`, stdout, (err) => {
                if (err) console.log(err);
              });
            });
          })
        })
      }
    })
  }
})();