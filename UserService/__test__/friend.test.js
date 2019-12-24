const request = require('supertest');
const app = require('../index');

const mockedFriends = [
    {
        userId: 1,
        friendId: 2,
        id: 1
    },
    {
        userId: 1,
        friendId: 3,
        id: 2
    }
]

const mockedUsers = [
    {
        email: 'email1',
        password: 'pass1',
        id: 1
    },
    {
        email: 'email2',
        password: 'pass2',
        id: 2
    },
    {
        email: 'email3',
        password: 'pass3',
        id: 3
    },
]

jest.mock('../app/database/dao/friend', () => ({
    getFriends: jest.fn(() => mockedFriends),
    areUsersFriends: jest.fn((id, friendId) => {
        if (!Number(id) || !Number(friendId))
            throw new Error()
        return mockedFriends.find((friend) => (friend.userId === Number(id) || friend.userId === Number(friendId)) && (friend.friendId === Number(id) || friend.friendId === Number(friendId)));
    }),
    getFriendsByUserId: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        const friends = mockedFriends.filter((friend) => friend.userId === Number(id));
        return friends.map((friend) => mockedUsers.find((user) => user.id === friend.friendId));
    }),
    deleteFriend: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedFriends.some((friend) => friend.id === Number(id));
    }),
    createFriend: jest.fn((friendId, userId) => {
        if (!Number(friendId) || !Number(userId))
            throw new Error()
        return { id: mockedFriends.length + 1, friendId, userId };
    })
}));

jest.mock('../app/routes/middleware/auth', () => {
    return jest.fn((req, res, next) => {
        req.user = { id: 1 }
        next()
    });
});

const auth = require('../app/routes/middleware/auth');
const Like = require('../app/database/dao/friend');

describe('Userservice:: friend routes', () => {

    describe('get friends', () => {
        test('should return all friends', (done) => {
            request(app).get('/api/userservice/friend/all').then((response) => {

                expect(response.body).toMatchObject(mockedFriends);
                done();
            });
        });
    });

    describe('get friend/:id', () => {
        test('should return friend with given id', (done) => {
            request(app).get('/api/userservice/friend/2').then((response) => {

                expect(response.body).toBeTruthy();
                done();
            });
        });

        test('should not return friend with given NaNid', (done) => {
            request(app).get('/api/userservice/friend/nan').then((response) => {

                expect(response.status).toBe(400);
                done();
            });
        });
    });

    describe('get friend/', () => {
        test('should return user friends', (done) => {
            request(app).get('/api/userservice/friend/').then((response) => {

                expect(response.body).toMatchObject([ mockedUsers[1], mockedUsers[2]]);
                done();
            });
        });
    });

    describe('delete friend/', () => {
        test('should delete friend', (done) => {
            request(app).delete('/api/userservice/friend/2').then((response) => {

                expect(response.body).toBeTruthy();
                done();
            });
        });

        test('should not delete friend', (done) => {
            request(app).delete('/api/userservice/friend/33').then((response) => {

                expect(response.body).toBeFalsy();
                done();
            });
        });

        test('should not delete friend with NaN id', (done) => {
            request(app).delete('/api/userservice/friend/nan').then((response) => {

                expect(response.status).toBe(400);
                done();
            });
        });
    });

    describe('post friend/', () => {
        test('should create user friend', (done) => {
            request(app).post('/api/userservice/friend').send({ friendId: 2 }).then((response) => {

                expect(response.body.friendId).toBe(2);
                done();
            });
        });

        test('should not create user friend', (done) => {
            request(app).post('/api/userservice/friend').send({}).then((response) => {

                expect(response.status).toBe(400);
                done();
            });
        });
    });
});