/***
  Arrow
  -------------
  Handles the targeting arrow rendering. Can have one arrow active at once.
  ****/

Arrow = {};

// Create an arrow pointing from the jQuery wrapped element el
// type: 'attack' | 'spell'
Arrow.start = function(el, type) {
	this.el = el.addClass("start-attack");

	var offset = el.offset();
	var w = el.width();
	this.sx = offset.left + w/2;
	this.sy = offset.top + el.height()/2 - (type === 'attack' ? 20 : 0);
	
	this.arrowBody = $("<div>").addClass("arrow-body").hide();

	var body = $("body");
	body.append(this.arrowBody);
}

// Point the currently active arrow at the point (x,y)
Arrow.pointAt = function(x, y) {
	var sx = this.sx, sy = this.sy;

	var length = Math.sqrt((x-sx)*(x-sx) + (y-sy)*(y-sy)) - 30;
  var ang = Math.atan2(x - sx, y - sy) - Math.PI/2;
  var transform =  'translate(' + sx + 'px,' + sy + 'px) ' + 
      'rotate(' + -ang + 'rad)';
  this.arrowBody.show().css("transform", transform);
  this.arrowBody.css("width", length);
}

// Hide the arrow without destroying it
Arrow.dontPoint = function() {
	this.arrowBody.hide();
}

// Destroy the currently active arrow.
Arrow.remove = function() {
	this.arrowBody.remove();
  this.el.removeClass("start-attack");
}