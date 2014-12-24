Game.minionsCanAttack = function (player, can) {
	player.board.forEach(function (c) {
		if (typeof can !== 'undefined') {
			c.canAttack = can;
		} else {
			c.canAttack = c.attack != 0; // 0 attack creatures can not attack
		}
	});
}

Game.spawnChampions = function (players) {
	for (var id in players) {
		if (players.hasOwnProperty(id)) {
			var champ = Champions[0];
			champ.champion = true;
			players[id].board.push(champ);
			Game.updateBoardIndexes(players[id].board);
		}
	}
}

Game.declareWinner = function (game, id) {
	Game.endGame(game);
	game.winner = id;
}

Game.endGame = function (game) {
	game.completed = true;
	Game.updatePlayable(game.players, false);
}