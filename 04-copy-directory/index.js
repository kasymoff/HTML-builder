const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const folderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy');

function copyDir(src, dest) {
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

const copyFolder = (source, target) => {
  try {
    copyDir(source, target);
    console.log(chalk.green('Copy folder success'));
  } catch (err) {
    console.log(chalk.red('Copy folder fail'));
    console.log(chalk.red(err));
  }
};

copyFolder(folderPath, copyFolderPath);
