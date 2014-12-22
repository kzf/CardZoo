GameStream = {};

GameStream.init = function(id) {
	console.log("trying to connect to " + 'game' + id)
	this.stream = new Meteor.Stream('game' + id);
	console.log(id);

	this.user = Meteor.userId();

	this.stream.on('hover', function(name) {
		//console.log("Hovered over " + name);
	});

	this.stream.on('playCard', function(data) {
		console.log("Got playCard data: " + data);
		CardAnimator.playedFromHandIndex = data.from;
		CardAnimator.playedOnBoardIndex = data.to;
	});
}

GameStream.emit = function(event, message) {
	//console.log("EMITTING");
	this.stream.emit(event, message);
}