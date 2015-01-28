// Helpers for the Home page

function otherId(game) {
	return game.currentTurn[game.currentTurn[0] === Meteor.userId() ? 1 : 0]
}

Template.gameList.helpers({
	// Find games that are not completed
	// (note that we only subscribe to our own games)
	games: function() {
		var games = Games.find({ completed: false }).map(function (game) {
			game.otherPlayer = Meteor.users.findOne(otherId(game)).username;
			return game;
		});
		return {
			games: games,
			noneFound: games.length === 0
		}
	}
});


Template.userList.helpers({
	users: function() {
		var myid = Meteor.userId(),
				cantPlayAgainst = [myid];

		Games.find({completed: false}).forEach(function (game) {
			cantPlayAgainst.push(otherId(game));
		});

		var users = Meteor.users.find({
			"status.online" : true,
			 _id: { $not: { $in: cantPlayAgainst }}
			}, {sort: {username: 1}});

		return {
			users: users,
			noneFound: users.length === 0
		};
	},

});

// User List 
Template.userList.events({
	'click a': function (e, template) {
		Meteor.call('createGame', this._id);
	}
});

Template.userList.rendered = function() {
	// Set up autorun so that we can restart fastLiveFilter each time
	// the filterable user list changes
	this.autorun(function () {
		var users = Meteor.users.find({ "status.online" : true,  _id: { $not: { $in: [Meteor.userId()] }}});

		// Do something (well, nothing) so that we register a dependency on the users
		// collection and the fastLiveFilter re-initialisation will actually run
		users.forEach(function(i){});

		Tracker.afterFlush(function() {
			// Update fastLiveFilter whenever the currently online users change
			var noUsersMessage = $("#no_users_found").hide();
		  $('#user_filter').fastLiveFilter('#user_list', {
		  	callback: function(i) {
		  		if (i === 0) {
		  			noUsersMessage.show();
		  		} else {
		  			noUsersMessage.hide();
		  		}
		  	}
		  });
		}.bind(this));
	}.bind(this));
};