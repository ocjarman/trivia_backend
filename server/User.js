// let users = [];
// // let allRooms = [];

// const addUser = ({ id, name, room }) => {
//   const existingUser = users.find((user) => {
//     user.room === room && user.name === name;
//   });

//   if (existingUser) {
//     return { error: "Username is taken" };
//   }
//   const user = { id, name, room };

//   users.push(user);
//   //look for room
//   //if rooms not there, create it
//   //add user to room
//   //   rooms.push({ room: user.room, users: user.name });
//   return { user };
// };

// const removeUser = (id) => {
//   const newUserArray = users.filter((user) => {
//     return user.id !== id;
//   });
//   // reset original users array to the new filtered array
//   users = newUserArray;
// };

// const getUser = (id) =>
//   users.find((user) => {
//     return user.id === id;
//   });

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// // const addUserToRoom = (userData) => {
// //   //loop through rooms array
// //   if (allRooms.includes(userData.room)) {
// //     allRooms.userData.room.push(userData);
// //   } else {
// //     allRooms.userData.room = userData.room;
// //     allRooms.userData.room.push(userData);
// //   }
// //if rooms does not include user.room, create the room key and add the users room as a value
// //then add the user data object to the rooms.users key
// // allRooms:{
// //     room1: {
// //         users: {}
// //     },
// //     room2: {
// //         users: {}
// //     },
// // }
// // };
// module.exports = { addUser, removeUser, getUser, getUsersInRoom };
