const fs = require('fs');
const path = require('path');

const dirPath = fs.createReadStream(path.join(__dirname, 'styles/')).path;
const distFolder = fs.createReadStream(
  path.join(__dirname, 'project-dist/'),
).path;
const writeStream = fs.createWriteStream(distFolder + 'bundle.css');

fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
  const filter = files.filter((item) => item.isFile()).map((item) => item.name);

  filter.forEach((file) => {
    if (file.endsWith('.css')) {
      fs.createReadStream(dirPath + file).pipe(writeStream);
      console.log(dirPath);
    }
  });
});
