const redisClient = require('../../database/connection/redis');
const chatSub = redisClient.duplicate();
chatSub.subscribe('new chat');
chatSub.subscribe('leave chat');

async function socketHandler(socket) {
    let userId;
    let chats = [];
    let groupChats = [];

    socket.on('connect', (data) => {
        userId = data.id.toString();
        redisClient.sadd('online', userId);
        redisClient.smembers('chat:' + userId, (userChats) => {
            chats = chats.concat(userChats);
            chats.forEach((chat) => {
                socket.join(chat);
            });
        });
        redisClient.smembers('groupChat:' + userId, (userGroupChats) => {
            groupChats = groupChats.concat(userGroupChats);
            groupChats.forEach((chat) => {
                socket.join(chat);
            });
        });
    });

    socket.on('disconnect', () => {
        redisClient.srem('online', userId);  
    });

    chatSub.on('message', function (channel, message) {
        const message = JSON.parse(message);
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