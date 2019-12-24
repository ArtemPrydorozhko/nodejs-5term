const request = require('supertest');
const app = require('../index');

const mockedUser = {
    email: 'email',
    password: 'pass',
    id: 1
}

jest.mock('../app/database/dao/user', () => ({
    getUserByCredentials: jest.fn((email, password) => {
        if (email === mockedUser.email && password === mockedUser.password) {
            return true;
        } else {
            throw new Error();
        }
    }),
    generateUserToken: jest.fn(() => 'token'),
    isEmailUnused: jest.fn((email) => email !== mockedUser.email),
    createUser: jest.fn(() => true)
}));

const User = require('../app/database/dao/user');

describe('Authservice', () => {

    describe('login route', () => {
        test('should login', (done) => {
            const mockBody = {
                email: 'email',
                password: 'pass'
            }

            request(app).post('/api/authservice/login').send(mockBody).then((response) => {
                
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        test('should not login', (done) => {
            const mockBody = {
                email: 'email1',
                password: 'pass1'
            }

            request(app).post('/api/authservice/login').send(mockBody).then((response) => {
                
                expect(response.statusCode).not.toBe(200);
                done();
            });
        });
    });

    describe('signup route', () => {
        test('should signup', (done) => {
            const mockBody = {
                email: 'email1',
                password: 'pass1'
            }

            request(app).post('/api/authservice/signup').send(mockBody).then((response) => {
                
                expect(response.statusCode).toBe(201);
                done();
            });
        });

        test('should not signup', (done) => {
            const mockBody = {
                email: 'email',
                password: 'pass1'
            }

            request(app).post('/api/authservice/signup').send(mockBody).then((response) => {
                
                expect(response.statusCode).not.toBe(201);
                done();
            });
        });
    });
});