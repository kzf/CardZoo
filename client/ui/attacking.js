var animEvents = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

AttackAnimation = {};

AttackAnimation.start = function(startEl, endEl) {
  console.log(startEl, endEl);
  var so = startEl.offset();
  var sx = so.left + startEl.width()/2;
  var sy = so.top + startEl.height()/2;
  var eo = endEl.offset();
  var ex = eo.left + endEl.width()/2;
  var ey = eo.top + endEl.height()/2 + 10;
  startEl.css("transform", "translate("+(ex-sx)+"px,"+(ey-sy)+"px)");
  startEl.on(animEvents, function(e) {
    startEl.css("transform", "none");
    startEl.trigger("doAttack");
    startEl.off(animEvents);
  });
  Meteor.setTimeout(function() {
    startEl.trigger("postAttack");
  }, 400);
}