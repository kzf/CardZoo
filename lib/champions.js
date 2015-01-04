Champions = [
	{
		name: 'Wise Tortoise',
		health: 100,
		attack: 0,
		art: '/images/champions/tortoise.jpg',
		artistlink: 'https://www.flickr.com/photos/50562790@N00/2110796622/in/photostream/',
		artistname: 'frefran',
		description: ''
	},
	{
		name: 'Orangutan',
		health: 50,
		attack: 0,
		art: '/images/champions/orang.jpg',
		artistlink: 'https://www.flickr.com/photos/ross_elliott/9717307315',
		artistname: 'Ross Elliott',
		description: 'At the start of your turn, you have a 50% chance to draw an extra card.',
		startTurn: function(game, id, otherId) {
			Game.dealPlayer(game.players[id]);
		}
	},
	{
		name: 'Highland Cow',
		health: 60,
		attack: 0,
		art: '/images/champions/heeland.jpg',
		artistlink: 'https://www.flickr.com/photos/arran_moffat/5204651805',
		artistname: 'Arran Moffat',
		description: 'At the end of your turn, give all of your characters +1 health.',
		endTurn: function(game, id, otherId) {
			var board = game.players[id].board;
			board.forEach(function (card) {
				card.health += 1;
			});
		}
	},
	{
		name: 'Gorilla',
		health: 60,
		attack: 2,
		art: '/images/champions/gorilla.jpg',
		artistlink: 'https://www.flickr.com/photos/malfet/2443108250',
		artistname: 'Nikita',
		description: 'When you play a creature give it +1 attack and +1 health.',
		playCard: function(card) {
			card.health += 1;
			card.attack += 1;
		}
	},
	{
		name: 'Elephant',
		health: 80,
		attack: 2,
		art: '/images/champions/gorilla.jpg',
		artistlink: 'https://www.flickr.com/photos/malfet/2443108250',
		artistname: 'Nikita',
		description: 'At the end of your turn deal 2 damage to all characters.',
		endTurn: function(game, id, otherId) {
			var board = game.players[id].board;
			board.forEach(function (card) {
				Turns.dealDamage(false, card, 2);
			});
			board = game.players[otherId].board;
			board.forEach(function (card) {
				Turns.dealDamage(true, card, 2);
			});
		}
	}
];

Champions.forEach(function(card, i) {
   card.id = i;
})