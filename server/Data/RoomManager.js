// import Room from "./RoomClass";
const RoomClass = require("./RoomClass");

class RoomManager {
  constructor() {
    this.rooms = [];
  }

  createRoom(firstUser, id) {
    const existingRoom = this.rooms.find((room) => {
      room.id === id;
    });
    if (existingRoom) {
      return { error: "Room is taken" };
    } else {
      const room = new RoomClass(firstUser, id);
      this.rooms.push(room);
      return room;
    }
  }

  deleteRoom(id) {
    const updatedRooms = this.rooms.filter((room) => {
      return room.id !== id;
    });
    // reset original users array to the new filtered array
    this.rooms = updatedRooms;
  }

  findRoom(roomId) {
    return this.rooms.find((room) => room.room === roomId);
  }

  getRoomBySocketId(socketId) {
    //loop through rooms object
    //use class method to check if user exists in any room
    //if user exists in that room, return the  room
    let foundRoom;

    this.rooms.forEach((room) => {
      const foundUser = room.getUser(socketId);
      if (foundUser) {
        foundRoom = room;
      }
    });
    return foundRoom;
  }
}

module.exports = RoomManager;
