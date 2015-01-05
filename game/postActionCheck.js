Game.postActionCheck = function (game, id) {
	var players = game.players;
	Game.checkForCasualties(game, players);
	if (!Game.checkIfGameEnded(game, players)) {
		Game.updateIndexes(players);
		Game.updatePlayable(players, game.currentTurn);
		Game.updateCanAttack(game.currentTurn[0], players);
	}
}


Game.updatePlayable = function (players, currentTurn) {
	var turn = currentTurn[0];
	for (var id in players) {
		if (players.hasOwnProperty(id)) {
			for (var i = 0; i < players[id].hand.length; i++) {
				var card = players[id].hand[i];
				players[id].hand[i].playable = id === turn && players[id].board.length < Config.maxMinionsOnBoard && card.cost <= players[id].bananas;
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
				board[i].healthChanges = [];
				board[i].attackChanges = [];
				// Check for casualties
				if (!board[i].champion && board[i].health <= 0) {
					Turns.removeFromBoard(game, id, board[i]);
					i--;
				}
			}
		}
	}
}

Game.updateCanAttack = function (turn, players) {
	var board;
	for (var id in players) {
		if (players.hasOwnProperty(id)) {
			board = players[id].board;
			var hasDefensive = false;
			for (var i = 0; i < board.length; i++) {
				// Fix attacks
				if (turn === id && !board[i].defensive && board[i].attack > 0 
						&& board[i].numAttacks < board[i].maxAttacks && board[i].attackDelay === 0) {
					board[i].canAttack = true;
				} else {
					board[i].canAttack = false;
				}
				if (board[i].defensive) {
					hasDefensive = true;
				}
			}
			if (id !== turn) {
				board.forEach(function (card) {
					card.attackable = hasDefensive ? card.defensive : true;
				});
			}
		}
	}
}

Game.startAttackingTurn = function (player) {
	player.board.forEach(function (card) {
		card.numAttacks = 0;
		if (card.attackDelay > 0) {
			card.attackDelay--;
		}
	});
}

Game.updateIndexes = function(players) {
	for (var id in players) {
		if (players.hasOwnProperty(id)) {
			Game.updateHandIndexes(players[id].hand);
			Game.updateBoardIndexes(players[id].board);
		}
	}
}

Game.checkIfGameEnded = function(game, players) {
	var board;
	for (var id in players) {
		if (players.hasOwnProperty(id)) {
			board = players[id].board;
			for (var i = 0; i < board.length; i++) {
				if (board[i].champion && board[i].health <= 0) {
					var otherId;
					if (game.currentTurn[0] === id) {
						otherId = game.currentTurn[1];
					} else {
						otherId = game.currentTurn[0];
					}
					Game.declareWinner(game, otherId);
					return true;
				}
			}
		}
	}
	// TODO: Game ended in a draw?
	return false;
}
