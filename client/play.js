
Template.play.rendered = function() {
  if (!this._rendered) {
    this._rendered = true;
    GameStream.init(this.data._id);
  }
}

Template.play.helpers({
	game: function() {
		var game = Games.findOne(this._id);
		if (!game) {
      return { 
        otherPlayer: 
        { username: 'loading...' }
      };
		}

    game.yourTurn = game.currentTurn[0] === Meteor.userId();
    var otherId = game.currentTurn[game.yourTurn ? 1 : 0];
    var otherUser = Meteor.users.findOne(otherId);
    game.otherPlayer = {
      username: otherUser.username
    };

    if (game.completed) {
      game.won = game.winner === Meteor.userId();
    } else {
		  game.player = game.players[Meteor.userId()];
      game.otherPlayer.player = game.players[otherId];
    }
		
		return game;
	}
});


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
    var $card = $(e.target).parents(".card");
		var game = Games.findOne(template.data._id);
    if (game.currentTurn[0] === id && this.canAttack) {
      Targeting.startAttack(game, id, this, $card);
    }
  },
  /* Starting to cast a spell */
  'mousedown #my_spells .spell': function (e, template) {
    var id = Meteor.userId();
    var $spell = $(e.target).parents(".spell");
    var game = Games.findOne(template.data._id);
    if (this.targeted && game.currentTurn[0] === id && this.playable) {
      Targeting.startSpell(game, id, this, $spell);
    }
  },
  /* Finishing an attack */
  'mouseup': function (e, template) {
    if (Targeting.isDuringAttack()) {
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
    var target;
    var ownMinion = $(e.target).parents(".board-side").attr("id") === "my_board";
    if ((Targeting.isDuringAttack() && !ownMinion)
         || Targeting.isDuringSpell()) {
      target = $(e.target).parents(".card");
      GameStream.emit('Arrow.pointAt', {index: target.data("index"), mine: ownMinion});
      target.addClass("targeting");
    }
  },
  /* Hovering out of a card while attacking */
  'mouseout .board-side .card': function (e, template) {
    var target;
    var ownMinion = $(e.target).parents(".board-side").attr("id") === "my_board";
    if ((Targeting.isDuringAttack() && !ownMinion)
         || Targeting.isDuringSpell()) {
      target = $(e.target).parents(".card");
      GameStream.emit('Arrow.dontPoint');
      target.removeClass("targeting");
    }
  },
  'click .end-turn-button': function(e, template) {
    var id = Meteor.userId();
		var game = Games.findOne(template.data._id);
		if (game.currentTurn[0] === id) {
			Meteor.call('endTurn', template.data._id, id);
      Meteor.setTimeout(function() {
        Meteor.call('postActionCheck', template.data._id, id);
      }, 400);
		}
  },
  /*****
    Hovering actions for opponent
  *****/
  /* Hovering over a spell */
  'mouseover #my_spells .spell': function (e, template) {
    GameStream.emit('opponentSpellOver', $(e.target.parentElement).data("index"));
  },
  /* Hovering out of a spell */
  'mouseout #my_spells .spell': function (e, template) {
    GameStream.emit('opponentSpellOut', $(e.target.parentElement).data("index"));
  },
  /* Hovering over a board card */
  'mouseover #my_board .card': function (e, template) {
    GameStream.emit('opponentBoardOver', $(e.target.parentElement).data("index"));
  },
  /* Hovering out of a board card */
  'mouseout #my_board .card': function (e, template) {
    GameStream.emit('opponentBoardOut', $(e.target.parentElement).data("index"));
  },
  /* Hovering over a card */
  'mouseover #my_hand .card': function (e, template) {
    GameStream.emit('opponentCardOver', $(e.target).data("index"));
  },
  /* Hovering out of a card */
  'mouseout #my_hand .card': function (e, template) {
    GameStream.emit('opponentCardOut', $(e.target).data("index"));
  },
  /*****
    Menu Actions
    *****/
  'click .surrender-button': function(e, template) {
    var id = Meteor.userId();
    Chat.saveMessage(true, 'I surrender.');
    GameStream.emit('chat', 'I surrender.');
    Meteor.call('surrender', template.data._id, id);
  },
});