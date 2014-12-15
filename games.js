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
		var hand = game.players[id].hand;

		if (game.currentTurn[0] !== id || !Turns.inHand(hand, card)) return;
		
		Turns.playCard(game, id, card);

		Games.update(gameId, game);
	},
  attackWithCard: function (gameId, id, myCard, enemyCard) {
		var game = Games.findOne(gameId);
		var board = game.players[id].board;

		if (game.currentTurn[0] !== id) return;
    
		var otherId = game.currentTurn[1];
    var otherBoard = game.players[otherId].board;
    
    if (!Turns.onBoard(board, myCard) || !Turns.onBoard(otherBoard, enemyCard)) return;
    
		Turns.makeAttack(game, id, otherId, myCard, enemyCard);

		Games.update(gameId, game);
	},
  endTurn: function (gameId, id) {
    var game = Games.findOne(gameId);
    if (game.currentTurn[0] !== id) return;
    
    var otherId = game.currentTurn[1];
    
    game.currentTurn.unshift(game.currentTurn.pop());
		game.players[id].turn = false;
		game.players[otherId].turn = true;

		GameFactory.dealPlayer(game.players[otherId]);
    
    Games.update(gameId, game);
  }
});