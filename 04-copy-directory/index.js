const fs = require('fs');
const path = require('path');

const dirPath = fs.createReadStream(path.join(__dirname, 'files')).path;
const copyPath = fs.createReadStream(path.join(__dirname, 'files-copy')).path;

fs.mkdir(path.join(__dirname, 'files-copy'), () => {});

fs.rm(copyPath, { recursive: true }, () => {
  fs.mkdir(path.join(__dirname, 'files-copy'), () => {});

  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    const filter = files
      .filter((item) => item.isFile())
      .map((item) => item.name);
    filter.forEach((file) => {
      fs.copyFile(`${dirPath}\\${file}`, `${copyPath}\\${file}`, () => {});
    });
  });
});
