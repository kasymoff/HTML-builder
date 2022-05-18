const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy');

fs.mkdir(copyFolderPath, err => {
  if (err) null;
});

fs.readdir(copyFolderPath, (err, files) => {
  if (err) null;
  files.map(file => fs.unlink(path.join(copyFolderPath, file), err => err ? null : null));
});

fs.readdir(folderPath, (err, files) => {
  if (err) null;
  files.map(file => {
    fs.copyFile(path.join(folderPath, file), path.join(copyFolderPath, file), err => {
      if (err) null;
    });
  });
});
