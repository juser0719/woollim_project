const users = [];

const addUser = ({id, name , room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === naem);
    if (existingUser){
        return {error : 'Username is already use!!'};
    }

    const user = {id, name , room};
    users.push(user);
    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id); //기존의 id와 일치하면 그 인덱스 반환, 없으면 -1

    if (index != -1){ //기존에 있다면, 그 인덱스에서 1개의 요소를 제거하고 [0]을 채워놓음.
        return users.splice(index,1)[0]; 
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room ); //room

module.exports = {addUser ,removeUser, getUser , getUsersInRoom }