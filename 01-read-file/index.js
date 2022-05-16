const fs = require('fs');

const path = __dirname + '\\text.txt';

const reader = fs.createReadStream(path);

reader.on('data', (chunk) => {
  console.log(chunk.toString());
});
