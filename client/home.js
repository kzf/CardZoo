function otherId(game) {
	return game.currentTurn[game.currentTurn[0] === Meteor.userId() ? 1 : 0]
}

Template.gameList.helpers({
	games: function() {
		return Games.find({ completed: false }).map(function (game) {
			game.otherPlayer = Meteor.users.findOne(otherId(game)).username;
			return game;
		});
	}
});

Template.userList.helpers({
	users: function() {
		var myid = Meteor.userId(),
				cantPlayAgainst = [myid];

		Games.find({inProgress: true}).forEach(function (game) {
			cantPlayAgainst.push(otherId(game));
		});

		return Meteor.users.find({ _id: { $not: { $in: cantPlayAgainst }}});
	},

});

Template.userItem.events({
	'click button': function (e, template) {
		Meteor.call('createGame', template.data._id);
	}
})

