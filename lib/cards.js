Cards = [
 {
   name: 'Chocolade',
   health: 5,
   attack: 3,
   cost: 5,
   art: 'http://i.imgur.com/IcTegA6b.jpg',
   description: ''
 },
 {
   name: 'Fudge Cake',
   health: 3,
   attack: 4,
   cost: 2,
   art: 'http://i.imgur.com/UnHpMvYb.jpg',
   description: ''
 },
 {
   name: 'Wedding Cake',
   health: 9,
   attack: 1,
   cost: 5,
   art: 'http://i.imgur.com/O2Ia6heb.jpg',
   description: ''
 }
];

Cards.forEach(function(card, i) {
   card.id = i;
})