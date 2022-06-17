// class Chatroom
class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unSub;
  }
  // add a new chat
  async addChat(message) {
    // format the chat object
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // add to database
    const response = await this.chats.add(chat);
    return response;
  }
  // get the chats from the database
  getCHats(callback) {
    this.unSub = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            // update UI
            const doc = change.doc;
            callback(doc.data(), doc.id);
          }
        });
      });
  }
  // update the username
  updateUsername(username) {
    this.username = username;
  }
  // update the room
  updateRoom(room) {
    this.room = room;
    console.log('room updated');
    // check if it has chat room and unsubscribe
    if (this.unSub) {
      this.unSub();
    }
  }
}
const chatroom = new Chatroom('gaming', 'John');
chatroom.getCHats((data) => {
  console.log(data);
});
// set up listeners to new room changed
setTimeout(() => {
  chatroom.updateRoom('general');
  chatroom.updateUsername('Hurley');
  chatroom.getCHats((data, id) => {
    console.log(data);
    console.log(id);
  });
  chatroom.addChat('Hello');
}, 3000);
