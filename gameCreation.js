GameFactory = {};

GameFactory.createGame = function (playerIds) {
	var players = createPlayers(playerIds);

	//First player gets 4 cards, other player gets 3
	var i;
	for (i = 0; i < 3; i++) { this.dealPlayer(players[playerIds[0]]); }
	for (i = 0; i < 4; i++) { this.dealPlayer(players[playerIds[1]]); }

	players[playerIds[0]].turn = true;
	players[playerIds[1]].maxflour = 0;
	players[playerIds[1]].flour = 0;

	Turns.spawnChampions(players);

	Turns.updatePlayable(players, playerIds);

	return {
		players: players,
		currentTurn: playerIds,
		inProgress: true,
		started: new Date()
	};
};

GameFactory.dealPlayer = function(player) {
	if (player.deck.length > 0) {
		var newCard = Cards[player.deck.shift()];
		player.hand.push(newCard);
		GameFactory.updateHandIndexes(player.hand);
	}
}

GameFactory.updateHandIndexes = function(hand) {
	for (var i = 0; i < hand.length; i++) {
		hand[i].handIndex = i;
	}
}

GameFactory.updateBoardIndexes = function(board) {
	for (var i = 0; i < board.length; i++) {
		board[i].boardIndex = i;
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
			maxflour: 1,
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