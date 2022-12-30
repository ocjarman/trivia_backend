class Room {
  constructor(firstUser, roomId, gameStatus = "ready") {
    this.users = [firstUser];
    this.roomId = roomId;
    this.gameStatus = gameStatus;
  }

  addUser({ id, name, roomId }) {
    const existingUser = this.users.find((user) => {
      user.name === name;
    });
    if (existingUser) {
      return { error: "Username is taken" };
    }
    const user = { id, name, roomId };
    this.users.push(user);
    return { user };
  }

  removeUser(id) {
    const newUserArray = this.users.filter((user) => {
      return user.id !== id;
    });
    // reset original users array to the new filtered array
    this.users = newUserArray;
  }

  getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  getAllUsers() {
    return this.users;
  }

  getUserCount() {
    return this.users.length;
  }

  getGameStatus() {
    if (this.gameStatus) {
      return this.gameStatus;
    } else {
      return "no game being played";
    }
  }
  setGameStatus(status) {
    this.gameStatus = status;
  }
}

module.exports = Room;
