const request = require('supertest');
const app = require('../index');

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
]

jest.mock('../app/database/dao/user', () => ({
    getUsers: jest.fn(() => mockedUsers),
    getUserById: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedUsers.find((user) => user.id === Number(id));
    }),
    deleteUser: jest.fn((id) => {
        if (!Number(id))
            throw new Error()
        return mockedUsers.some((user) => user.id === Number(id))
    }),
    updateUser: jest.fn(({ email }, id) => {
        if (!Number(id))
            throw new Error()
        const user = Object.assign({}, mockedUsers.find((user) => user.id === Number(id)));
        user.email = email;
        return user;
    })
}));

jest.mock('../app/routes/middleware/auth', () => {
    return jest.fn((req, res, next) => {
        req.user = mockedUsers[0];
        next()
    });
});

const auth = require('../app/routes/middleware/auth');
const User = require('../app/database/dao/user');

describe('Userservice:: user routes', () => {

    describe('get user', () => {
        test('should return all users', (done) => {
            request(app).get('/api/userservice/user').then((response) => {

                expect(response.body).toMatchObject(mockedUsers);
                done();
            });
        });
    });

    describe('get user/:id', () => {
        test('should return user with given id', (done) => {
            request(app).get('/api/userservice/user/2').then((response) => {

                expect(response.body).toMatchObject(mockedUsers[1]);
                done();
            });
        });

        test('should not return user with given NaNid', (done) => {
            request(app).get('/api/userservice/user/nan').then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });

    describe('delete user', () => {
        test('should delete user', (done) => {
            request(app).delete('/api/userservice/user/2').then((response) => {

                expect(response.body).toBeTruthy();
                done();
            });
        });

        test('should not delete user', (done) => {
            request(app).delete('/api/userservice/user/33').then((response) => {

                expect(response.body).toBeFalsy();
                done();
            });
        });

        test('should not delete user with NaN id', (done) => {
            request(app).delete('/api/userservice/user/nan').then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });

    describe('put user/:id', () => {
        test('should update user data', (done) => {
            request(app).put('/api/userservice/user/2').send({ email: 'newEmail' }).then((response) => {

                expect(response.body.email).toBe('newEmail');
                done();
            });
        });

        test('should not update user data', (done) => {
            request(app).put('/api/userservice/user/error').send({ email: 'newEmail' }).then((response) => {

                expect(response.status).toBe(500);
                done();
            });
        });
    });
});