/*
jshint esversion: 6
*/

const fs = require('fs');

fs.readFile('chicagocrimes-1', 'utf-8', (err, data) => {
  if (err) {
    console.log(`ERROR : ${err}`);
  } else {
    console.log(JSONConversion(data));
  }
});

function JSONConversion(cvsText) {
  let a = [],
    b = cvsText.split('\n'),
    c,
    k,
    e = [];

  for (let i = 1; i < b.length; i++) {
    k = b[0].split(',');
    c = b[i].split(',');
    let d = {};
    for (let j = 0; j < c.length; j++) {
      let key = k[j];
      d[key] = c[j];
    }
    e.push(d);
  }
  
  fs.writeFile('cvsasjson.json', JSON.stringify(e), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}
