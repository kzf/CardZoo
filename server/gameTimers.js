GameTimers = {
	timers: {}
};

GameTimers.startLobbyExpire = function(gameId) {
	this.timers[gameId] = Meteor.setTimeout(function () {
		Meteor.call('deleteGame', gameId);
	}, 15 * 1000);
}

GameTimers.clear = function(gameId) {
	Meteor.clearTimeout(this.timers[gameId]);
}