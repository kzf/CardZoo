/***
  CardDrag
  -------------
  Handles dragging of cards from the hand to the game board,
  its effect on the game board and triggering related events.
  ****/

CardDrag = {
	duringDrag: false
};

// startDrag
// game:   the game object
// id:     the game id
// card:   the card object corresponding to the DOM element we are dragging
// el:     the DOM element we are dragging
CardDrag.startDrag = function(game, id, card, el) {
	this.dragging = el;
	this.duringDrag = true;

	this.card = card;

	var startEl = el;
	this.startEl = el;
	startEl.addClass("dragging");

  // Compute the start (x,y) position of the centre of the card
  var offset = startEl.offset();
  var cy = offset.top + startEl.height()/2;
  var cx = offset.left + startEl.width()/2 + parseInt(startEl.find(".card").css("margin-left"))/2;
  
  // Remove transition property from the card so that the element
  // can instantly follow the cursor
  startEl.css("transition", "none");
  
  /***
    Next handle setting up the animation of board elements as we move the
    dragged card around to show where the card will be played.
   ***/

  var boardoffset = $(".board").offset();
  // Top and bottom of the board (where dropping will play the card)
  var boardtop = boardoffset.top;
  this.boardtop = boardoffset.top;
  var boardbottom = boardoffset.top + $(".board").height();
  this.boardbottom = boardoffset.top + $(".board").height();

  // Compute boardstops array with the property that if we release at
  // x-values between boardstops[i] and boardstops[i+1] then the
  // card will be played at index i on the board.
  this.boardstops = [boardoffset.left];
  var boardstops = this.boardstops;
  $("#my_board .card").each(function(i, el) {
  	var mid = $(el).offset().left + $(el).width()/2;
  	boardstops.push(mid);
  });

  this.boardstops.push(boardoffset.left + $(".board").width());
  
  var $window = $(window);

  var mousemove = function (e) {
  	var mx = e.clientX;
  	var my = e.clientY + $window.scrollTop();
    var dx = mx - cx;
    var dy = my - cy;
    // Move card to current cursor position
    startEl.css("transform", "translate("+dx+"px, "+dy+"px)");
    // If we are within the board bounds, find the board index where
    // we are hovering over and move surrounding cards to make a gap.
    if (mx > boardstops[0] && 
        mx < boardstops[boardstops.length-1] &&
        my > boardtop && 
        my < boardbottom) {
		  var index = 1;
			while (mx > boardstops[index]) {
				index++;
			}
			index--;
			$("#my_board .card").each(function(i, el) {
				if (i < index) {
					$(el).css("transform", "translateX(-65px)");
				} else {
					$(el).css("transform", "translateX(65px)");
				}
			});
	  } else {
	  	$("#my_board .card").each(function(i, el) {
				$(el).css("transform", "none");
			});
	  }
  };
  addEventListener("mousemove", mousemove);

  this.cleanup = function() {
  	el.removeClass("dragging");
  	removeEventListener("mousemove", mousemove);
  }
}

CardDrag.endDrag = function(e, gameId, id) {

  var startEl = this.startEl;
  var $el = startEl.find(".card");
  var mx = e.clientX;
  var my = e.clientY + $(window).scrollTop();

  // Play the card if we are within the board bounds
  if (mx > this.boardstops[0] && mx < this.boardstops[this.boardstops.length-1] &&
      my > this.boardtop && my < this.boardbottom) {
  	var index = 1;
		while (mx > this.boardstops[index]) {
			index++;
		}
		index--;
    $el.css("opacity", "0");
    var card = this.card;
    $el.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd transitionEnd msTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd animationEnd msAnimationEnd', function(e) {
      
      var handIndex = card.handIndex;
      startEl.css("transform", "none");

      // Let animation module know which card we played
      CardAnimator.justRemovedFromHand = handIndex;
      // Let opponent know which card we played
      GameStream.emit('playCard', {from: handIndex, to: index});
      // Play the card
      Meteor.call('playCard', gameId, id, card, index);
      // After animation, perform the cleanup
      Meteor.setTimeout(function() {
        Meteor.call('postActionCheck', gameId, id);
      }, 400);

      $el.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd transitionEnd msTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd animationEnd msAnimationEnd');
    });
  	
  } else {
    this.startEl.css("transition", "all .3s ease");
    this.startEl.css("transform", "translate(0px, 0px)");
  }

  this.cleanup();
  this.duringDrag = false;
}

CardDrag.isDuringDrag = function () {
  return this.duringDrag;
}
