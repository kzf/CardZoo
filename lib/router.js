Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});

Router.route('/game/:_id', function() {
	this.render('play', {
		data: function() {
			return {'_id': this.params._id};
		}
	})
});

