const breweries = require('../../../breweryData.js');

const createBrewery = (knex, brewery) => {
  return knex('breweries').insert({
    brewery_name: brewery.breweryName,
    address: brewery.address,
    visited: false,
    rating: null
  }, 'id')
  .then(breweryId => {
    let beerPromises = [];

    brewery.beers.forEach(beer => {
      beerPromises.push(
          createBeer(knex, {
            brewery_id: breweryId[0],
            beer_name: beer.name || null,
            style: beer.style || null,
            abv: beer.abv || null,
            availability: beer.availability || null,
            tasted: false,
            rating: null
          })
        )
    });
    return Promise.all(beerPromises);
  })
}

const createBeer = (knex, beer) => {
  return knex('beers').insert(beer);
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beers').del()
    .then(() => knex('breweries').del())
    .then(() => {
      let breweryPromises = [];

      breweries.forEach(brewery => {
        breweryPromises.push(createBrewery(knex, brewery));
      })
      return Promise.all(breweryPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
