/***
  Animation.Attack
  -------------
  Handles the animation when a card attacks.
  ****/

var animEvents = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

// dist:
//  Distance from (0,0) to (x,y)
function dist(x, y) {
  return Math.sqrt(x*x + y*y);
}

Animation.Attack = function(startEl, endEl, damageCallback, endCallback) {

  var so = startEl.offset();
  // Start x,y position
  var sx = so.left + startEl.width()/2;
  var sy = so.top + startEl.height()/2;

  var eo = endEl.offset();
  // End x,y position
  var ex = eo.left + endEl.width()/2;
  var ey = eo.top + endEl.height()/2;

  // Calculate endpoint so that the cards end up just barely touching
  var length = dist(sx-ex, sy-ey);

  var pcent = (length - 100)/length;
  // We don't want the card to move on top of the other card so
  // we scale the movement back so they cards just touch
  var Ex = sx + (ex-sx)*pcent;
  var Ey = sy + (ey-sy)*pcent;

  startEl.css("transform", "translate("+(Ex-sx)+"px,"+(Ey-sy)+"px)");
  startEl.css("z-index", 1); // Prevent cards from overlapping

  // Once the initial animation has ended, return to original position
  startEl.on(animEvents, function(e) {
    startEl.css("transform", "none");
    if (damageCallback) {
      damageCallback();
    }
    startEl.off(animEvents);
  });

  // Clear card styles when animation has ended
  // Note: Unfortunately trying to listen for a second animation end
  // event in the callback above does not work, so we have to resort to a timeout.
  // TODO: Avoid hardcoding the timeout duration here.
  Meteor.setTimeout(function() {
    if (endCallback) {
      endCallback();
    }
    startEl.attr("style", "");
  }, 800);
}

