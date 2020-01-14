const request = require('supertest');
const app = require('../index');

const mockedMessages = [
    {
        userId: 1,
        text: 'text',
        chatId: 1,
        id: 1
    },
    {
        userId: 1,
        text: 'text',
        chatId: 2,
        id: 2
    }
]

jest.mock('../app/database/dao/message', () => ({
    getMessages: jest.fn(() => mockedMessages),
    getMessageById: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedMessages.find((message) => message.id === Number(id));
    }),
    getMessagesByUserId: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedMessages.filter((message) => message.userId === Number(id));
    }),
    getMessagesByChatId: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedMessages.filter((message) => message.chatId === Number(id));
    }),
    deleteMessage: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedMessages.some((message) => message.id === Number(id))
    }),
    updateMessage: jest.fn(({ text }, id) => {
        if (!Number(id))
            throw new Error()
        const message = Object.assign({}, mockedMessages.find((message) => message.id === Number(id)));
        message.text = text;
        return message;
    })
}));

jest.mock('../app/routes/middleware/auth', () => {
    return jest.fn((req, res, next) => {
        req.user = {id: 1}
        next()
    });
});

const auth = require('../app/routes/middleware/auth');
const Message = require('../app/database/dao/message');

describe('Userservice:: message routes', () => {

    describe('get message/all', () => {
        test('should return all messages', (done) => {
            request(app).get('/api/chatservice/message').then((response) => {

                expect(response.body).toMatchObject(mockedMessages);
                done();
            });
        });
    });

    describe('get message/', () => {
        test('should return user messages', (done) => {
            request(app).get('/api/chatservice/message/').then((response) => {

                expect(response.body).toMatchObject([mockedMessages[0], mockedMessages[1]]);
                done();
            });
        });
    });

    describe('get message/chat/:id', () => {
        test('should return chat messages', (done) => {
            request(app).get('/api/chatservice/message/chat/1').then((response) => {

                expect(response.body).toMatchObject([mockedMessages[0]]);
                done();
            });
        });
    });

    describe('get message/:id', () => {
        test('should return message with given id', (done) => {
            request(app).get('/api/chatservice/message/2').then((response) => {

                expect(response.body).toMatchObject(mockedMessages[1]);
                done();
            });
        });

        test('should not return message with given NaNid', (done) => {
            request(app).get('/api/chatservice/message/nan').then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });

    describe('delete message', () => {
        test('should delete message', (done) => {
            request(app).delete('/api/chatservice/message/2').then((response) => {

                expect(response.body).toBeTruthy();
                done();
            });
        });

        test('should not delete message', (done) => {
            request(app).delete('/api/chatservice/message/33').then((response) => {

                expect(response.body).toBeFalsy();
                done();
            });
        });

        test('should not delete message with NaN id', (done) => {
            request(app).delete('/api/chatservice/message/nan').then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });

    describe('put message/:id', () => {
        test('should update message data', (done) => {
            request(app).put('/api/chatservice/message/2').send({ text: 'newEmail', chatId: 1}).then((response) => {

                expect(response.body.text).toBe('newEmail');
                done();
            });
        });

        test('should not update message data', (done) => {
            request(app).put('/api/chatservice/message/error').send({ text: 'newEmail' , chatId: 1}).then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });
});