exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return knex('items').insert([
        { itemName: 'guitar', itemReason: 'need it', itemCleanliness: 'Sparkling'},
        { itemName: 'corgi', itemReason: 'love it', itemCleanliness: 'Rancid'},
        { itemName: 'rocket', itemReason: 'classic', itemCleanliness: 'Dusty'}
      ]);
    });
};
