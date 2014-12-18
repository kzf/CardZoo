Games = new Meteor.Collection('games');

if (Meteor.isServer) {
	Meteor.publish('games', function() {
		return Games.find({ currentTurn: this.userId });
	});

	Meteor.publish('users', function() {
		return Meteor.users.find();
	});
}

if (Meteor.isClient) {
	Meteor.subscribe('games');
	Meteor.subscribe('users');
}

Meteor.methods({
	createGame: function (otherPlayerId) {
		var game = GameFactory.createGame([Meteor.userId(), otherPlayerId]);
		Games.insert(game);
	},
	playCard: function (gameId, id, card) {
		var game = Games.findOne(gameId);
		var player = game.players[id];
		var hand = player.hand;

		if (game.currentTurn[0] !== id || !Turns.inHand(hand, card)) return;
		if (!card.playable) return;
		
		Turns.playCard(game, id, card);
		Turns.updatePlayable(game.players, game.currentTurn);

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
  castSpell: function (gameId, id, spell, enemyCard) {
		var game = Games.findOne(gameId);
		var spells = game.players[id].spells;

		if (game.currentTurn[0] !== id) return;
    
		var otherId = game.currentTurn[1];
    var otherBoard = game.players[otherId].board;
    
    if (!Turns.haveSpell(spells, spell) || !Turns.onBoard(otherBoard, enemyCard)) return;
    if (!spell.playable) return;
    
		Turns.castSpell(game, id, otherId, spell, enemyCard);
		Turns.updatePlayable(game.players, game.currentTurn);

		Games.update(gameId, game);
	},
  endTurn: function (gameId, id) {
    var game = Games.findOne(gameId);
    if (game.currentTurn[0] !== id) return;
    
    var otherId = game.currentTurn[1];
    
    game.currentTurn.unshift(game.currentTurn.pop());

		GameFactory.dealPlayer(game.players[otherId]);
		if (game.players[otherId].maxflour < Config.maxBananas) {
			game.players[otherId].maxflour++;
		}
		game.players[otherId].flour = game.players[otherId].maxflour;

		Turns.updatePlayable(game.players, game.currentTurn);
		Turns.minionsCanAttack(game.players[otherId]);
		Turns.minionsCanAttack(game.players[id], false);
    
    Games.update(gameId, game);
  }
});