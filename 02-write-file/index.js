const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeStream = fs.createWriteStream(
  path.join(__dirname, 'text.txt'),
  'utf8',
);

console.log('Hello, Write Some Text\n');

rl.on('line', (message) => {
  if (message === 'exit') {
    console.log('\nSee You Soon :)');
    process.exit();
  }
  writeStream.write(`${message}\n`);
});

rl.on('SIGINT', () => {
  console.log('\nSee You Soon :)');
  process.exit();
});
