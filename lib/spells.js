Spells = [
 {
   name: 'Tranquilise',
   cost: 3,
   art: '/images/spells/tranq.jpg',
   artistname: 'noahbulgaria',
   artistlink: 'https://www.flickr.com/photos/noahbulgaria/270090287',
   description: 'Send a creature to <span data-tooltip="Creatures cannot attack while asleep.">sleep</span> for one turn.',
   cast: function (card) {
   	card.attackDelay = 2;
   },
   targeted: true
 },
 {
   name: 'Emerge',
   cost: 4,
   art: '/images/cards/meerkat.jpg',
   artistname: 'wwarby',
   artistlink: 'https://www.flickr.com/photos/wwarby/4915195123',
   description: 'Spawn a Meerkat.',
   cast: function (game, id, otherId) {
      Turns.addToBoard(game, id, 2);
   },
   targeted: false
 },
 {
   name: 'Enrage',
   cost: 2,
   art: '/images/spells/enrage.jpg',
   artistname: 'ankakay',
   artistlink: 'https://www.flickr.com/photos/ankakay/4104008491',
   description: 'Give a character +2 attack.',
   cast: function (card) {
      Turns.strengthen(card, 2);
   },
   targeted: true
 },
 {
   name: 'Pacify',
   cost: 2,
   art: '/images/spells/pacify.jpg',
   artistname: 'kloniwotski',
   artistlink: 'https://www.flickr.com/photos/kloniwotski/6160490196',
   description: 'Give a character -2 attack.',
   cast: function (card) {
      Turns.weaken(card, 2);
   },
   targeted: true
 },
 {
   name: 'Meal Time',
   cost: 2,
   art: '/images/spells/apples.jpg',
   artistname: 'vijay chennupati',
   artistlink: 'https://www.flickr.com/photos/vijay_chennupati/8608448986',
   description: 'Give a character +2 health.',
   cast: function (card) {
      Turns.heal(card, 2);
   },
   targeted: true
 },
 {
   name: 'Bee Sting',
   cost: 2,
   art: '/images/spells/bee.jpg',
   artistname: 'orangeaurochs',
   artistlink: 'https://www.flickr.com/photos/orangeaurochs/7002893894',
   description: 'Deal 3 damage to a character.',
   cast: function (card) {
      Turns.dealDamage(card, 3);
   },
   targeted: true
 }
];

Spells.forEach(function(s, i) {
   s.id = i;
})