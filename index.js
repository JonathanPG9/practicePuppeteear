const fs = require('fs'),
      data = require('./urls.json'),
      path = require('path'),
      exec = require('child_process').exec,
      dist = path.join(__dirname,'/dist'),
      urls = data.urls,
      dataLength = data.urls.length;
let count = 0; // the purpose of the count variable is just to test the same url with mapbox because writeFile overwrites the file with the same name
(() => {
  for (let i = 0; i < dataLength; i++) {
    const command = `curl ${urls[i]?.url}`,
          name = urls[i].name,
          domainName = `${urls[i]?.url.split("/")[2]}`,
          nameFolder = `${dist}/${domainName}`;
    if (!fs.existsSync(nameFolder)){
        fs.mkdirSync(nameFolder);
    };
    exec(command, (err, stdout) => {
      if (err) throw err;
      if(stdout.indexOf("mapbox") != -1 ) {
          if (!fs.existsSync(`${nameFolder}/mapbox`)){
            fs.mkdirSync(`${nameFolder}/mapbox`);
        };
        fs.writeFile(`${nameFolder}/mapbox/${name}${count++}.html`, stdout, (err) => {
          if (err) throw err;
        });
      }
      else {
        fs.writeFile(`${nameFolder}/${name}.html`, stdout, (err) => {
          if (err) throw err;
        });
      };
    });
  }
})();