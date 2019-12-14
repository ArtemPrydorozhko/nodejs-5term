const Message = require('../../database/dao/message');

async function socketHandler(socket) {
    // redis -> online status
    const chats = []; // from redis
    const groupChats = []; // from redis
    chats.forEach((chat) => {
        socket.join(chat);
    });
    groupChats.forEach((chat) => {
        socket.join(chat);
    });

    socket.on('join chat', (data) => {
        // add to redis
        const id = data.id.toString();
        socket.join(id);
    });

    socket.on('leave chat', (data) => {
        // add to redis
        const id = data.id.toString();
        socket.leave(id);
    });

    socket.on('send chat message', (data) => {
        const id = data.id.toString();
        Message.createMessage()
        socket.to(id).emit('message', { message: data.message })
    });

    socket.on('disconnect', () => {
        // redis -> offline st    
    });
}