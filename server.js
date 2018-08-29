const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.locals.title = 'BYOB';


app.get('/', (request, response) => {
  response.send('So many beers, so little time.')
})

app.get('/api/v1/breweries', (request, response) => {
  database('breweries').select()
  .then((breweries) => response.status(200).json(breweries))
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title}is running on ${app.get('port')}`);
})

module.exports = app;