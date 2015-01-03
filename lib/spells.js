Spells = [
 {
   name: 'Tranquilise',
   cost: 1,
   art: '/images/spells/tranq.jpg',
   artistname: 'noahbulgaria',
   artistlink: 'https://www.flickr.com/photos/noahbulgaria/270090287',
   description: 'Send a creature to <span data-tooltip="Creatures cannot attack while asleep.">sleep</span> for one turn',
   cast: function (card) {
   	Turns.dealDamage(false, card, 1);
   },
   targeted: true
 },
 {
   name: 'Emerge',
   cost: 2,
   art: '/images/cards/meerkat.jpg',
   artistname: 'wwarby',
   artistlink: 'https://www.flickr.com/photos/wwarby/4915195123',
   description: 'Spawn a Meerkat',
   cast: function (game, id, otherId) {
      Turns.addToBoard(game, id, 2);
   },
   targeted: false
 }
];

Spells.forEach(function(s, i) {
   s.id = i;
})