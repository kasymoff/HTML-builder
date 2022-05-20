const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

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
              fs.appendFile(distPath, data, err => {
                if (err) console.log(err);
              });
            });
          }
        });
      });
    });

    console.log(chalk.green('Styles created successfully!'));
  } catch (err) {
    console.log(chalk.red('Error creating styles: ' + err));
  }
})();
