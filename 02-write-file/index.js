const fs = require('fs');
const readline = require('readline');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.unlink(filePath, err => {
  if (err) null;
});

fs.writeFile(filePath, '', err => {
  if (err) null;
});

console.log('Please enter your text below:');

rl.on('line', (chunk) => {
  if (chunk === 'exit') {
    console.log('\nBye Bye !!!');
    process.exit(0);
  }
  fs.writeFile(filePath, chunk + '\n', { flag: 'a' }, err => {
    if (err) console.error(err);
  });
});

rl.on('close', function () {
  console.log('\nBye Bye !!!');
  process.exit(0);
});
