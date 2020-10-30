#! /usr/bin/env node
const { stats } = require('./index.js');
const { mdLinks } = require('./index.js');
const { validateLink } = require('./index.js')
const process = require('process');


let rutaCli = process.argv[2];
let status = false;
let validate = false;
let broken = true;


const options = process.argv
console.log(options)
options.forEach(element => {
  if (element == '--validate') {
    validate = true;
  }
  if (element == '--stats') {
    status = true;
  }
})


if (!validate && !status) {
  mdLinks(rutaCli).then(console.log)
}
else if (validate && !status) {
  mdLinks(rutaCli, { validate: true })
    .then(res => {
      return validateLink(res);
    })
    .then(res => {
      console.log(res);
    })
    .catch(console.error);
}
else if (!validate && status) {
  mdLinks(rutaCli, { validate: false })
    .then(res => {
      console.log(stats(res));
    })
    .catch(console.error);
}
else if (validate && status) {
  mdLinks(rutaCli, { validate: true })
    .then(res => {
      return validateLink(res);
    })
    .then(res => {
      console.log(stats(res, broken));
    })
    .catch(console.error);
}

/* mdLinks(rutaCli, optionsCli)
  .then(res => {
    console.log(stats(res))
  })
  .catch(console.error); */


//Investigar process.argv(creamos comando que necesitamos)
//Iterar en options
//