const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const projectDist = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const indexPath = path.join(projectDist, 'index.html');
const stylesPath = path.join(__dirname, 'styles');
const stylesDist = path.join(projectDist, 'style.css');
const assetsPath = path.join(__dirname, 'assets');
const projectDistAssets = path.join(projectDist, 'assets');

async function createFolder(dest) {
  try {
    await fs.promises.rm(dest, { recursive: true, force: true }, err => console.log(err)).then(() => {
      fs.mkdir(dest, err => {
        if (err) throw err;
      });
    });
  } catch (err) {
    console.log(chalk.red(err));
  }
}

async function replaceFn(str, regex, callbackFn) {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = callbackFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}

async function createIndex() {
  const data = await fs.promises.readFile(templatePath, 'utf8');
  const result = await replaceFn(data, /{{[a-z]+}}/g, async (match) => {
    const componentName = match.split('').filter(char => char !== '{' && char !== '}').join('');
    const fetched = await fs.promises.readFile(path.join(componentsPath, `${componentName}.html`), 'utf8');
    return fetched;
  });
  
  fs.writeFile(indexPath, result, err => {
    if (err) throw err;
  });
}

async function createStyles() {
  fs.writeFile(stylesDist, '', err => {
    if (err) throw err;
  });
  fs.readdir(stylesPath, (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
      const currentPath = path.join(stylesPath, file);
      fs.stat(currentPath, (err, stats) => {
        if (err) console.log(err);
        if (stats.isFile() && path.extname(file) === '.css') {
          fs.readFile(currentPath, (err, data) => {
            if (err) console.log(err);
            fs.appendFile(stylesDist, data, err => {
              if (err) console.log(err);
            });
          });
        }
      });
    });
  });
}

async function copyDir(src, dest) {
  try {
    fs.promises.rm(dest, { recursive: true, force: true }, (err) => {
      if (err) throw err;
    }).then(() => {
      fs.mkdir(dest, (err) => {
        if (err) throw err;
      });
    }).then(() => {
      fs.readdir(src, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          const srcFile = path.join(src, file);
          const destFile = path.join(dest, file);
          fs.stat(srcFile, (err, stats) => {
            if (err) throw err;
            if (stats.isDirectory()) {
              copyDir(srcFile, destFile);
            } else {
              fs.copyFile(srcFile, destFile, (err) => {
                if (err) throw err;
              });
            }
          });
        });
      });
    });
  } catch (err) {
    return err;
  }
}

(async () => {
  try {
    await createFolder(projectDist);
    await createIndex();
    await createStyles();
    await copyDir(assetsPath, projectDistAssets);
    console.log(chalk.green('Build complete!'));
  } catch (err){
    console.log(chalk.red('Build failed!'), err);
  }
})();
