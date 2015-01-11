GameTimers = {
	timers: {}
};

GameTimers.startLobbyExpire = function(gameId) {
	this.timers[gameId] = Meteor.setTimeout(function () {
		Meteor.call('deleteGame', gameId);
	}, Config.lobbyDuration * 1000);
}

GameTimers.startTurnTimer = function(game, gameId, playerId) {
	game.timerStart = Date.now();
	game.timerDuration = Config.turnDuration;
	this.clear(gameId);
	this.timers[gameId] = Meteor.setTimeout(function() {
		Meteor.call('endTurn', gameId, playerId);
    Meteor.setTimeout(function() {
      Meteor.call('postActionCheck', gameId, playerId);
    }, 400);
	}, Config.turnDuration * 1000);
}

GameTimers.clear = function(gameId) {
	Meteor.clearTimeout(this.timers[gameId]);
}