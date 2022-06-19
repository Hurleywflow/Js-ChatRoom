// get classList from the element
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const userNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
// add event to the new chat
newChatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatrooms
    .addChat(message)
    .then(() => {
      // clear up input form
      newChatForm.reset();
    })
    .catch((err) => {
      console.error(err);
    });
});

// add event to update userName
userNameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newName = userNameForm.name.value.trim();
  /* Updating the username in the database. */
  chatrooms.updateUsername(newName);
  // reset form
  userNameForm.reset();
  // show and hide message
  updateMssg.innerText = `Your name is now ${newName}`;
  setTimeout(() => {
    updateMssg.innerText = '';
  }, 3000);
});
// class UI instance
const chatUI = new ChatUI(chatList);
// class instance methods
const chatrooms = new Chatroom('gaming', 'John');

// get chats and render them
chatrooms.getCHats((data) => {
  chatUI.render(data);
});

