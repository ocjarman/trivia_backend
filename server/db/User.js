const db = require("./db");
const { STRING, UUID, UUIDV4, VIRTUAL, DATE } = db.Sequelize;
const { BOOLEAN } = require("sequelize");

const User = db.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
    set(usernameInput) {
      this.setDataValue("username", usernameInput.toLowerCase());
    },
    get() {
      const username = this.getDataValue("username");
      const usernameArr = username.split("");
      usernameArr[0] = usernameArr[0].toUpperCase();
      return usernameArr.join("");
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = User;
