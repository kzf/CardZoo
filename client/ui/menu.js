// Handles the main menu

Menu = {};

Menu.show = function() {
	$(".menu-container").css("display", "flex");
};

Menu.hide = function() {
	$(".menu-container").css("display", "none");
};

Menu.toggle = function() {
	var $el = $(".menu-container");
	if ($el.css("display") === "none") {
		$(".menu-container").css("display", "flex");
	} else {
		$(".menu-container").css("display", "none");
	}
};