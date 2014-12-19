Cards = [
 {
   name: 'Australian Pelican',
   health: 8,
   attack: 6,
   cost: 4,
   art: '/images/cards/pelican.jpg',
   artistname: 'brisbanecitycouncil',
   artistlink: 'https://www.flickr.com/photos/brisbanecitycouncil/5279472440',
   description: ''
 },
 {
   name: 'Butterfly',
   health: 1,
   attack: 4,
   cost: 1,
   art: '/images/cards/butterfly.jpg',
   artistname: 'nagaon',
   artistlink: 'https://www.flickr.com/photos/nagaon/4394582833',
   description: ''
 },
 {
   name: 'Meerkat',
   health: 2,
   attack: 2,
   cost: 1,
   art: '/images/cards/meerkat.jpg',
   artistname: 'wwarby',
   artistlink: 'https://www.flickr.com/photos/wwarby/4915195123',
   description: ''
 }
];

Cards.forEach(function(card, i) {
   card.id = i;
})