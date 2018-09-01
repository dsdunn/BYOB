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
    it('should return a list of all the breweries', (done) => {
      chai.request(server)
      .get('/api/v1/breweries')
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.should.be.json;
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('brewery_name');
        response.body[0].should.have.property('address');
        response.body[0].should.have.property('visited');
        response.body[0].visited.should.equal(false);
        done();
      })
    })
  })

  describe('GET /api/v1/beers', () => {
    it('should return a list all the beers', (done) => {
      chai.request(server)
      .get('/api/v1/beers')
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.should.be.json;
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('beer_name');
        response.body[0].beer_name.should.equal('Boise 150');
        response.body[0].should.have.property('rating');
        response.body[0].should.have.property('style');
        response.body[0].style.should.equal('Golden or Blonde Ale');
        response.body[0].should.have.property('brewery_id');
        response.body[0].brewery_id.should.equal(1);
        response.body[0].should.have.property('abv');
        response.body[0].abv.should.equal(4.7);
        done();
      })
    })
  })

  describe('GET /api/v1/beers/:beerName', () => {
    it('should return a single beer based on param', () => {
      chai.request(server)
      .get('/api/v1/beers/Boise 150')
      .end((error, response) => {
        response.should.have.a.status(200);
        response.body.should.be.a('object');
        response.body.should.have.a.property('beer_name');
        response.body.beer_name.should.equal('Boise 150')
        response.body.should.have.property('rating');
        response.body.should.have.property('style');
        response.body.style.should.equal('Golden or Blonde Ale');
        response.body.should.have.property('brewery_id');
        response.body.brewery_id.should.equal(1);
        response.body.should.have.property('abv');
        response.body.abv.should.equal(4.7);
        done();
      })
    })
  })
  

})
