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

  xtest('Igualdad de Objetos que recibe', () => {
    const respuesta = {
      total: 2,
      unique: 2
    };
    expect(stats(newArrayObjets)).toStrictEqual(respuesta)
  })

  xtest('Incluir los links rotos', () => {
    const broken = true;
    const respuesta = {
      total: 2,
      unique: 2,
      broken: 1
    };
    expect(stats(newArrayObjets, broken)).toStrictEqual(respuesta)
  })
});

describe('Probando Promesa', () => {
  xtest('Retorno de un array de objetos', done => {
    const ruta = './prueba.md'
    const response = [
      {
        href: 'https://github.com/cheeriojs/cheerio',
        text: 'Si valida',
        file: 'C:\\Users\\Gaye Bernal\\Desktop\\Maye\\Laboratoria\\Proyecto 4\\bog001-md-links\\prueba.md'
      },
      {
        href: 'https://www.facelooooo.com/',
        text: 'Si valida',
        file: 'C:\\Users\\Gaye Bernal\\Desktop\\Maye\\Laboratoria\\Proyecto 4\\bog001-md-links\\prueba.md'
      }
    ]
    return mdLinks(ruta).then(data => {
      expect(data).toStrictEqual(response);
      done();
    });
  });

  test('Resuelve un array de objetos', done => {
    const respuesta = [
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
    return mdLinks(ruta, options).then(data => {
      console.log(data)
      expect(data).toStrictEqual(respuesta)
      done();
    });
  });
});




/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});
 */