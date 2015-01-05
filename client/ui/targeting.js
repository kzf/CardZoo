Targeting = {
  duringAttack: false,
  duringSpell: false
};

Targeting.startAttack = function (game, id, card, el) {
  this.duringAttack = true;
  
  this.start = {
    el: el,
    card: card
  };
  
  Arrow.start(el);
  GameStream.emit('Arrow.start', card.boardIndex);

  var body = $("body");
  
  var mousemove = function(e) {
    var mx = e.clientX;
    var my = e.clientY + body.scrollTop();
    Arrow.pointAt(mx, my);
  };
  
  this.cleanup = function() {
    Arrow.remove();
    removeEventListener("mousemove", mousemove);
    GameStream.emit('Arrow.remove');
  }
  
  addEventListener("mousemove", mousemove);
}


Targeting.completeAttack = function(gameId, id, card, el) {
  this.end = {
    el: el,
    card: card
  };
  var start = this.start.card;
  var end = this.end.card;

  var self = this;

  self.duringAttack = false;
  el.removeClass("targeting");
  self.cleanup();
  Animation.Attack(this.start.el, this.end.el, function() {
    Meteor.call('attackWithCard', gameId, id, start, end);
  }, function() {
    Meteor.call('postActionCheck', gameId, id);
  });
  GameStream.emit('attack', {from: start.boardIndex, to: end.boardIndex});

}

Targeting.failAttack = function() {
  this.duringAttack = false;
  this.cleanup();

}


/*** 
SPELLS
***/
Targeting.startSpell = function (game, id, card, el) {
  this.duringSpell = true;
  
  this.start = {
    el: el,
    spell: card
  };
  
  el.addClass("start-spell");
  
  var offset = el.offset();
  var w = el.width();
  var sx = offset.left + w/2;
  var sy = offset.top + el.height()/2;
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
    el.removeClass("start-spell");
    removeEventListener("mousemove", mousemove);
  }
  
  addEventListener("mousemove", mousemove);
}

Targeting.completeSpell = function(gameId, id, card, el, own) {
  this.end = {
    el: el,
    card: card
  };
  el.removeClass("targeting");
  this.cleanup();
  this.duringSpell = false;
  Meteor.call('castTargetedSpell', gameId, id, this.start.spell, this.end.card, own);
  Meteor.setTimeout(function() {
    Meteor.call('postActionCheck', gameId, id);
  }, 400);
}

Targeting.failSpell = function() {
  this.duringSpell = false;
  this.cleanup();
}


Targeting.isDuringAttack = function () {
  return this.duringAttack;
}

Targeting.isDuringSpell = function () {
  return this.duringSpell;
}
