const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex')
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach(done => {
    knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
    .then(() => done())
  })

  describe('GET api/v1/breweries', () => {
    it('should return a list of all the breweries', () => {
      chai.request(server)
      .get('/api/v1/breweries')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.a('array');
        response.should.be.json;
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('brewery_name');
        response.body[0].should.have.property('address');
        response.body[0].should.have.property('visited');
        response.body[0].visited.should.equal(false);
      })
    })
  })
})
