let users = [];

const addUser = ({ id, name, room }) => {
  const existingUser = users.find((user) => {
    user.room === room && user.name === name;
  });

  if (existingUser) {
    return { error: "Username is taken" };
  }
  const user = { id, name, room };

  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const newUserArray = users.filter((user) => {
    return user.id !== id;
  });
  // reset original users array to the new filtered array
  users = newUserArray;
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
