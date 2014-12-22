GameStreams = {};

GameStreams.start = function(id) {
	console.log("initialising stream " + 'game' + id);
	var stream = new Meteor.Stream('game' + id)
	stream.permissions.write(function() {
	  return true;
	});

	stream.permissions.read(function() {
	  return true;
	});
	GameStreams[id] = stream;
}