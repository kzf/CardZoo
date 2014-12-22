Game.postActionCheck = function (game, id) {
	var players = game.players;
	Game.checkForCasualties(game, players);
	Game.updateIndexes(players);
	Game.updatePlayable(players, game.currentTurn);
}


Game.updatePlayable = function (players, currentTurn) {
	console.log(currentTurn);
	var turn = currentTurn[0];
	for (var id in players) {
		if (players.hasOwnProperty(id)) {
			for (var i = 0; i < players[id].hand.length; i++) {
				var card = players[id].hand[i];
				card.playable = id === turn && players[id].board.length < Config.maxMinionsOnBoard && card.cost <= players[id].bananas;
			}
			for (var i = 0; i < players[id].spells.length; i++) {
				var spell = players[id].spells[i];
				spell.playable = id === turn && spell.cost <= players[id].bananas;
			}
		}
	}
}

Game.checkForCasualties= function (game, players) {
	var board;
	for (var id in players) {
		if (players.hasOwnProperty(id)) {
			board = players[id].board;
			for (var i = 0; i < board.length; i++) {
				if (board[i].health <= 0) {
					Turns.removeFromBoard(game, id, board[i]);
				}
			}
		}
	}
}

Game.updateIndexes = function(players) {
	for (var id in players) {
		if (players.hasOwnProperty(id)) {
			Game.updateHandIndexes(players[id].hand);
			Game.updateBoardIndexes(players[id].board);
		}
	}
}