class Room {
  constructor(firstUser, roomId, gameStatus = "ready") {
    this.users = [firstUser];
    this.roomId = roomId;
    this.gameStatus = gameStatus;
    this.finalScores = [];
    this.questions = [];
    this.userScores = { [firstUser.id]: 0 };
    this.userAnswers = [];
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
  setFinalScores(data) {
    this.finalScores.push(data);
  }
  getFinalScores() {
    return this.finalScores;
    // return this.gameScores.sort(
    //   (a, b) => parseFloat(b.score) - parseFloat(a.score)
    // );
  }
  setGameQuestions(randomQuestions) {
    this.questions = randomQuestions;
  }
  getGameQuestions() {
    return this.questions;
  }

  setUserAnswers(userId, question, answer, score) {
    let user = this.users.find((user) => user.id === userId);
    this.userAnswers.push({
      user: user.id,
      questionId: question.id,
      answer: answer,
      score: score,
    });
  }
  getUserAnswers(userId) {
    let user = this.users.find((user) => user.id === userId);
    return this.userAnswers.filter((answers) => answers.user === userId);
  }

  clearScores() {
    this.finalScores = [];
  }
}

module.exports = Room;
