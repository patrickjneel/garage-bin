const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3000);


app.use(express.static(__dirname + '/public'));

app.locals.title = 'Garage-Store';

app.get('/', (request,response) => {
  response.send('Welcome')
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

module.exports = app;
