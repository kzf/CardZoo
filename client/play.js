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
			username: otherUser.username
		};
		
		return game;
	}
});


var cardHelper = {
	card: function() {
		return Cards[this];
	}
};
Template.handCard.helpers(cardHelper);
Template.boardCard.helpers(cardHelper);

Template.play.events({
	'click .card': function (e, template) {
		var id = Meteor.userId();
		var game = Games.findOne(template.data._id);
		console.log(e, template, this);
		if (game.currentTurn[0] === id) {
			console.log("taking turn");
			Meteor.call('takeTurn', template.data._id, id, this);
		}
	}
});