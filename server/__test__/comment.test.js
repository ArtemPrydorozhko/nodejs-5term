const request = require('supertest');
const app = require('../index');

const mockedComments = [
    {
        text: 'comment',
        userId: 1,
        postId: 2,
        id: 1
    },
    {
        text: 'comment',
        userId: 1,
        postId: 3,
        id: 2
    },
    {
        text: 'comment',
        userId: 2,
        postId: 1,
        id: 3
    },
]

jest.mock('../app/database/dao/comment', () => ({
    getComments: jest.fn(() => mockedComments),
    getCommentById: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedComments.find((comment) => comment.id === Number(id));
    }),
    getCommentsByUserId: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedComments.filter((comment) => comment.userId === Number(id));
    }),
    deleteComment: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedComments.some((comment) => comment.id === Number(id));
    }),
    createLike: jest.fn((type, id, postId) => {
        if (!Number(id) || !type || !Number(postId))
            throw new Error()
        return { id: mockedComments.length + 1, type, userId: id, postId };
    }),
    updateComment: jest.fn(({ text }, id) => {
        if (!Number(id))
            throw new Error()
        const comment = Object.assign({}, mockedComments.find((comment) => comment.id === Number(id)));
        comment.text = text;
        return comment;
    })
}));

jest.mock('../app/routes/middleware/auth', () => {
    return jest.fn((req, res, next) => {
        req.user = { id: 1 }
        next()
    });
});

const auth = require('../app/routes/middleware/auth');
const Comment = require('../app/database/dao/comment');

describe('Userservice:: comment routes', () => {

    describe('get comments', () => {
        test('should return all comments', (done) => {
            request(app).get('/api/userservice/comment/all').then((response) => {

                expect(response.body).toMatchObject(mockedComments);
                done();
            });
        });
    });

    describe('get comment/:id', () => {
        test('should return comment with given id', (done) => {
            request(app).get('/api/userservice/comment/2').then((response) => {

                expect(response.body).toMatchObject(mockedComments[1]);
                done();
            });
        });

        test('should not return pocommentst with given NaNid', (done) => {
            request(app).get('/api/userservice/comment/nan').then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });

    describe('get comment/', () => {
        test('should return user comments', (done) => {
            request(app).get('/api/userservice/comment/').then((response) => {

                expect(response.body).toMatchObject([ mockedComments[0], mockedComments[1]]);
                done();
            });
        });
    });

    describe('delete comment/', () => {
        test('should delete comment', (done) => {
            request(app).delete('/api/userservice/comment/2').then((response) => {

                expect(response.body).toBeTruthy();
                done();
            });
        });

        test('should not delete comment', (done) => {
            request(app).delete('/api/userservice/comment/33').then((response) => {

                expect(response.body).toBeFalsy();
                done();
            });
        });

        test('should not delete comment with NaN id', (done) => {
            request(app).delete('/api/userservice/comment/nan').then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });

    describe('put comment/:id', () => {
        test('should update comment data', (done) => {
            request(app).put('/api/userservice/comment/2').send({ text: 'new' }).then((response) => {

                expect(response.body.text).toBe('new');
                done();
            });
        });

        test('should not update comment data', (done) => {
            request(app).put('/api/userservice/comment/error').send({ type: 'discomment' }).then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });
});