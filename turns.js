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
	game.players[id].board.push(card);
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
