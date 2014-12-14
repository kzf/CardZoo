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
	takeTurn: function (gameId, id, card) {
		var game = Games.findOne(gameId);
		var hand = game.players[id].hand;

		if (game.currentTurn[0] !== id || !Turns.inHand(hand, card)) return;
		var otherId = game.currentTurn[1];
		Turns.playCard(game, id, card);

		game.currentTurn.unshift(game.currentTurn.pop());
		game.players[id].turn = false;
		game.players[otherId].turn = true;

		GameFactory.dealPlayer(game.players[otherId]);
		
		Games.update(gameId, game);
	}
});