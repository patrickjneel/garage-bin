process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex.js');

chai.use(chaiHttp);

describe('Client Side Routes', () => {

  it.only('should return the homepage', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      console.log(response.buttons)
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.equal('<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" type="text/css" href="styles.css">\n</head>\n<body>\n  <h1>Garage Bin</h1>\n  <div class="input-area">\n    <input  class="item-inputs" id="item-name"placeholder="Item Name" />\n    <input  class="item-inputs" id="item-reason"placeholder="Item Reason" />\n    <select>\n      <option value="Cleanliness">Cleanliness</option>\n      <option value="Sparkling">Sparkling</option>\n      <option value="Dusty">Dusty</option>\n      <option value="Rancid">Rancid</option>\n    </select>\n    <button class="add-item-btn">Add Item</button>\n  </div>\n  <div class="buttons">\n    <button class="show-btn">Show Items</button>\n    <button class="sort-btn">Sort Items A-Z</button>\n    <button class="sort-ZA-btn">Sort Items Z-A</button>\n  </div>\n  <div class="counter">\n    <h4 class="item-count">\n      Total Count:\n    </h4>\n    <h4>SparkleCount: <span class="sparkle-count"></span></h4>\n    <h4>Dusty Count: <span class="dusty-count"></span></h4>\n    <h4>Rancid Count: <span class="rancid-count"></span></h4>\n  </div>\n  <div class="item-area">\n    <div class="item-list"> \n    </div>\n  </div>\n\n<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\n  <script src="scripts.js"></script>\n</body>\n</html>\n')
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

  beforeEach(done => {
      knex.seed.run().then(() => {
        done();
      });
    });
  
  it('should get all of the items', () => {
    return chai.request(server)
    .get('/api/v1/items')
    .then(response => {
      response.should.have.status(200)
      response.should.be.json;
      response.body.should.be.a('object')
      response.body.items.should.be.a('array')
      response.body.items.length.should.equal(3)
      response.body.items[0].should.have.property('id');
      response.body.items[0].should.have.property('itemName', 'guitar');
      response.body.items[0].should.have.property('itemReason', 'need it');
      response.body.items[0].should.have.property('itemCleanliness', 'Sparkling');
     
    })
    .catch(error => {
      throw error
    })
  })

  

  it('should post a new item', () => {
    return chai.request(server)
    .post('/api/v1/items')
    .send({
      itemName: 'Dirty Dancing VHS',
      itemReason: 'greatest',
      itemCleanliness: 'Dusty'
    })
    .then(response => {
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('id')
      // response.body.should.have.property('itemName')
      // response.body.should.have.property('itemReason')
      // response.body.should.have.property('itemCleanliness')
    })
    .catch(error => {
      throw error;
    })
  })

  

  it.skip('should update an item with a successful patch', () => {
    return chai.request(server)
    .patch('/api/v1/items')
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
