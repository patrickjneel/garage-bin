exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return knex('items').insert([
        {id: 1, itemName: 'guitar', itemReason: 'need it', itemCleanliness: 'Sparkling'},
        {id: 2, itemName: 'corgi', itemReason: 'love it', itemCleanliness: 'Rancid'},
        {id: 3, itemName: 'rocket', itemReason: 'classic', itemCleanliness: 'Dusty'}
      ]);
    });
};
