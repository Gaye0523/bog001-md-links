module.exports = () => {

};

const parametroCli = './README.md';
const path = require('path');
const fs = require('fs');
const md = require('markdown-it')();
const { JSDOM } = require('jsdom');
const { rejects } = require('assert');
const { resolve } = require('path');


//const rutaAbsoluta = path.resolve(archivo); //Estamos volviendo absoluta
//console.log(rutaAbsoluta)

function readFile(archivo) {
  const promesa = new Promise((resolve, reject) => {
    const rutaAbsoluta = path.resolve(archivo)
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

const extracLink = (texto, archivo) => {
  let seeHtml = md.render(texto);
  let dom = new JSDOM(seeHtml)
  const seeLink = dom.window.document;
  const showLinks = seeLink.querySelectorAll('a');
  console.log(showLinks)
  const rutaAbsoluta = path.resolve(archivo);
  const arrayLinks = []
  showLinks.forEach(link => {
    const objetLink = {
      href: link.href,
      text: link.text,
      file: rutaAbsoluta
    }
    arrayLinks.push(objetLink)
  });
  return arrayLinks
}


const mdLink = (archivo) => {
  return readFile(archivo)
    .then((resultado) => {
      const readHtml = new Promise((resolve) => {
        const resultLink = extracLink(resultado, archivo)
        resolve(resultLink)
      })
      return (readHtml)
    })
}
mdLink(parametroCli)

  .then(links => {
    console.log(links)
  })
  .catch(console.error);



/* const getLink = () => {
  const showLinks = showDom.querySelectorAll('a');
  console.log(showLinks)

}
getLink() */


