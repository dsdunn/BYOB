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
    it('should return a single beer based on param', (done) => {

      chai.request(server)
      .patch('/api/v1/beers')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoic3Vja2FAdHVyaW5nLmlvIiwibmFtZSI6InN1cGVyRHVwZXIifSwiaWF0IjoxNTM1ODM0MDIwLCJleHAiOjE1MzYwMDY4MjB9.lSaLvew7qOJYG7qwUQSBakfg_GH-keIRUdi1ay_2JLE')
      .send({
        'beer_name': 'Boise 150',
        'rating': 4
      })
      .end((error, response) => {
        console.log(response.text)
        response.should.have.a.status(200);
        response.body.should.be.a('array');
        response.body[0].should.have.a.property('beer_name');
        response.body[0].beer_name.should.equal('Boise 150')
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


  describe('PATCH /api/v1/breweries', () => {
    it('should update brewery visited status to true', (done) => {
      chai.request(server)
      .patch('/api/v1/breweries')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoic3Vja2FAdHVyaW5nLmlvIiwibmFtZSI6InN1cGVyRHVwZXIifSwiaWF0IjoxNTM1ODM0MDIwLCJleHAiOjE1MzYwMDY4MjB9.lSaLvew7qOJYG7qwUQSBakfg_GH-keIRUdi1ay_2JLE')
      .send({
        'brewery_name': 'Spangalang',
        'visited': true
      })
      .end((error, response) => {
        console.log(response.text)
        response.should.have.a.status(200);
        response.text.should.be.a('string');
        done();
      })
    })

    it('should return an error if params are missing', (done) => {
      chai.request(server)
      .patch('/api/v1/breweries')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoic3Vja2FAdHVyaW5nLmlvIiwibmFtZSI6InN1cGVyRHVwZXIifSwiaWF0IjoxNTM1ODM0MDIwLCJleHAiOjE1MzYwMDY4MjB9.lSaLvew7qOJYG7qwUQSBakfg_GH-keIRUdi1ay_2JLE')
      .send({
        'address': 'nowhere'
      })
      .end((error, response) => {
        response.should.have.a.status(422);
        done();
      })
    })
  })
  
  describe('PATCH /api/v1/beers', () => {
    it('should update the rating of a beer', (done) => {
      chai.request(server)
      .patch('/api/v1/beers')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoic3Vja2FAdHVyaW5nLmlvIiwibmFtZSI6InN1cGVyRHVwZXIifSwiaWF0IjoxNTM1ODM0MDIwLCJleHAiOjE1MzYwMDY4MjB9.lSaLvew7qOJYG7qwUQSBakfg_GH-keIRUdi1ay_2JLE')
      .send({
        'beer_name': 'Boise 150',
        'rating': 4
      })
      .end((error, response) => {
        console.log(response.text)
        response.should.have.a.status(200);
        response.text.should.be.a('string');
        done();
      })
    })

    it('should return an error if params are missing', (done) => {
      chai.request(server)
      .patch('/api/v1/beers')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoic3Vja2FAdHVyaW5nLmlvIiwibmFtZSI6InN1cGVyRHVwZXIifSwiaWF0IjoxNTM1ODM0MDIwLCJleHAiOjE1MzYwMDY4MjB9.lSaLvew7qOJYG7qwUQSBakfg_GH-keIRUdi1ay_2JLE')
      .send({
        'beer_name': 'gross Beer'
      })
      .end((error, response) => {
        response.should.have.a.status(422);
        done();
      })
    })
  })

  describe('GET /api/breweries/:breweryName', () => {
    it('should return a single brewery based on breweryName param', (done) => {
      chai.request(server)
      .get('/api/v1/breweries/Chain Reaction Brewing')
      .end((error, response) => {
        response.should.have.a.status(200);
        response.body.should.be.a('array');
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(21)
        response.body[0].should.have.property('brewery_name');
        response.body[0].brewery_name.should.equal('Chain Reaction Brewing')
        response.body[0].should.have.property('visited');
        response.body[0].visited.should.equal(false)
        response.body[0].should.have.property('address');
        response.body[0].address.should.equal('902 S Lipan St.\t\nDenver, CO\t80223\t');
        response.body[0].should.have.property('rating');
        done();
      })
    })
  })

  describe('GET /api/v1/rating', () => {
    it('should return all beers above a given rating', (done) => {
      chai.request(server)
      .get('/api/v1/rating?rating=3')
      .end((error, response) => {
        response.should.have.a.status(200);
        response.body.should.be.a('array');
        done();
      })
    })
  })

  
  describe('DELETE /api/v1/breweries/:breweryName', () => {
    it('should delete a beer based on the brewery_name', (done) => {
      chai.request(server)
      .delete('/api/v1/breweries/Baere Brewing Company')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoic3Vja2FAdHVyaW5nLmlvIiwibmFtZSI6InN1cGVyRHVwZXIifSwiaWF0IjoxNTM1ODM0MDIwLCJleHAiOjE1MzYwMDY4MjB9.lSaLvew7qOJYG7qwUQSBakfg_GH-keIRUdi1ay_2JLE')
      .end((error, response) => { 
        response.should.have.a.status(200); 
        response.text.should.be.a('string');
        done();
      })
    })
  })

  describe('DELETE /api/v1/beers/:beerName', () => {
    it('should delete a beer based on the beer_name', (done) => {
      chai.request(server)
      .delete('/api/v1/beers/Boise 150')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoic3Vja2FAdHVyaW5nLmlvIiwibmFtZSI6InN1cGVyRHVwZXIifSwiaWF0IjoxNTM1ODM0MDIwLCJleHAiOjE1MzYwMDY4MjB9.lSaLvew7qOJYG7qwUQSBakfg_GH-keIRUdi1ay_2JLE')
      .end((error, response) => {
        response.should.have.a.status(200);
        response.text.should.be.a('string');
        done();
      })
    })
  })

  describe('POST /api/v1/beers', () => {
    it('should post a new beer to the beers db', (done) => {
      chai.request(server)
      .post('/api/v1/beers')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoic3Vja2FAdHVyaW5nLmlvIiwibmFtZSI6InN1cGVyRHVwZXIifSwiaWF0IjoxNTM1ODM0MDIwLCJleHAiOjE1MzYwMDY4MjB9.lSaLvew7qOJYG7qwUQSBakfg_GH-keIRUdi1ay_2JLE')
      .send({
        beer_name: 'Boise 150',
        brewery_name: '10 Barrel Brewing Company'
      })
      .end((error, response) => {
        response.should.be.json;
        response.should.have.status(201);
        response.body.should.be.a('array');
        done();
      })
    })
    
    it('should get a error if required params are missing', (done) => {
      chai.request(server)
      .post('/api/v1/beers')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoic3Vja2FAdHVyaW5nLmlvIiwibmFtZSI6InN1cGVyRHVwZXIifSwiaWF0IjoxNTM1ODM0MDIwLCJleHAiOjE1MzYwMDY4MjB9.lSaLvew7qOJYG7qwUQSBakfg_GH-keIRUdi1ay_2JLE')
      .send({
        beer_name: 'Boise 150'
      })
      .end((error, response) => {
        response.should.have.a.status(422);
        response.text.should.be.a('string');
        done();
      })
    })
  })

  describe('POST /api/v1/breweries', () => {
    it('should add a new brewery to the breweries list', (done) => {
      chai.request(server)
      .post('/api/v1/breweries')
      .set({'Content-Type': 'application/json', 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoic3Vja2FAdHVyaW5nLmlvIiwibmFtZSI6InN1cGVyRHVwZXIifSwiaWF0IjoxNTM1ODM0MDIwLCJleHAiOjE1MzYwMDY4MjB9.lSaLvew7qOJYG7qwUQSBakfg_GH-keIRUdi1ay_2JLE'})
      .send({
            brewery_name: 'garbage',
            address: 'denver, CO',
            visited: 'true',
            rating: '3'
      })
      .end((error, response) => {
        response.should.have.a.status(201);
        response.body.should.be.a('string');
        done();
      })
    })

    it('should get a error if required params are missing', (done) => {
      chai.request(server)
      .post('/api/v1/breweries')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvIjp7ImVtYWlsIjoic3Vja2FAdHVyaW5nLmlvIiwibmFtZSI6InN1cGVyRHVwZXIifSwiaWF0IjoxNTM1ODM0MDIwLCJleHAiOjE1MzYwMDY4MjB9.lSaLvew7qOJYG7qwUQSBakfg_GH-keIRUdi1ay_2JLE')
      .send({
        beer_name: 'Boise 150'
      })
      .end((error, response) => {
        response.should.have.a.status(422);
        response.text.should.be.a('string');
        done();
      })
    })
  })
})
