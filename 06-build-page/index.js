const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const assetsDir = path.join(__dirname, 'assets/');
const compDir = path.join(__dirname, 'components/');
const distDir = path.join(__dirname, 'project-dist/');
const stylesDir = path.join(__dirname, 'styles/');

fs.mkdir(path.join(__dirname, 'project-dist'), () => {});

const templateFile = fs.createReadStream(
  path.join(__dirname, 'template.html'),
  'utf8',
);

templateFile.on('data', (tempData) => {
  fs.readdir(compDir, { withFileTypes: true }, (err, files) => {
    const onlyFiles = files
      .filter((item) => item.isFile())
      .map((item) => item.name);

    onlyFiles.forEach((file) => {
      if (file.endsWith('.html')) {
        const name = `{{${path.parse(file).name}}}`;
        const compFiles = fs.createReadStream(path.join(compDir, file));

        compFiles.on('data', (compData) => {
          tempData = tempData.replace(name, compData);
          fs.writeFile(distDir + 'index.html', tempData, () => {});
        });
      }
    });
  });
});

const cssFile = fs.createWriteStream(distDir + 'style.css');

fs.readdir(stylesDir, { withFileTypes: true }, (err, files) => {
  files.forEach((file) => {
    if (file.isFile() && file.name.endsWith('.css')) {
      fs.createReadStream(stylesDir + file.name).pipe(cssFile);
    }
  });
});

async function copyAssets() {
  let files = await fsp.readdir(assetsDir, {
    recursive: true,
    withFileTypes: true,
  });
  for (let file of files) {
    let assetsPath = path.join(file.path, file.name);
    let distPath = assetsPath.replace(assetsDir, path.join(distDir, 'assets/'));
    let dirs = path.dirname(distPath);
    if (file.isFile()) {
      await fsp.mkdir(dirs, { recursive: true });
      await fsp.copyFile(assetsPath, distPath);
    }
  }
}

copyAssets();
