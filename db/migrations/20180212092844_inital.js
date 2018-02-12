exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('items', function(table) {
      table.increments('id').primary();
      table.string('itemName');
      table.string('itemReason');
      table.string('itemCleanliness');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('items')
  ]);
};
