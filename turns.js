Turns = {};

Turns.inHand = function (set, card) {
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
