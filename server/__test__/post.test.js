const request = require('supertest');
const app = require('../index');

const mockedPosts = [
    {
        text: 'text',
        userId: 1,
        groupId: null,
        id: 1
    },
    {
        text: 'text',
        userId: 1,
        groupId: null,
        id: 2
    },
    {
        text: 'text',
        userId: null,
        groupId: 1,
        id: 3
    },
]

jest.mock('../app/database/dao/post', () => ({
    getPosts: jest.fn(() => mockedPosts),
    getPostById: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedPosts.find((post) => post.id === Number(id));
    }),
    getPostsByUserId: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedPosts.filter((post) => post.userId === Number(id));
    }),
    getPostsByGroupId: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedPosts.filter((post) => post.groupId === Number(id));
    }),
    deletePost: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedPosts.some((post) => post.id === Number(id));
    }),
    createPost: jest.fn((body, id) => {
        if (!Number(id) || !body.text)
            throw new Error()
        return { id: mockedPosts.length + 1, text: body.text, userId: id };
    }),
    createGroupPost: jest.fn((body, id) => {
        if (!Number(id) || !body.text)
            throw new Error()
        return { id: mockedPosts.length + 1, text: body.text, groupId: id };
    }),
    updatePost: jest.fn(({ text }, id) => {
        if (!Number(id))
            throw new Error()
        const post = Object.assign({}, mockedPosts.find((post) => post.id === Number(id)));
        post.text = text;
        return post;
    })
}));

jest.mock('../app/routes/middleware/auth', () => {
    return jest.fn((req, res, next) => {
        req.user = { id: 1 }
        next()
    });
});

const auth = require('../app/routes/middleware/auth');
const Post = require('../app/database/dao/post');

describe('Userservice:: post routes', () => {

    describe('get post', () => {
        test('should return all post', (done) => {
            request(app).get('/api/userservice/post/all').then((response) => {

                expect(response.body).toMatchObject(mockedPosts);
                done();
            });
        });
    });

    describe('get post/:id', () => {
        test('should return post with given id', (done) => {
            request(app).get('/api/userservice/post/2').then((response) => {

                expect(response.body).toMatchObject(mockedPosts[1]);
                done();
            });
        });

        test('should not return post with given NaNid', (done) => {
            request(app).get('/api/userservice/post/nan').then((response) => {

                expect(response.status).toBe(400);
                done();
            });
        });
    });

    describe('get /post/group/:id', () => {
        test('should return post with given groupid', (done) => {
            request(app).get('/api/userservice/post/group/1').then((response) => {

                expect(response.body).toMatchObject([mockedPosts[2]]);
                done();
            });
        });

        test('should not return post with given NaN groupid', (done) => {
            request(app).get('/api/userservice/post/group/nan').then((response) => {

                expect(response.status).toBe(400);
                done();
            });
        });
    });

    describe('get /post/user/:id', () => {
        test('should return post with given userId', (done) => {
            request(app).get('/api/userservice/post/user/1').then((response) => {

                expect(response.body).toMatchObject([ mockedPosts[0], mockedPosts[1]]);
                done();
            });
        });

        test('should not return post with given NaN userid', (done) => {
            request(app).get('/api/userservice/post/group/nan').then((response) => {

                expect(response.status).toBe(400);
                done();
            });
        });
    });

    describe('delete post', () => {
        test('should delete post', (done) => {
            request(app).delete('/api/userservice/post/2').then((response) => {

                expect(response.body).toBeTruthy();
                done();
            });
        });

        test('should not delete post', (done) => {
            request(app).delete('/api/userservice/post/33').then((response) => {

                expect(response.body).toBeFalsy();
                done();
            });
        });

        test('should not delete post with NaN id', (done) => {
            request(app).delete('/api/userservice/post/nan').then((response) => {

                expect(response.status).toBe(400);
                done();
            });
        });
    });

    describe('put post/:id', () => {
        test('should update post data', (done) => {
            request(app).put('/api/userservice/post/2').send({ text: 'newEmail' }).then((response) => {

                expect(response.body.text).toBe('newEmail');
                done();
            });
        });

        test('should not update post data', (done) => {
            request(app).put('/api/userservice/post/error').send({ text: 'newEmail' }).then((response) => {

                expect(response.status).toBe(400);
                done();
            });
        });
    });

    describe('post post/', () => {
        test('should create user post', (done) => {
            request(app).post('/api/userservice/post').send({ text: 'newEmail' }).then((response) => {

                expect(response.body.text).toBe('newEmail');
                done();
            });
        });

        test('should not create user post', (done) => {
            request(app).post('/api/userservice/post').send({}).then((response) => {

                expect(response.status).toBe(400);
                done();
            });
        });

        test('should create group post', (done) => {
            request(app).post('/api/userservice/post/group/2').send({ text: 'newEmail' }).then((response) => {

                expect(response.body.text).toBe('newEmail');
                done();
            });
        });

        test('should not create group post', (done) => {
            request(app).post('/api/userservice/post/group/nan').send({}).then((response) => {

                expect(response.status).toBe(400);
                done();
            });
        });
    });
});