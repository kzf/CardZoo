Spells = [
 {
   name: 'Attack 1',
   cost: 1,
   art: 'http://i.imgur.com/IcTegA6b.jpg',
   description: '',
   cast: function (card) {
   	card.health -= 1;
   }
 },
 {
   name: 'Attack 2',
   cost: 2,
   art: 'http://i.imgur.com/UnHpMvYb.jpg',
   description: '',
   cast: function (card) {
   	card.health -= 2;
   }
 }
];

Spells.forEach(function(s, i) {
   s.id = i;
})