Template.play.helpers({
	game: function() {
		var game = Games.findOne(this._id);
		if (!game) {
			return {};
		}

		game.player = game.players[Meteor.userId()];
		game.yourTurn = game.currentTurn[0] === Meteor.userId();
		var otherId = game.currentTurn[game.yourTurn ? 1 : 0];
		var otherUser = Meteor.users.findOne(otherId);
		
		game.otherPlayer = {
			player: game.players[otherId],
			username: otherUser.username,
			score: game.players[otherId].score
		};
		
		return game;
	}
});