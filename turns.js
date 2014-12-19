Turns = {};

Turns.inHand = function (set, card) {
	for (var i = 0; i < set.length; i++) {
		if (set[i].id === card.id) {
			return true;
		}
	}
	return false;
}

Turns.onBoard = function (set, card) {
	for (var i = 0; i < set.length; i++) {
		if (set[i].id === card.id) {
			return true;
		}
	}
	return false;
}

Turns.haveSpell = function (set, spell) {
	for (var i = 0; i < set.length; i++) {
		if (set[i].id === spell.id) {
			return true;
		}
	}
	return false;
}

Turns.playCard = function (game, id, card) {
	var player = game.players[id];
	card.canAttack = false;
	player.board.push(card);
	GameFactory.updateBoardIndexes(player.board);
	player.bananas -= card.cost;
	/* Remove it from the hand */
	player.hand.splice(card.handIndex, 1);
	GameFactory.updateHandIndexes(player.hand);
}

Turns.removeFromBoard = function(game, id, card) {
	game.players[id].board.splice(card.boardIndex, 1);
	GameFactory.updateBoardIndexes(game.players[id].board);
}

Turns.makeAttack = function (game, id, otherId, myCard, enemyCard) {
  var card = game.players[id].board[myCard.boardIndex];
  var otherCard = game.players[otherId].board[enemyCard.boardIndex];
  otherCard.health -= card.attack;
  if (otherCard.health <= 0) {
  	Turns.removeFromBoard(game, otherId, otherCard);
  }
  card.health -= otherCard.attack;
  if (card.health <= 0) {
		Turns.removeFromBoard(game, id, card);
  }
  card.canAttack = false;
}

Turns.castTargetedSpell = function (game, id, otherId, spell, enemyCard, own) {
  var card = game.players[own ? id : otherId].board[enemyCard.boardIndex];
  var cast = Spells[spell.id].cast;
  cast(card);
  game.players[id].bananas -= spell.cost;
  if (card.health <= 0) {
  	Turns.removeFromBoard(game, own ? id : otherId, card);
  }
}

Turns.castSpell = function (game, id, otherId, spell) {
  var cast = Spells[spell.id].cast;
  cast(game, id, otherId);
  game.players[id].bananas -= spell.cost;
}

Turns.findCard = function (set, card) {
  for (var i = 0; i < set.length; i++) {
		if (set[i].id === card.id) {
			return set[i];
		}
	}
	return false;
}

Turns.updatePlayable = function (players, currentTurn) {
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

Turns.minionsCanAttack = function (player, can) {
	player.board.forEach(function (c) {
		if (typeof can !== 'undefined') {
			c.canAttack = can;
		} else {
			c.canAttack = c.attack != 0; // 0 attack creatures can not attack
		}
	});
}

Turns.spawnChampions = function (players) {
	for (var id in players) {
		if (players.hasOwnProperty(id)) {
			var champ = Champions[0];
			champ.champion = true;
			players[id].board.push(champ);
			GameFactory.updateBoardIndexes(players[id].board);
		}
	}

}