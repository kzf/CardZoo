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
	var boardCard = Turns.addToBoard(game, id, card, insertAt);

	player.board.forEach(function (c) {
		var a;
  	if (c.champion) {
  		a = Champions[c.id];
  	} else {
  		a = Cards[c.id];
  	}
  	if (a.playCard) {
  		a.playCard(boardCard);
  	}
	});

	player.bananas -= card.cost;
	/* Remove it from the hand */

	player.hand.splice(card.handIndex, 1);
	Game.updateHandIndexes(player.hand)
}



Turns.makeAttack = function (game, id, otherId, myCard, enemyCard) {
  var card = game.players[id].board[myCard.boardIndex];
  var otherCard = game.players[otherId].board[enemyCard.boardIndex];
  if (Meteor.isClient) {
  	GameStream.emit('attack', {from: myCard.boardIndex, to: enemyCard.boardIndex});
  }
  Turns.dealDamage(otherCard, card.attack);
  Turns.dealDamage(card, otherCard.attack);
  card.numAttacks++;
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
	var boardCard = {
		id: card.id,
		health: card.health,
		attack: card.attack,
		canAttack: false,
		attackDelay: 1,
		maxAttacks: Cards[card.id].maxAttacks
	}
	var index;
	if (typeof insertAt === 'undefined') {
		index = player.board.length;
		player.board.push(boardCard);
	} else {
		index = insertAt;
		player.board.splice(insertAt, 0, boardCard);
	}
	if (Meteor.isClient && typeof card !== 'number') {
		GameStream.emit('playCard', {from: card.handIndex, to: index});
		CardAnimator.playedOnBoardIndex = index;
	}
	Game.updateBoardIndexes(player.board);
	return boardCard;
}

Turns.removeFromBoard = function(game, id, card) {
	game.players[id].board.splice(card.boardIndex, 1);
	Game.updateBoardIndexes(game.players[id].board);
}

Turns.dealDamage = function(card, amount) {
	if (amount === 0) return;
	card.health -= amount;
	if (!card.healthChanges) {
		card.healthChanges = [];
	}
	card.healthChanges.push({amount: -amount, change: 'down'});
}

Turns.heal = function(card, amount) {
	if (amount === 0) return;
	card.health += amount;
	if (!card.healthChanges) {
		card.healthChanges = [];
	}
	card.healthChanges.push({amount: '+' + amount, change: 'up'});
}

Turns.weaken = function(card, amount) {
	if (amount === 0) return;
	card.attack = Math.max(0, card.attack - amount);
	if (!card.attackChanges) {
		card.attackChanges = [];
	}
	card.attackChanges.push({amount: -amount, change: 'down'});
}

Turns.strengthen = function(card, amount) {
	if (amount === 0) return;
	card.attack += amount;
	if (!card.attackChanges) {
		card.attackChanges = [];
	}
	card.attackChanges.push({amount: '+' + amount, change: 'up'});
}