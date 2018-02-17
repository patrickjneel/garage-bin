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
      console.log(response.buttons)
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.includes('Garage Bin');
      response.text.should.match(/class="show-btn/)
 
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
      response.body.should.be.a('array')
      response.body.length.should.equal(3)
      response.body[0].should.have.property('id');
      response.body[0].should.have.property('itemName', 'guitar');
      response.body[0].should.have.property('itemReason', 'need it');
      response.body[0].should.have.property('itemCleanliness', 'Sparkling');
     
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
      response.should.be.json;
      response.body.should.be.a('object')
      response.body.should.have.property('id')
  
    })
    .catch(error => {
      throw error;
    })
  })

  it('Should return a 422 error if a parameter is missing', () => {
      return chai
        .request(server)
        .post('/api/v1/items')
        .send({
          itemName: 'Top Gun',
          itemReason: "great film"
        })
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.error.text.should.equal(
            '{"error":"You are missing a required field itemCleanliness"}'
          );
        })
        .catch(error => {
          throw error;
        });
    });


  it('should update an item with a successful patch', () => {
    return chai.request(server)
    .get('/api/v1/items')
    .then(response => {
      const itemId = response.body[0].id
      return itemId;
    })
    .then(itemId => {
      return chai.request(server)
      .patch(`/api/v1/items/${itemId}`)
      .send({
        itemCleanliness: 'Dusty'
      })
      .then(response => {
        response.should.have.status(200);
        response.body.success.should.equal(`Successfully updated item with id ${itemId}`);
      })
      .catch(error => {
        throw error;
      })
    })
    .catch(error => {
      throw error;
    })
  })

  it.skip('should throw a 404 error is the patch is unsuccessful', () => {
    return chai.request(server)
    .patch('/api/v1/items/43')
    .send({
      nothing: ''
    })
    .then(response => {
      console.log(response)
      response.should.have.status(404)
      response.should.be.json;
      response.error.text.should.equal({
          error: 'Could not update item with id 43'
        })
    })
    .catch(error => {
      throw error;
    })
  })
})
