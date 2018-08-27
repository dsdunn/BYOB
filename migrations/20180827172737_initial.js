
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('breweries', function(table) {
      table.increments('id').primary();
      table.string('brewery_name');
      table.string('address');
      table.boolean('visited');
      table.integer('rating');
      table.timestamps(true, true)
    }),
    knex.schema.createTable('beers', function(table) {
      table.increments('id').primary();
      table.integer('brewery_id').unsigned()
      table.foreign('brewery_id')
        .references('breweries.id');
      table.string('beer_name');
      table.string('style');
      table.integer('abv');
      table.boolean('tasted');
      table.integer('rating');
      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.alll([
    knex.schema.dropTable('breweries'),
    knex.schema.dropTable('beers')
  ])
};
