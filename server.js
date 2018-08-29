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
  .then((breweries) => {
    if (breweries){
      return response.status(200).json(breweries)
    } else {
      return response.status(404).send('No breweries found')
    }
  })
  .catch(()=> response.status(500).send('Sorry, trouble on our end handling your Brewery request.'))
})

app.get('/api/v1/beers', (request, response) => {
  database('beers').select()
  .then((beers) => {
    if (beers) {
      return response.status(200).json(beers)
    } else {
      return response.status(404).send('No beers found.')
    }
  })
  .catch(() => response.status(500).send('Sorry, trouble on our end handling your Beer request.'))
})


app.get('/api/v1/beers/:beerName', (request, response) => {
  const { beerName }  = request.params;
  database('beers').where({beer_name: beerName})
  .then(beer => response.status(200).json(beer))
})

app.get('/api/v1/breweries/:breweryName', (request, response) => {
  const { breweryName } = request.params;
  database('breweries').where({brewery_name: breweryName})
  .then( brewery => response.status(200).json(brewery))
})

app.post('/api/v1/beers', (request, response) => {
  const beer = request.body;
  const brewery_id = database('breweries').where({brewery_name: beer.brewery_name}).select('id')
  
  for (let requiredParams of ['brewery_name', 'beer_name']) {
    if (!beer[requiredParams]) {
      return response.status(422).send(`Missing required beer information: ${requiredParams}`)
    }
  }
  database('beers')
  .returning('id')
  .insert({
     beer_name: beer.beer_name, 
     style: beer.style, 
     abv: beer.abv, 
     tasted: beer.tasted, 
     rating: beer.rating, 
     availability: beer.availability, 
     brewery_id 
    })
  .then((id) => response.status(201).json(id))
})

app.post('/api/v1/breweries', (request, response) => {
  const brewery = request.body;
  for (let requiredParams of ['brewery_name', 'address', 'visited', 'rating']) {
    if (!brewery[requiredParams]) {
      return response.status(422).send(`Missing required brewery information: ${requiredParams}`)
    }
  }
  database('breweries')
  .returning('brewery_name')
  .insert(brewery)
  .then(brewery => response.status(201).json(`New brewery ${brewery} has been added to the database.`))
})

app.put('/api/v1/beers', (request, response) => {
  const rating = request.body;
  console.log(rating);
  for (let requiredParams of ['beer_name', 'rating']) {
    if (!rating[requiredParams]) {
      return response.status(422).send(`You are missing required params of ${requiredParams}`)
    }
  }
  database('beers').where({ beer_name: rating.beer_name })
  .update({ rating: rating.rating })
  .then(result => response.status(200).send(`You have set the rating of ${rating.beer_name} to ${rating.rating}`))
})

app.put('/api/v1/breweries', (request, response) => {
  const visited = request.body;
  for (let requiredParams of ['brewery_name', 'visited']) {
    if (!visited[requiredParams]) {
      return response.status(422).send(`You are missing required params of ${requiredParams}`)
    }
  }
  database('breweries').where({ brewery_name: visited.brewery_name })
  .update({ visited: visited.visited })
  .then(result => response.status(200).send(`You have set the visited property of ${visited.brewery_name} to ${visited.visited}`))
})

app.delete('/api/v1/breweries/:breweryName', (request, response) => {
  const breweryName = request.params.breweryName;
  console.log(breweryName);

  const breweryId = database('breweries').where({brewery_name: breweryName}).select('id')
  database('beers').where({ brewery_id: breweryId }).del()
  .then(() => database('breweries').where('brewery_name', breweryName).del())
  .then(() => response.status(200).send(`You have sucessfully deleted ${breweryName} from the brewery database.`))
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
})

module.exports = app;