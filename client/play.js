Template.play.helpers({
	game: function() {
		var game = Games.findOne(this._id);
		if (!game) {
      console.log("Sending back a dodgy temporary template");
      return { 
        otherPlayer: 
        { username: 'not loaded yet' }
      };
		}

		game.player = game.players[Meteor.userId()];
		game.yourTurn = game.currentTurn[0] === Meteor.userId();
		var otherId = game.currentTurn[game.yourTurn ? 1 : 0];
		var otherUser = Meteor.users.findOne(otherId);
		
		game.otherPlayer = {
			player: game.players[otherId],
			username: otherUser.username
		};
		
		return game;
	}
});

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

Template.play.events({
	'mousedown #my_hand .card': function (e, template) {
		var id = Meteor.userId();
    var game = Games.findOne(template.data._id);
		if (game.currentTurn[0] === id && this.playable && $(e.target.parentElement).hasClass("card-container")) {
			CardDrag.startDrag(game, id, this, $(e.target.parentElement));
		}
	},
  'click #my_spells .spell': function (e, template) {
    var id = Meteor.userId();
    var game = Games.findOne(template.data._id);
    if (!this.targeted && game.currentTurn[0] === id && this.playable) {
      Meteor.call('castSpell', template.data._id, id, this);
    }
  },
  /* Starting to attack with a minion */
  'mousedown #my_board .card': function (e, template) {
    var id = Meteor.userId();
		var game = Games.findOne(template.data._id);
    if (game.currentTurn[0] === id && this.canAttack) {
      Targeting.startAttack(game, id, this, $(e.target.parentElement));
    }
  },
  /* Starting to cast a spell */
  'mousedown #my_spells .spell': function (e, template) {
    var id = Meteor.userId();
    var game = Games.findOne(template.data._id);
    if (this.targeted && game.currentTurn[0] === id && this.playable) {
      Targeting.startSpell(game, id, this, $(e.target.parentElement));
    }
  },
  /* Finishing an attack */
  'mouseup': function (e, template) {
    if (Targeting.isDuringAttack()) {
      console.log($(e.target.parentElement.parentElement.parentElement.parentElement));
      if ($(e.target.parentElement.parentElement.parentElement.parentElement).attr("id") === "opponent_board") {
        Targeting.completeAttack(template.data._id, Meteor.userId(), this, $(e.target.parentElement));
      } else {
        Targeting.failAttack();
      }
    } else if (Targeting.isDuringSpell()) {
      var target_el = $(e.target.parentElement.parentElement.parentElement.parentElement).attr("id");
      if (target_el === "opponent_board") {
        Targeting.completeSpell(template.data._id, Meteor.userId(), this, $(e.target.parentElement), false);
      } else if (target_el === "my_board") {
        Targeting.completeSpell(template.data._id, Meteor.userId(), this, $(e.target.parentElement), true);
      } else {
        Targeting.failSpell();
      }
    } else if (CardDrag.isDuringDrag()) {
      CardDrag.endDrag(e, template.data._id, Meteor.userId());
    }
  },
  /* Hovering over a card while attacking */
  'mouseover .board-side .card': function (e, template) {
    var target_el = $(e.target.parentElement.parentElement.parentElement.parentElement).attr("id");
    if ((Targeting.isDuringAttack() && target_el === "opponent_board")
         || Targeting.isDuringSpell()) {
      $(e.target.parentElement).addClass("targeting");
    }
  },
  /* Hovering out of a card while attacking */
  'mouseout .board-side .card': function (e, template) {
    var target_el = $(e.target.parentElement.parentElement.parentElement.parentElement).attr("id");
    if ((Targeting.isDuringAttack() && target_el === "opponent_board")
         || Targeting.isDuringSpell()) {
      $(e.target.parentElement).removeClass("targeting");
    }
  },
  'click .end-turn-button': function(e, template) {
    var id = Meteor.userId();
		var game = Games.findOne(template.data._id);
		if (game.currentTurn[0] === id) {
			Meteor.call('endTurn', template.data._id, id);
		}
  }
});