const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist', 'bundle.css');

(async function createCss () {
  try {
    fs.writeFile(distPath, '', err => {
      if (err) console.log(err);
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
              fs.appendFile(distPath, data + '\n\n', err => {
                if (err) console.log(err);
              });
            });
          }
        });
      });
    });

    console.log('Styles created successfully!');
  } catch (err) {
    console.log('Error creating styles: ' + err);
  }
})();
