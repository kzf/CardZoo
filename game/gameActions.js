Game.spawnChampions = function (players) {
	for (var id in players) {
		if (players.hasOwnProperty(id)) {
			var champ = Champions[3];
			players[id].board.push({
				id: champ.id,
				attack: champ.attack,
				health: champ.health,
				champion: true,
				attackDelay: 0,
				maxAttacks: champ.maxAttacks
			});
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