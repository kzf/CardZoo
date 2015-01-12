Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/game/:_id', function() {
	this.render('play', {
		data: function() {
			return {'_id': this.params._id};
		}
	})
});

Router.route('/decks');

Router.route('/decks/:_id', function() {
	this.render('deck', {
		data: function() {
			return {'_id': this.params._id};
		}
	})
});

Router.route('/(.*)', {name: 'home'});