const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('Nombre', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ Nombre: 'Milanesa a la napolitana' });
      });
    });
  });
});

/*
describe('/recipe', function() {
  it('GET responde con un array vacío de entrada', function() {
    return supertest // supertest nos permite hacer y testear requests HTTP
      .get('/recipe') // hacemos un request HTTP: GET a '/families'
      .expect(200) // el codigo de status del response
      .expect('Content-Type', /json/) // podemos testear los headers
      .expect(function(res) {
        expect(res.body).toEqual([]); // testeamos la respuesta con el body
      });
  });
  
});

describe('/types', function() {
  it('GET responde con un array vacío de entrada', function() {
    return supertest // supertest nos permite hacer y testear requests HTTP
      .get('/types') // hacemos un request HTTP: GET a '/families'
      .expect(200) // el codigo de status del response
      .expect('Content-Type', /json/) // podemos testear los headers
      .expect(function(res) {
        expect(res.body).toEqual([]); // testeamos la respuesta con el body
      });
  });
  
});*/
