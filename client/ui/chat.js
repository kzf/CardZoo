Chat = {};

Chat.saveMessage = function(me, message) {
	var messages = Session.get("chatMessages");
	if (!messages) messages = [];
	messages.push({me: me, message: message});
	Session.set("chatMessages", messages);
}

Template.chat.helpers({
	messages: function() {
		var namedMessages = [];
		var other = this.username;
		Session.get("chatMessages").forEach(function(m) {
			namedMessages.push({
				name: m.me ? 'Me' : other,
				message: m.message
			})
		})
		return namedMessages;
	}
});

Template.chat.events({
	'submit #chat_form': function(e, template) {
		var $msg = $(template.find('#chat-message'));
		var message = $msg.val();
		if (message !== '') {
			Chat.saveMessage(true, message);
			GameStream.emit('chat', message);
			$msg.val("");
		}
		e.preventDefault();
	}
})


Template.chat.rendered = function(){
  var $messages = $(this.firstNode).find(".messages");

  $messages[0]._uihooks = {
    insertElement: function (node, next) {
    	var $node = $(node);
      $node.insertBefore(next);
      console.log($messages.height());
      $messages.scrollTop($messages[0].scrollHeight);
      console.log($messages[0].scrollHeight);
    }
  };

};