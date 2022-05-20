const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, (err, files) => { 
  if (err) console.log(err);
  files.forEach((file) => {
    const currentPath = path.join(folderPath, file);
    fs.stat(currentPath, (err, stats) => {
      if (err) {
        console.log(err);
      } else {
        if (stats.isFile()) console.log(path.parse(file).name + ' - ' + path.extname(file).slice(1) + ' - ' + (stats.size/1024).toFixed(3) + ' KB');
      }
    });
  });
});
