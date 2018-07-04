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
const readline = require('readline');

let isHeader = true;
let year, primaryType, description, header;
let jsonData = {};


const stream = readline.createInterface({
  input: fs.createReadStream('chicagocrimes.csv'),
});

stream.on('line', (line) => {
  JSONConversion(line);
});

stream.on('close', () => saveJson());

function JSONConversion(line) {

  if (isHeader) {
    header = line.split(',');
    year = header.indexOf('Year');
    primaryType = header.indexOf('Primary Type');
    description = header.indexOf('Description');
    isHeader = false;
  } else {
    const row = line.split(',');
    let obj = {};
    if (row[primaryType] === 'THEFT' &&
       (row[year] >= 2001 && row[year] <= 2018)) {
      if (row[description] === 'OVER $500') {
        if (jsonData[row[year]]) {
          jsonData[row[year]].theftOver500++;
        } else {
          obj.theftOver500 = 1;
          obj.theftUnder500 = 0;
          jsonData[row[year]] = obj;
        }
        
      } else if (row[description] === '$500 AND UNDER') {
        if (jsonData[row[year]]) {
          jsonData[row[year]].theftUnder500++;
        } else {
          obj.theftOver500 = 0;
          obj.theftUnder500 = 1;
          jsonData[row[year]] = obj;
        }
        
      }
    }
  }
}


function saveJson() {
  fs.writeFile('theft.json', JSON.stringify(jsonData), (err) => {
    if (err) throw err;
    console.log('File Saved!');
  });
}

