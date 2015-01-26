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

	Game.addDeck(playerIds[0], players[playerIds[0]]);
	Game.addDeck(playerIds[1], players[playerIds[1]]);

	// Second player gets an extra starting card
	var i;
	for (i = 0; i < 5; i++) { this.dealPlayer(players[playerIds[0]]); }
	for (i = 0; i < 6; i++) { this.dealPlayer(players[playerIds[1]]); }
	
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

function createRandomDeck () {
	var cards = [];
	for (var i = 0; i < 30; i++) {
		cards.push(Math.floor(Math.random()*Cards.length));
	}

	return cards;
}

Game.addDeck = function(id, player) {
	if (player.whichDeck === -1) {
		player.deck = createRandomDeck();
	} else {
		var decks = Meteor.users.findOne(id).decks;
		var deck = decks[player.whichDeck].deck;
		var instantiatedDeck = [];
		for (var k in deck) {
			if (deck.hasOwnProperty(k)) {
				for (var i = 0; i < deck[k]; i++) {
					instantiatedDeck.push(k);
				}
			}
		}
		player.deck = _.shuffle(instantiatedDeck);
		console.log(player.deck);
	}
}