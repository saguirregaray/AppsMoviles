const fs = require('fs');
console.time('syn');
const data = fs.readFileSync('../images/bricks.png');
console.timeEnd('syn');

console.time('callback');
console.time('asyn');
fs.readFile('/Users/gustavogretter/Downloads/zigly1.gif', (err, data) => {
    console.timeLog('callback');
});
console.timeEnd('asyn');