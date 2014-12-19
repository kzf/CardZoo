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
        $node.css("transition", "all .3s");
        $node.css("transform", "none");
      }, 300);

    }
  };
};