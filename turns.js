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

Turns.playCard = function (game, id, card) {
	var player = game.players[id];
	player.board.push(card);
	player.flour -= card.cost;
	var hand = game.players[id].hand;
	for (var i = hand.length - 1; i >= 0; i--) {
		if (hand[i].id === card.id) {
			hand.splice(i, 1);
			break;
		}
	}
}

Turns.makeAttack = function (game, id, otherId, myCard, enemyCard) {
  var card = Turns.findCard(game.players[id].board, myCard);
  var otherCard = Turns.findCard(game.players[otherId].board, enemyCard);
  otherCard.health -= card.attack;
  card.health -= otherCard.attack;
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
				card.playable = id === turn && card.cost <= players[id].flour;
			}
		}
	}
	
}