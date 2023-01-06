class Room {
  constructor(firstUser, roomId, gameStatus = "ready") {
    this.users = [firstUser];
    this.roomId = roomId;
    this.gameStatus = gameStatus;
    this.gameScores = [];
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
  setGameScore(gameData) {
    this.gameScores.push(gameData);
    // this.gameScores = this.gameScores
  }
  getAllScores() {
    return this.gameScores.sort(
      (a, b) => parseFloat(b.score) - parseFloat(a.score)
    );
  }
  clearScores() {
    this.gameScores = [];
  }
}

module.exports = Room;
