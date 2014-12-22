Game.createGame = function (playerIds) {
	var players = createPlayers(playerIds);

	//First player gets 4 cards, other player gets 3
	var i;
	for (i = 0; i < 3; i++) { this.dealPlayer(players[playerIds[0]]); }
	for (i = 0; i < 4; i++) { this.dealPlayer(players[playerIds[1]]); }
		console.log(playerIds);
	players[playerIds[0]].turn = true;
	players[playerIds[1]].maxbananas = 0;
	players[playerIds[1]].bananas = 0;

	Game.spawnChampions(players);

	players[playerIds[0]].spells = [_.extend({}, Spells[0]), _.extend({}, Spells[1])];
	players[playerIds[1]].spells = [_.extend({}, Spells[0]), _.extend({}, Spells[1])];

	Game.updatePlayable(players, playerIds[0]);

	return {
		players: players,
		currentTurn: playerIds,
		inProgress: true,
		started: new Date()
	};
};

function createPlayers(ids) {
	var o = {};

	ids.forEach(function (id) {
		o[id] = {
			deck: createDeck(),
			board: [],
			hand: [],
			health: 30,
			maxbananas: 1,
			bananas: 1,
			turn: false,
			spells: []
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