const fs = require('fs');
const path = require('path');

const secretDir = path.join(__dirname, 'secret-folder/');

fs.readdir(secretDir, { withFileTypes: true }, (err, files) => {
  const onlyFiles = files.filter((item) => item.isFile()).map((item) => item.name);

  onlyFiles.forEach((file) => {
    fs.stat(secretDir + file, (err, stats) => {
      const size = (stats.size / 1000).toFixed(3);
      const ext = path.parse(`${file}`).ext.slice(1);
      const name = path.parse(`${file}`).name;

      console.log(`${name} - ${ext} - ${size}kb`);
    });
  });
});
