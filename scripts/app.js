// get classList from the element
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const userNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
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
rooms.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatrooms.updateRoom(e.target.getAttribute('id'));
    chatrooms.getCHats((data) => {
      chatUI.render(data);
    });
  }
});
// class UI instance
const chatUI = new ChatUI(chatList);
// check local_storage has username
const username = localStorage.username ? localStorage.username : 'Anon';
// class instance methods
const chatrooms = new Chatroom('general', username);

// get chats and render them
chatrooms.getCHats((data) => {
  chatUI.render(data);
});
