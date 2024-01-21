const fs = require('fs');
const path = require('path');

const filesDir = path.join(__dirname, 'files/');
const copyDir = path.join(__dirname, 'files-copy/');

fs.mkdir(path.join(__dirname, 'files-copy'), () => {});

fs.rm(copyDir, { recursive: true }, () => {
  fs.mkdir(path.join(__dirname, 'files-copy'), () => {});

  fs.readdir(filesDir, { withFileTypes: true }, (err, files) => {
    const onlyFiles = files
      .filter((item) => item.isFile())
      .map((item) => item.name);

    onlyFiles.forEach((file) => {
      fs.copyFile(filesDir + file, copyDir + file, () => {});
    });
  });
});
