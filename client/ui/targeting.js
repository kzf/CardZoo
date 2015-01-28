Targeting = {
  duringAttack: false,
  duringSpell: false
};

// Targeting an attack from one minion to another
Targeting.startAttack = function (game, id, card, el) {
  this.duringAttack = true;
  
  this.start = {
    el: el,
    card: card
  };
  
  Arrow.start(el, 'attack');
  GameStream.emit('Arrow.start', {type: 'attack', index: card.boardIndex});

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


// Targeting a spell to a minion
Targeting.startSpell = function (game, id, card, el) {
  this.duringSpell = true;
  
  this.start = {
    el: el,
    spell: card
  };
  
  Arrow.start(el, 'spell');
  GameStream.emit('Arrow.start', {type: 'spell', index: card.index});

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
