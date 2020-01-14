const request = require('supertest');
const app = require('../index');

const mockedLikes = [
    {
        type: 'like',
        userId: 1,
        groupId: null,
        id: 1
    },
    {
        text: 'like',
        userId: 1,
        groupId: null,
        id: 2
    },
    {
        text: 'like',
        userId: null,
        groupId: 1,
        id: 3
    },
]

jest.mock('../app/database/dao/like', () => ({
    getLikes: jest.fn(() => mockedLikes),
    getLikeById: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedLikes.find((like) => like.id === Number(id));
    }),
    getLikesByUserId: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedLikes.filter((like) => like.userId === Number(id));
    }),
    deleteLike: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedLikes.some((like) => like.id === Number(id));
    }),
    createLike: jest.fn((type, id, postId) => {
        if (!Number(id) || !type || !Number(postId))
            throw new Error()
        return { id: mockedLikes.length + 1, type, userId: id, postId };
    }),
    updateLike: jest.fn(({ type }, id) => {
        if (!Number(id))
            throw new Error()
        const like = Object.assign({}, mockedLikes.find((like) => like.id === Number(id)));
        like.type = type;
        return like;
    })
}));

jest.mock('../app/routes/middleware/auth', () => {
    return jest.fn((req, res, next) => {
        req.user = { id: 1 }
        next()
    });
});

const auth = require('../app/routes/middleware/auth');
const Like = require('../app/database/dao/like');

describe('Userservice:: like routes', () => {

    describe('get likes', () => {
        test('should return all likes', (done) => {
            request(app).get('/api/userservice/like/all').then((response) => {

                expect(response.body).toMatchObject(mockedLikes);
                done();
            });
        });
    });

    describe('get like/:id', () => {
        test('should return like with given id', (done) => {
            request(app).get('/api/userservice/like/2').then((response) => {

                expect(response.body).toMatchObject(mockedLikes[1]);
                done();
            });
        });

        test('should not return polikest with given NaNid', (done) => {
            request(app).get('/api/userservice/like/nan').then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });

    describe('get like/', () => {
        test('should return user likes', (done) => {
            request(app).get('/api/userservice/like/').then((response) => {

                expect(response.body).toMatchObject([ mockedLikes[0], mockedLikes[1]]);
                done();
            });
        });
    });

    describe('delete like/', () => {
        test('should delete like', (done) => {
            request(app).delete('/api/userservice/like/2').then((response) => {

                expect(response.body).toBeTruthy();
                done();
            });
        });

        test('should not delete like', (done) => {
            request(app).delete('/api/userservice/like/33').then((response) => {

                expect(response.body).toBeFalsy();
                done();
            });
        });

        test('should not delete like with NaN id', (done) => {
            request(app).delete('/api/userservice/like/nan').then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });

    describe('put like/:id', () => {
        test('should update like data', (done) => {
            request(app).put('/api/userservice/like/2').send({ type: 'dislike' }).then((response) => {

                expect(response.body.type).toBe('dislike');
                done();
            });
        });

        test('should not update like data', (done) => {
            request(app).put('/api/userservice/like/error').send({ type: 'dislike' }).then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });

    describe('post like/', () => {
        test('should create user like', (done) => {
            request(app).post('/api/userservice/like').send({ type: 'like', postId: 2 }).then((response) => {

                expect(response.body.postId).toBe(2);
                done();
            });
        });

        test('should not create user like', (done) => {
            request(app).post('/api/userservice/like').send({}).then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });
});