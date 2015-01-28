CardAnimator = {};

// Use Meteor's UI hooks to handle animation when a card is drawn
Template.cardAnimate.rendered = function(){
  var template = this;

  template._animation_helper_parentNode = this.firstNode.parentNode;

  template._animation_helper_parentNode._uihooks = {
    insertElement: function (node, next) {
      var $node = $(node);

      $node.insertBefore(next);

      $node.css("transition", "none");
      $node.css("transform", "translateY(-250px) translateX(80px) rotate(15deg) scale(1.4)");

      Meteor.setTimeout(function() {
        $node.attr("style", "");
      }, 300);

    },
    // Since we are using each() over an array in the view, when a card is
    // played from the hand the DOM element that is destroyed is the last
    // child regardless of which array element was spliced, and the DOM
    // elements contents are just changed to reflect the new array.
    // Hence, we need to somehow find out the index of the card that was removed
    // to actually perform the animation, which we do using a variable on 
    // the global CardAnimator object.
    // We then have to carefully manipulate each of the card DOM elements
    // to get a smooth animation.
    removeElement: function (node, b) {
      var $node = $(node);
      var $parent = $node.parent();

      // Find the one we actually removed
      var index = CardAnimator.justRemovedFromHand;
      var cards = $parent.find(".card");

      var next;

      if (index < cards.length - 1) {
        // fix its properties (opacity, transform)
        next = $(cards[index]);

        // adjust properties of neighbours
        next.addClass("notransition");
        next.css("opacity", 1);
        next.css("margin-left", "80px");
      } else {
        // fix its properties (opacity, transform)
        next = $(cards[index-1]);

        // adjust properties of neighbours
        next.addClass("notransition");
        next.css("opacity", 1);
        next.css("margin-right", "80px");
      }

      // remove end one
      $node.remove();

      // force redraw
      next.width();

      // clean up
      next.removeClass("notransition");
      
      next.attr("style", "");

    }
  };
};

// Use Meteor's UI hooks to handle animation when a card is played to the board
Template.boardAnimate.rendered = function(){
  var template = this;

  template._animation_helper_parentNode = this.firstNode.parentNode;

  template._animation_helper_parentNode._uihooks = {
    insertElement: function (node, next) {
      var $node = $(node);
      var $parent = $(next).parent();

      var $card = $node.find(".card");

      var index = CardAnimator.playedOnBoardIndex;

      var cards = $parent.find(".card");

      // adjust position of other board pieces;
      cards.each(function(i, el) {
        var $el = $(el);
        $el.addClass("notransition");
        if (i !== index) {
          $el.css("transform", "none");
        } else {
          $el.css("transform", "translateY(-30px)");
          $el.css("opacity", "0");
        }
      });
      if (index === cards.length) {
        $card.css("transform", "translateY(-30px)");
        $card.css("opacity", "0.5");
      }

      // insert
      $node.insertBefore(next);

      $card.width();

      cards.each(function(i, el) {
        var $el = $(el);
        $el.removeClass("notransition");
        if (i === index) {
          $el.attr("style", "");
        }
      });
      if (index === cards.length) {
        $card.attr("style", "");;
      }

    }
  };
};