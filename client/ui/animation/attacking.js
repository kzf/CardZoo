var animEvents = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

Animation.Attack = function(startEl, endEl, damageCallback, endCallback) {
  var so = startEl.offset();
  var sx = so.left + startEl.width()/2;
  var sy = so.top + startEl.height()/2;
  var eo = endEl.offset();
  var ex = eo.left + endEl.width()/2;
  var ey = eo.top + endEl.height()/2;
  // Calculate endpoint so that the cards end up just barely touching
  var length = dist(sx-ex, sy-ey);
  var pcent = (length - 100)/length;
  var Ex = sx + (ex-sx)*pcent;
  var Ey = sy + (ey-sy)*pcent;
  startEl.css("transform", "translate("+(Ex-sx)+"px,"+(Ey-sy)+"px)");
  startEl.css("z-index", 1);
  startEl.on(animEvents, function(e) {
    startEl.css("transform", "none");
    if (damageCallback) {
      damageCallback();
    }
    startEl.off(animEvents);
  });
  Meteor.setTimeout(function() {
    if (endCallback) {
      endCallback();
    }
    startEl.css("z-index", "initial");
  }, 800);
}

function dist(x,y) {
  return Math.sqrt(x*x + y*y);
}