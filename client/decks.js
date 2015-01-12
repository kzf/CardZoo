Template.deckList.helpers({
  noDecks: function() {
    return typeof this.decks === 'undefined' || this.decks.length === 0;
  },
  decks: function() {
    var decks = this.decks;
    if (typeof this.decks === 'undefined') return;
    decks.forEach(function (d, i) {
      d.index = i;
      d.usable = d.total >= Config.minCardsInDeck && d.total <= Config.maxCardsInDeck;
    });
    return decks;
  }
})

Template.deckList.events({
	'click #new_deck': function (e, template) {
		Meteor.call('createNewDeck', template.data._id);
	}
})

Template.deck.helpers({
	deck: function() {
		var user = Meteor.users.findOne(Meteor.userId());
		var deck = user.decks[this._id];
		deck.cards = [];
		for (var k in deck.deck) {
			if (deck.deck.hasOwnProperty(k) && deck.deck[k] > 0) {
				deck.cards.push(_.extend({
					copies: deck.deck[k]
				}, Cards[k]));
			}
		}
    deck.cards.sort(function(a, b) {
      var dCost = a.cost - b.cost;
      if (dCost) return dCost;
      return a.name > b.name;
    });
    deck.usable = deck.total >= Config.minCardsInDeck && deck.total <= Config.maxCardsInDeck;
    deck.noCards = deck.cards.length === 0;
		return deck;
	},
	cards: function() {
    var cards = Cards.slice(0);
    cards.sort(function(a, b) {
      var dCost = a.cost - b.cost;
      if (dCost) return dCost;
      return a.name > b.name;
    });
    return cards;
  },
  minCards: function() {
    return Config.minCardsInDeck;
  },
  maxCards: function() {
    return Config.maxCardsInDeck;
  }
})

Template.deck.events({
	'click .card-list-row': function(e, template) {
		Meteor.call('addToDeck', Meteor.userId(), template.data._id, this.id);
	},
	'click .deck-list-row': function(e, template) {
		Meteor.call('removeFromDeck', Meteor.userId(), template.data._id, this.id);
	},
	'click #decks': function() {
    Router.go('/decks');
  },
  'click #save_name': function(e, template) {
  	Meteor.call('changeDeckName', Meteor.userId(), template.data._id, template.find("#deck_name").value);
  },
  'click #delete_deck': function(e, template) {
  	Meteor.call('deleteDeck', Meteor.userId(), template.data._id);
  	Router.go('/decks/');
  }
})

Template.deck.rendered = function() {
	var noCardsMessage = $("#no_cards_found").hide();
  $('#cards_filter').fastLiveFilter('#cards_list', {
  	callback: function(i) {
  		if (i === 0) {
  			noCardsMessage.show();
  		} else {
  			noCardsMessage.hide();
  		}
  	}
  });
};