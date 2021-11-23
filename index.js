const fs = require('fs'),
      data = require('./urls.json'),
      path = require('path'),
      exec = require('child_process').exec,
      dist = path.join(__dirname,'/dist'),
      urls = data.urls,
      dataLength = data.urls.length,
      classNames = ["mapbox","usat-interactive-graphic"],
      classNamesLength = classNames.length;
// let count = 0; // the purpose of the count variable is just to test the same url with mapbox because writeFile overwrites the file with the same name
(() => {
  for (let i = 0; i < dataLength; i++) {
    const command = `curl ${urls[i]?.url}`,
          name = urls[i].name,
          domainName = `${urls[i]?.url.split('/')[2]}`,
          folderName = `${dist}/${domainName}`;
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
    exec(command, (err, stdout) => {
      if (err) throw err;
      let index = 0;
      while (classNamesLength > index) {
        if (stdout.includes(classNames[index])) {
          if (!fs.existsSync(`${folderName}/${classNames[index]}`)) {
            fs.mkdirSync(`${folderName}/${classNames[index]}`);
          }
          if (fs.existsSync(`${folderName}/${name}.html`)) {
            fs.renameSync(`${folderName}/${name}.html`, `${folderName}/${classNames[index]}/${name}.html`);
          } else {
            fs.writeFile(`${folderName}/mapbox/${name}.html`, stdout, (err) => {
              if (err) throw err;
            });
          }
        } else {
          fs.writeFile(`${folderName}/${name}.html`, stdout, (err) => {
            if (err) throw err;
          });
        }
        index++;
      }
    });
  }
})();