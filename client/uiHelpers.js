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
  },
  Info: function() {
    return this.champion ? Champions[this.id] : Cards[this.id];
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
  },
  defensiveClass: function() {
    return this.defensive ? "defensive" : "";
  },
  Info: function() {
    return this.champion ? Champions[this.id] : Cards[this.id];
  }
});

var cardHelper = {
  card: function() {
    return Cards[this];
  }
};
Template.handCard.helpers(cardHelper);
Template.boardCard.helpers(cardHelper);