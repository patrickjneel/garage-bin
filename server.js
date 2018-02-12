const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);


app.use(express.static(__dirname + '/public'));

app.locals.title = 'Garage-Store';

app.get('/', (request,response) => {
  response.send('Welcome')
});

app.get('/api/v1/all_items', (request, response) => {
  database('items').select()
    .then(items => {
      return response.status(200).json({ items })
    })
    .catch(error => {
      return response.status(500).json({ error })
    })
})

app.post('/api/v1/all_items', (request, response) => {
  const item = request.body;
  for (let requiredParameter of ['itemName', 'itemReason', 'itemCleanliness']) {
    if (!item[requiredParameter]) {
      return response.status(422).json({
        error: `You are missing a required field ${requiredParameter}`
      })
    }
  }
  database('items').insert(item, 'id')
    .then(item => {
      return response.status(201).json({ id: item[0]})
    })
    .catch(error => {
      return response.status(500).json({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

module.exports = app;
