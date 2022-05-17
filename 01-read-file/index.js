const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

fs.createReadStream(filePath).on('data', (chunk) => {
  console.log(chunk.toString());
});
