const fs = require('fs'),
      data = require('./urls.json'),
      path = require('path'),
      exec = require('child_process').exec,
      dist = path.join(__dirname,'/dist'),
      urls = data.urls,
      dataLength = data.urls.length;

(() => {
  for (let i = 0; i < dataLength; i++) {
    const command = `curl ${urls[i]?.url}`,
          name = urls[i].name;
    exec(command, (err, stdout) => {
      if (err) throw err;
      console.log(`stdout: ${stdout}`);
      fs.writeFile(`${dist}/${name}.html`, stdout, (err) => {
        if (err) throw err;
        console.log(`${name}.html created`);
      });
    });
  }
})();