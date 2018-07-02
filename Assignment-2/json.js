/*
jshint esversion: 6
*/
/*
eslint no-use-before-define: ["error", { "functions": false, "classes": false, "variables": false }]
*/
/*
eslint-env es6
*/
/*
eslint no-plusplus: "error"
*/
/*
eslint no-cond-assign: "error"
*/
/*
eslint no-console: "error"
*/


const fs = require('fs');

let count = 0;
const e = [];
let k;

const readline = require('readline');

const stream = readline.createInterface({
  input: fs.createReadStream('chicagocrimes-1.csv'),
});

stream.on('line', (line) => {
  JSONConversion(line);
});

stream.on('close', () => save());

function JSONConversion(line) {

  if (count === 0) {
    k = line.split(',');
  } else {
    const c = line.split(',');
    const d = {};
    for (let j = 0; j < c.length; j++) {
      const key = k[j] ? k[j].replace(' ', '_') : '';
      d[key] = c[j];
    }
    e.push(d);
  }

  count += 1;
}

function save() {
  fs.writeFile('cvsasjson.json', JSON.stringify(e), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
}

