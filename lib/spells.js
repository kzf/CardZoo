Spells = [
 {
   name: 'Attack 1',
   cost: 1,
   art: 'http://i.imgur.com/IcTegA6b.jpg',
   description: '',
   cast: function (card) {
   	card.health -= 1;
   },
   targeted: true
 },
 {
   name: 'Attack 2',
   cost: 2,
   art: 'http://i.imgur.com/UnHpMvYb.jpg',
   description: '',
   cast: function (game, id, otherId) {
   	var board = game.players[id].board;
      board.push(Cards[0]);
      GameFactory.updateBoardIndexes(game.players[id].board);
   },
   targeted: false
 }
];

Spells.forEach(function(s, i) {
   s.id = i;
})