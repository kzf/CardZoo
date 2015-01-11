Meteor.methods({
	createGame: function (otherPlayerId) {
		var game = Game.createGame([Meteor.userId(), otherPlayerId]);
		Games.insert(game, function(err, id) {
			if (Meteor.isServer) {
				GameStreams.start(id);
        GameTimers.startLobbyExpire(id);
			}
		});
	},
	playCard: function (gameId, id, card, insertAt) {
		var game = Games.findOne(gameId);
		var player = game.players[id];
		var hand = player.hand;

		if (game.currentTurn[0] !== id || !Turns.inHand(hand, card)) return;
		if (!card.playable) return;
		
		Turns.playCard(game, id, card, insertAt);

		Games.update(gameId, game);
	},
  attackWithCard: function (gameId, id, myCard, enemyCard) {
		var game = Games.findOne(gameId);
		var board = game.players[id].board;

		if (game.currentTurn[0] !== id) return;
    
		var otherId = game.currentTurn[1];
    var otherBoard = game.players[otherId].board;
    
    if (!Turns.onBoard(board, myCard) || !Turns.onBoard(otherBoard, enemyCard)) return;
    if (!myCard.canAttack) return;
    
		Turns.makeAttack(game, id, otherId, myCard, enemyCard);

		Games.update(gameId, game);
	},
  castTargetedSpell: function (gameId, id, spell, enemyCard, own) {
		var game = Games.findOne(gameId);
		var spells = game.players[id].spells;

		if (game.currentTurn[0] !== id) return;
    
		var otherId = game.currentTurn[1];
    var otherBoard = game.players[own ? id : otherId].board;
    
    if (!Turns.haveSpell(spells, spell) || !Turns.onBoard(otherBoard, enemyCard)) return;
    if (!spell.playable) return;
    
		Turns.castTargetedSpell(game, id, otherId, spell, enemyCard, own);

		Games.update(gameId, game);
	},
  castSpell: function (gameId, id,spell) {
		var game = Games.findOne(gameId);
		var spells = game.players[id].spells;

		if (game.currentTurn[0] !== id) return;

		var otherId = game.currentTurn[1];

    if (!Turns.haveSpell(spells, spell)) return;
    if (!spell.playable) return;
    
		Turns.castSpell(game, id, otherId, spell);

		Games.update(gameId, game);
	},
  endTurn: function (gameId, id) {
    var game = Games.findOne(gameId);
    if (game.currentTurn[0] !== id) return;
    
    var otherId = game.currentTurn[1];

    // END TURN
    game.players[id].board.forEach(function(card) {
    	var c;
    	if (card.champion) {
    		c = Champions[card.id];
    	} else {
    		c = Cards[card.id];
    	}
    	if (c.endTurn) {
    		c.endTurn(game, id, otherId);
    	}
    });
    
    game.currentTurn.unshift(game.currentTurn.pop());

    // START TURN
    game.players[otherId].board.forEach(function(card) {
    	var c;
    	if (card.champion) {
    		c = Champions[card.id];
    	} else {
    		c = Cards[card.id];
    	}
    	if (c.startTurn) {
    		c.startTurn(game, otherId, id);
    	}
    });

		Game.dealPlayer(game.players[otherId]);
		if (game.players[otherId].maxbananas < Config.maxBananas) {
			game.players[otherId].maxbananas++;
		}
		game.players[otherId].bananas = game.players[otherId].maxbananas;

    Game.startAttackingTurn(game.players[otherId]);
		Game.updateCanAttack(otherId, game.players);

    if (Meteor.isServer) {
      GameTimers.startTurnTimer(gameId, otherId);
    }
    
    Games.update(gameId, game);
  },
  postActionCheck: function(gameId, id) {
  	var game = Games.findOne(gameId);
  	Game.postActionCheck(game, id);
  	Games.update(gameId, game);
  },
  surrender: function(gameId, id) {
  	var game = Games.findOne(gameId);
  	var otherId;
  	if (game.currentTurn[0] === id) {
  		otherId = game.currentTurn[1];
  	} else {
  		otherId = game.currentTurn[0];
  	}
  	game.players = undefined;
  	Game.declareWinner(game, otherId);
  	Games.update(gameId, game);
  },
  toggleReady: function(gameId, id) {
    var game = Games.findOne(gameId);
    var otherId;
    if (game.currentTurn[0] === id) {
      otherId = game.currentTurn[1];
    } else {
      otherId = game.currentTurn[0];
    }
    game.players[id].ready = !game.players[id].ready;
    if (game.players[otherId].ready && game.players[id].ready) {
      Game.startGame(game);
    }
    Games.update(gameId, game);
  },
  selectChampion: function(gameId, id, champId) {
    var game = Games.findOne(gameId);
    game.players[id].whichChampion = champId;
    Games.update(gameId, game);
  },
  selectSpell: function(gameId, id, spellId) {
    var game = Games.findOne(gameId);
    if (spellId === game.players[id].whichSpells[0] || spellId === game.players[id].whichSpells[1]) {
      return;
    }
    game.players[id].whichSpells = [game.players[id].whichSpells[1], spellId];
    Games.update(gameId, game);
  },
  deleteGame: function(gameId) {
    Games.remove(gameId);
  }
});