const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.unlink(distPath, err => {
  if (err) null;
});

fs.writeFile(distPath, '', err => {
  if (err) null;
});

fs.readdir(stylesPath, (err, files) => {
  if (err) null;
  files.forEach(file => {
    const currentPath = path.join(stylesPath, file);
    fs.stat(currentPath, (err, stats) => {
      if (err) null;
      if (stats.isFile() && path.extname(file) === '.css') {
        fs.readFile(currentPath, (err, data) => {
          if (err) null;
          fs.appendFile(distPath, data, err => {
            if (err) null;
          });
        });
      }
    });
  });
});
