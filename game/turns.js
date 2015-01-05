Turns = {};

Turns.inHand = function (set, card) {
	var c = set[card.handIndex];
	return (c.health === card.health &&
					c.attack === card.attack &&
					c.id === card.id);
}

Turns.onBoard = function (set, card) {
	var c = set[card.boardIndex];
	return (c.health === card.health &&
					c.attack === card.attack &&
					c.id === card.id);
}

Turns.haveSpell = function (set, spell) {
	for (var i = 0; i < set.length; i++) {
		if (set[i].id === spell.id) {
			return true;
		}
	}
	return false;
}

/***
	Play Card
	***/
Turns.playCard = function (game, id, card, insertAt) {
	var player = game.players[id];
	Turns.addToBoard(game, id, card, insertAt);

	player.board.forEach(function (c) {
		var a;
  	if (c.champion) {
  		a = Champions[c.id];
  	} else {
  		a = Cards[c.id];
  	}
  	if (a.playCard) {
  		a.playCard(card);
  	}
	});

	player.bananas -= card.cost;
	/* Remove it from the hand */

	player.hand.splice(card.handIndex, 1);
	Game.updateHandIndexes(player.hand);
	Game.postActionCheck(game, id);
}



Turns.makeAttack = function (game, id, otherId, myCard, enemyCard) {
  var card = game.players[id].board[myCard.boardIndex];
  var otherCard = game.players[otherId].board[enemyCard.boardIndex];
  if (Meteor.isClient) {
  	GameStream.emit('attack', {from: myCard.boardIndex, to: enemyCard.boardIndex});
  }
  Turns.dealDamage(false, otherCard, card.attack);
  Turns.dealDamage(true, card, otherCard.attack);
  card.canAttack = false;
}

Turns.castTargetedSpell = function (game, id, otherId, spell, enemyCard, own) {
  var card = game.players[own ? id : otherId].board[enemyCard.boardIndex];
  var cast = Spells[spell.id].cast;
  cast(card);
  game.players[id].bananas -= spell.cost;
}

Turns.castSpell = function (game, id, otherId, spell) {
  var cast = Spells[spell.id].cast;
  cast(game, id, otherId);
  game.players[id].bananas -= spell.cost;
}

/****
	Utility Actions
	****/
Turns.addToBoard = function(game, id, card, insertAt) {
	var player = game.players[id];
	if (typeof card === 'number') {
		card = Cards[card];
	}
	card.canAttack = false;
	var index;
	if (typeof insertAt === 'undefined') {
		index = player.board.length;
		player.board.push(card);
	} else {
		index = insertAt;
		player.board.splice(insertAt, 0, card);
	}
	if (Meteor.isClient) {
		GameStream.emit('playCard', {from: card.handIndex, to: index});
		CardAnimator.playedOnBoardIndex = index;
	}
	Game.updateBoardIndexes(player.board);
}

Turns.removeFromBoard = function(game, id, card) {
	game.players[id].board.splice(card.boardIndex, 1);
	Game.updateBoardIndexes(game.players[id].board);
}

Turns.dealDamage = function(me, card, amount) {
	card.health -= amount;
	if (!card.healthChanges) {
		card.healthChanges = [-amount];
	} else {
		card.healthChanges.push(-amount);
	}
}

