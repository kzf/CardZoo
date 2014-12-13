GameFactory = {};

GameFactory.createGame = function (playerIds) {
	var deck = createDeck(),
			players = createPlayers(playerIds);

	GameFactory.dealPlayers(players, deck);

	return {
		deck: deck,
		players: players,
		currentTurn: playerIds,
		inProgress: true,
		started: new Date()
	};
};

GameFactory.dealPlayers = function(players, deck) {
	for (var i = 0; i < 3; i++) {
		Object.keys(players).forEach(function (id) {
			players[id].hand.push(deck.shift());
		});
	}
}

function createPlayers(ids) {
	var o = {};

	ids.forEach(function (id) {
		o[id] = {
			hand: [],
			board: [],
			health: 100,
			flour: 1
		}
	});

	return o;
}

function createDeck () {
	var cards = [0,1,2,0,1,2,0,1,2,0,1,2,0,1,2];

	return _.shuffle(cards);
}