GameTimers = {
	timers: {}
};

GameTimers.startLobbyExpire = function(gameId) {
	this.timers[gameId] = Meteor.setTimeout(function () {
		Meteor.call('deleteGame', gameId);
	}, 15 * 1000);
}

GameTimers.startTurnTimer = function(gameId, playerId) {
	this.clear(gameId);
	this.timers[gameId] = Meteor.setTimeout(function() {
		Meteor.call('endTurn', gameId, playerId);
    Meteor.setTimeout(function() {
      Meteor.call('postActionCheck', gameId, playerId);
    }, 400);
	}, 10 * 1000);
}

GameTimers.clear = function(gameId) {
	Meteor.clearTimeout(this.timers[gameId]);
}