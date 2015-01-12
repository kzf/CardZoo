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
  asleepClass: function() {
    return this.attackDelay > 0 ? "asleep" : "";
  },
  Info: function() {
    return this.champion ? Champions[this.id] : Cards[this.id];
  }
});

Template.lobby.helpers({
  champions: function() {
    var self = this;
    return _.map(Champions, function(o) {
      o.selected = o.id === self.player.whichChampion;
      return o;
    });
  },
  spells: function() {
    var self = this;
    return _.map(Spells, function(o) {
      o.selected = o.id === self.player.whichSpells[0] || o.id === self.player.whichSpells[1];
      return o;
    });
  },
  timer: function() {
    Timer.setStartTime(this.timerStart, this.timerDuration);
    return Session.get('timer');
  },
  decks: function() {
    var decks = Meteor.users.findOne(Meteor.userId()).decks;
    if (!decks) decks = [];
    var self = this;
    var filtered = [];
    decks.forEach(function(d, i) {
      if (d.total >= Config.minCardsInDeck && d.total <= Config.maxCardsInDeck) {
        d.id = i;
        d.selected = self.player.whichDeck === d.id;
        filtered.push(d);
      }
    });
    return {
      decks: filtered,
      noneFound: filtered.length === 0
    };
  },
  standardDecks: function() {
    var decks = [
      {
        name: 'Random Deck',
        id: -1
      }
    ];
    var self = this;
    var filtered = [];
    decks.forEach(function(d) {
      d.selected = self.player.whichDeck === d.id;
      filtered.push(d);
    });
    return filtered;
  },
  turnDurations: function() {
    var self = this;
    Config.turnDurations.forEach(function(d) {
      d.selected = self.turnDuration === d.seconds;
    });
    return Config.turnDurations;
  }
});

Template.turnIndicator.helpers({
  timer: function() {
    Timer.setStartTime(this.timerStart, this.timerDuration);
    return Session.get('timer');
  }
});

var cardHelper = {
  card: function() {
    return Cards[this];
  }
};
Template.handCard.helpers(cardHelper);
Template.boardCard.helpers(cardHelper);