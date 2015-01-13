GameStream = {
	streams: {}
};

GameStream.init = function(id) {
	console.log("trying to connect to " + 'game' + id);
	
	if (typeof this.stream !== 'undefined') {
		if (this.stream === this.streams[id]) return;
		this.stream.removeAllListeners();
	}

	if (this.streams.hasOwnProperty(id)) {
		console.log("LOADING already created stream");
		this.stream = this.streams[id];
	} else {
		console.log("CREATING stream");
		this.stream = new Meteor.Stream('game' + id);
		this.streams[id] = this.stream;
	}

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
	this.stream.on('Arrow.start', function(data) {
		var $el;
		if (data.type === 'attack') {
			$el = $($("#opponent_board .card")[data.index]);
		} else {
			$el = $($("#opponent_spells .spell")[data.index]);
		}
		Arrow.start($el);
	});

	this.stream.on('Arrow.pointAt', function(data) {
		var board = data.mine ? "#opponent_board" : "#my_board";
		var $el = $($(board + " .card")[data.index]);
		var offset = $el.offset();
		var x = offset.left + $el.width()/2;
		var y = offset.top + $el.height()/2;
		Arrow.pointAt(x, y);
		$el.addClass("targeting");
	});

	this.stream.on('Arrow.dontPoint', function() {
		Arrow.dontPoint();
		$(".targeting").removeClass("targeting");
	});

	this.stream.on('Arrow.remove', function() {
		Arrow.remove();
		$(".targeting").removeClass("targeting");
	});

	/****
		Chat
		****/
	this.stream.on('chat', function(data) {
		Chat.saveMessage(false, data.message, data.gameId);
	});

	this.stream.on('playCard', function(data) {
		console.log("they played a card");
		CardAnimator.playedFromHandIndex = data.from;
		CardAnimator.playedOnBoardIndex = data.to;
	});
};

GameStream.emit = function(event, message) {
	this.stream.emit(event, message);
};

GameStream.attackHandler = function(data) {
	var $from = $($("#opponent_board .card")[data.from]);
	var $to = $($("#my_board .card")[data.to]);
	Animation.Attack($from, $to);
};