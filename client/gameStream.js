GameStream = {};

GameStream.init = function(id) {
	console.log("trying to connect to " + 'game' + id)
	this.stream = new Meteor.Stream('game' + id);
	console.log(id);

	var self = this;

	this.user = Meteor.userId();

	this.stream.on('opponentBoardOver', function(i) {
		var $el = $($("#opponent_board .card")[i]);
		$el.addClass('opponent-hover');
	});

	this.stream.on('opponentBoardOut', function(i) {
		var $el = $($("#opponent_board .card")[i]);
		$el.removeClass('opponent-hover');
	});

	this.stream.on('opponentSpellOver', function(i) {
		var $el = $($("#opponent_spells .spell")[i]);
		$el.addClass('opponent-hover');
	});

	this.stream.on('opponentSpellOut', function(i) {
		var $el = $($("#opponent_spells .spell")[i]);
		$el.removeClass('opponent-hover');
	});

	this.stream.on('opponentCardOver', function(i) {
		var $el = $($("#opponent_hand .card")[i]);
		$el.addClass('opponent-hover');
	});

	this.stream.on('opponentCardOut', function(i) {
		var $el = $($("#opponent_hand .card")[i]);
		$el.removeClass('opponent-hover');
	});

	this.stream.on('attack', function(data) {
		self.attackHandler(data);
	});

	this.stream.on('playCard', function(data) {
		console.log("Got playCard data: " + data);
		CardAnimator.playedFromHandIndex = data.from;
		CardAnimator.playedOnBoardIndex = data.to;
	});
};

GameStream.emit = function(event, message) {
	//console.log("EMITTING");
	this.stream.emit(event, message);
};

GameStream.attackHandler = function(data) {
	console.log("GOt attack message");
	var $from = $($("#opponent_board .card")[data.from]);
	var $to = $($("#my_board .card")[data.to]);
	Animation.Attack($from, $to);
};