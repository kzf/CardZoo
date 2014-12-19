CardDrag = {
	duringDrag: false
};

CardDrag.startDrag = function(game, id, card, el) {
	this.dragging = el;
	this.duringDrag = true;

	this.card = card;

	var startEl = el;
	this.startEl = el;
	startEl.addClass("dragging");

  var offset = startEl.offset();
  var cy = offset.top + startEl.height()/2;
  var cx = offset.left + startEl.width()/2;
  startEl.css("transition", "none");
  
  this.boardoffset = $(".board").offset();
  this.boardlimit = {
    x: this.boardoffset.left + $(".board").width(),
    y: this.boardoffset.top + $(".board").height()
  };
  
  var body = $("body");
  
  var mousemove = function (e) {
    var dx = e.clientX - cx;
    var dy = e.clientY + body.scrollTop() - cy;
    startEl.css("transform", "translate("+dx+"px, "+dy+"px)");
  };
  addEventListener("mousemove", mousemove);

  this.cleanup = function() {
  	el.removeClass("dragging");
  	removeEventListener("mousemove", mousemove);
  }
}

CardDrag.endDrag = function(e, gameId, id) {
	console.log(e);
  var mx = e.clientX;
  var my = e.clientY + $("body").scrollTop();
  if (mx > this.boardoffset.left && mx < this.boardlimit.x &&
      my > this.boardoffset.top && my < this.boardlimit.y) {
  	Meteor.call('playCard', gameId, id, this.card);
  	this.startEl.attr("style", "");
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