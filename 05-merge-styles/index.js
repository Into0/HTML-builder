const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles/');
const distDir = path.join(__dirname, 'project-dist/');

const bundleCSS = fs.createWriteStream(distDir + 'bundle.css');

fs.readdir(stylesDir, { withFileTypes: true }, (err, files) => {
  const onlyFiles = files
    .filter((item) => item.isFile())
    .map((item) => item.name);

  onlyFiles.forEach((file) => {
    if (file.endsWith('.css')) {
      fs.createReadStream(stylesDir + file).pipe(bundleCSS);
    }
  });
});
