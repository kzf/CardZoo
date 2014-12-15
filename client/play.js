Template.play.helpers({
	game: function() {
		var game = Games.findOne(this._id);
		if (!game) {
      return { otherPlayer: { username: 'not loaded yet' }};
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


var cardHelper = {
	card: function() {
		return Cards[this];
	}
};
Template.handCard.helpers(cardHelper);
Template.boardCard.helpers(cardHelper);

Template.play.events({
	'click #my_hand .card': function (e, template) {
		var id = Meteor.userId();
		if (game.currentTurn[0] === id) {
			Meteor.call('playCard', template.data._id, id, this);
		}
	},
  /* Starting to attack with a minion */
  'mousedown #my_board .card': function (e, template) {
    var id = Meteor.userId();
		var game = Games.findOne(template.data._id);
    if (game.currentTurn[0] === id) {
      Targeting.startAttack(game, id, this, $(e.target));
    }
  },
  /* Finishing an attack */
  'mouseup': function (e, template) {
    if (Targeting.isDuringAttack()) {
      console.log(e, e.target);
      Targeting.endAttack();
    }
  },
  /* Hovering over a card while attacking */
  'mouseover #opponent_board .card': function (e, template) {
    if (Targeting.isDuringAttack()) {
      $(e.target).addClass("targeting");
    }
  },
  /* Hovering out of a card while attacking */
  'mouseout #opponent_board .card': function (e, template) {
    if (Targeting.isDuringAttack()) {
      $(e.target).removeClass("targeting");
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