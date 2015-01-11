Game.dealPlayer = function(player) {
	if (player.deck.length > 0 && player.hand.length < Config.maxCardsInHand) {
		var newCard = Cards[player.deck.shift()];
		player.hand.push({
			id: newCard.id,
			health: newCard.health,
			attack: newCard.attack,
			cost: newCard.cost
		});
		Game.updateHandIndexes(player.hand);
	} else {
		player.board.forEach(function(c) {
			Turns.dealDamage(c, 1);
		});
	}
}

Game.updateHandIndexes = function(hand) {
	for (var i = 0; i < hand.length; i++) {
		hand[i].handIndex = i;
	}
}

Game.updateBoardIndexes = function(board) {
	for (var i = 0; i < board.length; i++) {
		board[i].boardIndex = i;
	}
}