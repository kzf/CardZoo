Targeting = {  };

Targeting.startAttack = function (game, id, card, el) {
  this.duringAttack = true;
  
  this.start = {
    el: el,
    card: card
  };
  
  el.addClass("start-attack");
  
  var offset = el.offset();
  var w = el.width();
  var sx = offset.left + w/2;
  var sy = offset.top + el.height()/2 - 20;
  var arrowBody = $("<div>").addClass("arrow-body").hide();

  var body = $("body");
  body.append(arrowBody);
  
  var mousemove = function(e) {
    var mx = e.clientX;
    var my = e.clientY + body.scrollTop();
    var length = Math.sqrt((mx-sx)*(mx-sx) + (my-sy)*(my-sy)) - 30;
    var ang = Math.atan2(mx - sx, my - sy) - Math.PI/2;
    var transform =  'translate(' + sx + 'px,' + sy + 'px) ' + 
        'rotate(' + -ang + 'rad)';
    arrowBody.show().css("transform", transform);
    arrowBody.css("width", length);
  };
  
  this.cleanup = function() {
    arrowBody.remove();
    el.removeClass("start-attack");
    removeEventListener("mousemove", mousemove);
  }
  
  addEventListener("mousemove", mousemove);
}

Targeting.completeAttack = function(gameId, id, card, el) {
  this.end = {
    el: el,
    card: card
  };
  el.removeClass("targeting");
  this.cleanup();
  this.duringAttack = false;
  Meteor.call('attackWithCard', gameId, id, this.start.card, this.end.card);
}

Targeting.failAttack = function() {
  this.duringAttack = false;
  this.cleanup();
}

Targeting.isDuringAttack = function () {
  return this.duringAttack;
}
