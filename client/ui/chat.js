/***
		Chat
		Handles the chat UI
	***/

Chat = {
	messages: new Meteor.Collection(null)
};

Chat.saveMessage = function(me, message, gameId) {
	this.messages.insert({
		gameId: gameId,
		me: me,
		message: message
	});
}

Template.chat.helpers({
	// Helper that fetches an array of messages with names 
	// attached
	messages: function() {
		var namedMessages = [];
		var other = this.otherPlayer.username;
		var messages = Chat.messages.find({gameId: this._id});
		messages.forEach(function(m) {
			namedMessages.push({
				name: m.me ? 'Me' : other,
				message: m.message
			})
		});
		return namedMessages;
	}
});

Template.chat.events({
	// Submitting a chat message
	'submit #chat_form': function(e, template) {
		var $msg = $(template.find('#chat-message'));
		var message = $msg.val();
		if (message !== '') {
			Chat.saveMessage(true, message, template.data._id);
			GameStream.emit('chat', {message: message, gameId: template.data._id});
			$msg.val("");
		}
		e.preventDefault();
	}
})


Template.chat.rendered = function(){
	// Scroll to bottom of chat each time a new message is shown
  var $messages = $(this.firstNode).find(".messages");
  $messages.scrollTop($messages[0].scrollHeight);

  $messages[0]._uihooks = {
    insertElement: function (node, next) {
    	var $node = $(node);
      $node.insertBefore(next);
      $messages.scrollTop($messages[0].scrollHeight);
    }
  };
};