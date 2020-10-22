module.exports = () => {

};

const path = require('path');
const fs = require('fs');
const md = require('markdown-it')();
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { rejects } = require('assert');
const { resolve } = require('path');


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
  const rutaAbsoluta = path.resolve(archivo);
  const arrayLinks = []
  showLinks.forEach(link => {
    //verificacion que sea una url
    let validLink = (/^(ftp|http|https):\/\/[^ "]+$/.test(link.href));
    if (validLink === true) {
      const objetLink = {
        href: link.href,
        text: link.text,
        file: rutaAbsoluta
      }
      arrayLinks.push(objetLink)
    }
  });
  return arrayLinks
}

const extraxLinksFromFile = (archivo) => {
  return readFile(archivo)
    .then((resultado) => {
      const readHtml = new Promise((resolve) => {
        const resultLink = extracLink(resultado, archivo)
        resolve(resultLink)
      })
      return (readHtml)
    })
}

const validateLink = (arrayObjetsLinks) => {
  arrayObjetsLinks.map((runObjet) => {
    let link = runObjet.href;
    //Crear un objeto nuevo con las mismas propiedad de runObjet, añadir dos propiedades que (status, statustxt )
    const newObjet = {
      href: runObjet.href,
      text: runObjet.text,
      file: runObjet.file
    }
    const responseAxios = new Promise((resolve, reject) => {
      axios.get(link)
        .then(res => {
          const statusLink = res.status;
          if (statusLink == 200) {
            newObjet.status = res.status;
            newObjet.statusText = 'Ok';
            console.log(newObjet)
            resolve(newObjet)
          } else {
            newObjet.status = res.status;
            newObjet.status = response.status;
            newObjet.statusText = 'Fail';
            console.log(newObjet)
          }
        })
        .catch((err) => {
          newObjet.status = 404;
          newObjet.statusText = 'Fail';
          console.log(newObjet)
          resolve(newObjet)
        })
    })
    return (responseAxios)
  })
}

const mdLinks = (ruta, options) => {

  extraxLinksFromFile(ruta)
    .then(res => {
      if (options.validate == true) {
        validateLink(res)
      } else {
        console.log(res)
      }
    })
    .catch(console.error)
}
const optionsCli = {
  validate: true
}
const rutaCli = './prueba.md';
mdLinks(rutaCli, optionsCli)








/*   .then(res => {
    console.log(res)
  })
  .catch(console.error); */

//que deber retornar en el callback
//verificar con un expesion regular para que comience con la expesion https
//newObject.status =
//newObject.status = ‘ok’
//newObject.status = ‘fail’
//Devuelva una promesa que resuelve un array de objetos con las nuevas propiedad
//mdlinks devuela una promsea con una array de objetos
//revisar que no sean variable globales