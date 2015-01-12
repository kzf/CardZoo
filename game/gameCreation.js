Game.createGame = function (playerIds) {
	var players = createPlayers(playerIds);

	return {
		players: players,
		currentTurn: playerIds,
		completed: false,
		turnDuration: 30,
		started: false,
		timerStart: Date.now(),
		timerDuration: Config.lobbyDuration
	};
}

Game.startGame = function (game) {
	var players = game.players;
	var playerIds = game.currentTurn;

	//First player gets 4 cards, other player gets 3
	var i;
	for (i = 0; i < 3; i++) { this.dealPlayer(players[playerIds[0]]); }
	for (i = 0; i < 4; i++) { this.dealPlayer(players[playerIds[1]]); }
	
	players[playerIds[0]].turn = true;
	players[playerIds[1]].maxbananas = 0;
	players[playerIds[1]].bananas = 0;

	Game.spawnChampions(players);

	players[playerIds[0]].spells = [
		_.extend({index: 0}, Spells[players[playerIds[0]].whichSpells[0]]),
		_.extend({index: 1}, Spells[players[playerIds[0]].whichSpells[1]])
		];
	players[playerIds[1]].spells = [
		_.extend({index: 0}, Spells[players[playerIds[1]].whichSpells[0]]),
		_.extend({index: 1}, Spells[players[playerIds[1]].whichSpells[1]])
		];;

	Game.updatePlayable(players, playerIds);

	Game.startAttackingTurn(players[playerIds[0]]);
	Game.updateCanAttack(playerIds[0], players);

	if (Meteor.isServer) {
    GameTimers.startTurnTimer(game, game._id, playerIds[0]);
	}
	
	game.started = true;
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
			spells: [],
			whichChampion: 0,
			whichSpells: [0, 1],
			whichDeck: -1,
			ready: false
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