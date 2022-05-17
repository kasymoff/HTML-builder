const fs = require('fs');
const readline = require('readline');
const path = require('path');
const chalk = require('chalk');

const filePath = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.unlink(filePath, err => {
  if (err) null;
});

console.log(chalk.blue('Please enter your text below:'));

rl.on('line', (chunk) => {
  if (chunk === 'exit') {
    console.log(chalk.red('\nBYE BYE !!!'));
    process.exit(0);
  }
  fs.writeFile(filePath, chunk + '\n', { flag: 'a' }, err => {
    if (err) console.error(err);
  });
});

rl.on('close', function () {
  console.log(chalk.red('\nBYE BYE !!!'));
  process.exit(0);
});
