Template.signup.events({
	'click button': function(e, template) {
		e.preventDefault();
		Accounts.createUser({
			email: template.find("#su-email").value,
			username: template.find("#su-username").value,
			password: template.find("#su-password").value
		});
	}
});

Template.login.events({
	'click button': function(e, template) {
		e.preventDefault();
		Meteor.loginWithPassword(
			template.find("#li-username").value,
			template.find("#li-password").value
			);
	}
});

Template.logout.events({
	'click button': function(e, template) {
		e.preventDefault();
		Meteor.logout();
	}
});