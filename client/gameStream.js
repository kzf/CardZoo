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

	/****
		Arrow
		****/
	this.stream.on('Arrow.start', function(i) {
		var $el = $($("#opponent_board .card")[i]);
		Arrow.start($el);
	});

	this.stream.on('Arrow.pointAt', function(i) {
		var $el = $($("#my_board .card")[i]);
		var offset = $el.offset();
		var x = offset.left + $el.width()/2;
		var y = offset.top + $el.height()/2;
		Arrow.pointAt(x, y);
	});

	this.stream.on('Arrow.dontPoint', function() {
		Arrow.dontPoint();
	});

	this.stream.on('Arrow.remove', function() {
		Arrow.remove();
	});

	/****
		Chat
		****/
	this.stream.on('chat', function(message) {
		Chat.saveMessage(false, message);
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