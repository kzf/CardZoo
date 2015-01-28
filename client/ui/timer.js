/***
	 Timer
	 ----
	 Handles setting up a timer. One timer can be active at a time.
	 ***/

Timer = {};

Timer.setStartTime = function(time, duration) {
	if (this.startTime === time) return;
	this.startTime = time;
	
	var elapsed = Math.round((Date.now() - this.startTime)/1000);
	Timer.setFromSeconds(duration - elapsed);
	var since = 0;

	if (this.timer) clearInterval(this.timer);
	this.timer = setInterval(function() {
		Timer.setFromSeconds(duration - (elapsed + (++since)));
	}, 1000);
}

Timer.setFromSeconds = function(t) {
	if (t < 0) t = 0;
	var minutes = Math.floor(t/60);
  var seconds = t - minutes * 60;
	Session.set("timer", "" + minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}