// get classList from the element
const chatList = document.querySelector('.chat-list');
// class UI instance
const chatUI = new ChatUI(chatList);
// class instance methods
const chatrooms = new Chatroom('gaming', 'John');

// get chats and render them
chatrooms.getCHats((data) => {
  chatUI.render(data);
});
