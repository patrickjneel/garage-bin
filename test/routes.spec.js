process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex.js');

chai.use(chaiHttp);

describe('Client Side Routes', () => {

  it('should return the homepage', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch(error => {
      throw error;
    })
  })

  it('should return a 404 if the route does not exist', () => {
    return chai.request(server)
    .get('/sadddd')
    .then(() => {
    })
    .catch(error => {
      response.should.have.status(404); 
    })
  })
})

describe('API Routes', () => {
  
})
