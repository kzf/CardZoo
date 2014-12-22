Template.bananasBar.helpers({
  maxBarHeight: function() {
    return Math.max(this.maxbananas*28, 0);
  },
  currentBarHeight: function() {
    return Math.max(this.bananas*28, 0);
  }
});

Template.handCard.helpers({
  playableClass: function() {
    return this.playable ? "playable" : "";
  }
});

Template.spells.helpers({
  playableClass: function() {
    return this.playable ? "playable" : "";
  }
});

Template.boardCard.helpers({
  canAttackClass: function() {
    return this.canAttack ? "playable" : "";
  },
  championClass: function() {
    return this.champion ? "champion" : "";
  }
});

var cardHelper = {
  card: function() {
    return Cards[this];
  }
};
Template.handCard.helpers(cardHelper);
Template.boardCard.helpers(cardHelper);