var animEvents = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd transitionEnd msTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd animationEnd msAnimationEnd';

Animation.Damage = function($el, amount) {
	var $bg = $("<div>").addClass("damage-bg");
	var $damage = $("<span>").addClass("damage-amount").text("-" + amount);
	$el.append($bg).append($damage);
	console.log("STARTING DAMAGE");
	$damage.on(animEvents, function() {
		console.log("REMOVING DAMAGE");
		$bg.remove();
		$damage.off();
		$damage.remove();
	});
}