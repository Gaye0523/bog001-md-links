module.exports = () => {

};

const archivo = './README.md';
const path = require('path');
const fs = require('fs');
const md = require('markdown-it')();
const { JSDOM } = require('jsdom');
const { rejects } = require('assert');
const { resolve } = require('path');


const rutaAbsoluta = path.resolve(archivo); //Estamos volviendo absoluta
//console.log(rutaAbsoluta)

function readFile() {
  const promesa = new Promise((resolve, reject) => {
    fs.readFile(rutaAbsoluta, { encoding: 'utf8' }, function (error, data) {
      if (error) {
        const err = new Error(`Error: ${error}`)
        reject(err);
      } else {
        resolve(data)
        let txtPlano = data;
      }
    })
  })
  return promesa
}


const mdLink = () => {
  
  readFile()
  .then((resultado) => {
    const readHtml = new Promise ((resolve) => {
      let result = md.render(resultado);
      resolve(result)
    })
    return(readHtml)
  })

  .then((seeHtml) => {
    let dom = new JSDOM(seeHtml)
    const documet = dom.window.document;
    console.log(documet)
  })
}
mdLink()

/* .then ((resultado) => 
  let result = md.render(resultado);
  //console.log(result)
}); */

