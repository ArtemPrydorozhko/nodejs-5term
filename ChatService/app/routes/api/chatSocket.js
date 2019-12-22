const io = require('../../../socket').io;
const redisClient = require('../../database/connection/redis');
const chatSub = redisClient.duplicate();
chatSub.subscribe('new chat');
chatSub.subscribe('leave chat');

const Chat = require('../../database/dao/chat');

async function socketHandler(socket) {
    let userId = socket.request._query.id
    let chats = [];
    let groupChats = [];

    console.log('connected');
    chats = await Chat.getChatsByUserId(userId);
    redisClient.sadd('online', userId);
    // redisClient.smembers('chat:' + userId, (userChats) => {
    //     chats = chats.concat(userChats);
    //     chats.forEach((chat) => {
    //         socket.join(chat);
    //     });
    // });
    // redisClient.smembers('groupChat:' + userId, (userGroupChats) => {
    //     groupChats = groupChats.concat(userGroupChats);
    //     groupChats.forEach((chat) => {
    //         socket.join(chat);
    //     });
    // });

    console.log(chats);
    chats.forEach((chat) => {
        socket.join(chat.id);
    });


    socket.on('disconnect', () => {
        console.log('disc');

        redisClient.srem('online', userId, () => { });
    });

    chatSub.on('message', function (channel, msg) {
        const message = JSON.parse(msg);
        if (channel === 'new chat') {
            if (message.user1Id === userId || message.user2Id === userId) {
                socket.join(message.chatId);
            }
        } else if (channel === 'leave chat') {
            if (message.user1Id === userId || message.user2Id === userId) {
                socket.leave(message.chatId);
            }
        }
    });
}

module.exports = socketHandler;