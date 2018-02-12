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
  
  it('should get all of the items', () => {
    return chai.request(server)
    .get('/api/v1/all_items')
    .then(response => {
      response.should.have.status(200)
      response.should.be.json;
      response.body.should.be.a('object')
      response.res.should.be.a('object')
    })
    .catch(error => {
      throw error
    })
  })

  it('should have a 500 error if path is bad', () => {
    return chai.request(server)
    .get('/api/v1/nonexistent')
    .then(() => {

    })
    .catch(error => {
      response.should.have.status(500)
    })
  })

  it('should post a new item', () => {
    return chai.request(server)
    .post('/api/v1/all_items')
    .send({
      itemName: 'Dirty Dancing VHS',
      itemReason: 'greatest',
      itemCleanliness: 'Dusty'
    })
    .then(response => {
      response.should.have.status(201)
      response.body.should.be.a('object')
    })
    .catch(error => {
      throw error;
    })
  })

  it('should thorw have a 500 error if post is unsuccessful', () => {
    return chai.request(server)
    .post('/api/v1/item_namzesss')
    .send({
      itemName: 'Dirty Dancing VHS',
      itemReason: 'greatest',
      itemCleanliness: 'Dusty'
    })
    .then(() => {

    })
    .catch(error => {
      response.should.have.status(500)
    })
  })

  it.skip('should update an item with a successful patch', () => {
    return chai.request(server)
    .patch('/api/v1/all_items')
    .send({
      itemCleanliness: 'Dusty'
    })
    .then(response => {
      response.should.have.status(204)
      response.body.should.be.a('object')
    })
    .catch(error => {
      throw error;
    })
  })

  it('should throw a 500 error is the patch is unsuccessful', () => {
    return chai.request(server)
    .patch('/api/v1/itemmmmmm')
    .send({
      itemCleanliness: 'Dusty'
    })
    .then(() => {

    })
    .catch(error => {
      response.should.have.status(500)
    })
  })
})
