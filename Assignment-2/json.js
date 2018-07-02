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
const { StringDecoder } = require('string_decoder');

const decoder = new StringDecoder('utf8');
const stream = fs.createReadStream('chicagocrimes-1');

let data = '';

function onReadable() {
  let chunk; 
  while ((chunk = stream.read()) !== null) {
    const str = decoder.write(chunk);
    data += str;
  }
  JSONConversion(data);
}

stream.on('readable', () => {
  onReadable();
});


// const fs = require('fs');
// fs.readFile('chicagocrimes-1', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(`ERROR : ${err}`);
//   } else {
//     console.log(JSONConversion(data));
//   }
// });

function JSONConversion(cvsText) {
  const b = cvsText.split('\n');
  let c;
  let k;
  const e = [];

  for (let i = 1; i < b.length; i++) {
    k = b[0].split(',');
    c = b[i].split(',');
    const d = {};
    for (let j = 0; j < c.length; j++) {
      const key = k[j];
      d[key] = c[j];
    }
    e.push(d);
  }

  fs.writeFile('cvsasjson.json', JSON.stringify(e), (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
}
