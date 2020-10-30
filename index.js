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


const validateLink = (arrayObjetsLinks) => {
  const validateArray = arrayObjetsLinks.map((runObjet) => {
    let link = runObjet.href;
    //Crear un objeto nuevo con las mismas propiedad de runObjet, añadir dos propiedades que (status, statustxt )
    const newObjet = {
      href: runObjet.href,
      text: runObjet.text,
      file: runObjet.file
    }
    return axios.get(link)
      .then(res => {
        const statusLink = res.status;
        if (statusLink == 200) {
          newObjet.status = res.status;
          newObjet.statusText = 'Ok';
          return newObjet
        } else {
          newObjet.status = res.status;
          newObjet.statusText = 'Fail';
          return newObjet
        }
      })
      .catch((err) => {
        newObjet.status = 404;
        newObjet.statusText = 'Fail';
        return newObjet
      })
  })
  return Promise.all(validateArray).then(values => {
    return values
  })
}

const mdLinks = (ruta, options) => {
  const arrayObjet = new Promise((resolve) => {
    extraxLinksFromFile(ruta)
      .then(res => {
        resolve(res)
      })
      .catch(console.error)
  })
  return arrayObjet
}


const stats = (newArrayObjets, showBroken) => { //hacer primero este que no es asincromo
  const contOfLink = newArrayObjets.filter((element) => {
    return element.statusText == 'Fail';
  })
  const totalLinks = newArrayObjets.length;
  const totalBroken = contOfLink.length;
  const totalUnique = [...new Set(newArrayObjets.map((oneLink) => oneLink.href))].length;
  const statsLinks = {
    total: totalLinks,
    unique: totalUnique
  };
  if (showBroken) {
    statsLinks.broken = totalBroken
  }
  return statsLinks
}

module.exports = {
  mdLinks,
  stats,
  validateLink
};





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