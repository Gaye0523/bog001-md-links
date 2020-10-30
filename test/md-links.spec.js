const { mdLinks, stats } = require('../index');

describe('Mostrar las Estadisticas de un array de Objetos', () => {
  const newArrayObjets = [
    {
      href: 'https://github.com/cheeriojs/cheerio',
      text: 'Si valida',
      file: 'C:\\Users\\Gaye Bernal\\Desktop\\Maye\\Laboratoria\\Proyecto 4\\bog001-md-links\\prueba.md',
      status: 200,
      statusText: 'Ok'
    },
    {
      href: 'https://www.facelooooo.com/',
      text: 'Si valida',
      file: 'C:\\Users\\Gaye Bernal\\Desktop\\Maye\\Laboratoria\\Proyecto 4\\bog001-md-links\\prueba.md',
      status: 404,
      statusText: 'Fail'
    }
  ]

  test('Igualdad de Objetos que recibe', () => {
    const respuesta = {
      total: 2,
      unique: 2
    };
    expect(stats(newArrayObjets)).toStrictEqual(respuesta)
  })

  test('Incluir los links rotos', () => {
    const broken = true;
    const respuesta = {
      total: 2,
      unique: 2,
      broken: 1
    };
    expect(stats(newArrayObjets, broken)).toStrictEqual(respuesta)
  })
});




/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});
 */