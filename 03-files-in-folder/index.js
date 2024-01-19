const fs = require('fs');
const path = require('path');

const dirPath = fs.createReadStream(path.join(__dirname, 'secret-folder')).path;

fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
  const filter = files.filter((item) => item.isFile()).map((item) => item.name);

  filter.forEach((file) => {
    fs.stat(dirPath + `\\${file}`, (err, stats) => {
      const size = (stats.size / 1024).toFixed(3);
      const ext = path.parse(`${file}`).ext.slice(1);
      const name = path.parse(`${file}`).name;

      console.log(`${name} - ${ext} - ${size}kb`);
    });
  });
});
