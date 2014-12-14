GameFactory = {};

GameFactory.createGame = function (playerIds) {
	var players = createPlayers(playerIds);

	//First player gets 4 cards, other player gets 3
	var i;
	for (i = 0; i < 3; i++) { this.dealPlayer(players[playerIds[0]]); }
	for (i = 0; i < 4; i++) { this.dealPlayer(players[playerIds[1]]); }

	players[playerIds[0]].turn = true;

	return {
		players: players,
		currentTurn: playerIds,
		inProgress: true,
		started: new Date()
	};
};

GameFactory.dealPlayer = function(player) {
	if (player.deck.length > 0) {
		player.hand.push(Cards[player.deck.shift()]);
	}
}

function createPlayers(ids) {
	var o = {};

	ids.forEach(function (id) {
		o[id] = {
			deck: createDeck(),
			board: [],
			hand: [],
			health: 30,
			flour: 1,
			turn: false
		}
	});

	return o;
}

function createDeck () {
	var cards = [];
	for (var i = 0; i < 30; i++) {
		cards.push(Math.floor(Math.random()*Cards.length));
	}

	return cards;
}