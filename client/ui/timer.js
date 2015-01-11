Timer = {};

Timer.setStartTime = function(time) {
	if (this.startTime === time) return;
	console.log("STARTING setStartTime", time);
	this.startTime = time;
	var elapsed = Math.round((Date.now() - this.startTime)/1000);
	Session.set("timer", elapsed);
	var since = 0;
	if (this.timer) clearInterval(this.timer);
	this.timer = setInterval(function() {
		Session.set("timer", elapsed + (++since));
	}, 1000);
}