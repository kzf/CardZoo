var animEvents = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';

Animation.Damage = function($el, amount) {
	var $bg = $("<div>").addClass("damage-bg");
	var $damage = $("<span>").addClass("damage-amount").text("-" + amount);
	$el.append($bg).append($damage);
	$damage.on(animEvents, function() {
		$bg.remove();
		$damage.off();
		$damage.remove();
	});
}