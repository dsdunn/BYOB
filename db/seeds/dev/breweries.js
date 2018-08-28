const breweries = require('../../../breweries');
const fs = require('fs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  console.log(breweries);
  return knex('breweries').del()
    .then(function () {
      // Inserts seed entries
      return knex('breweries').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
