const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../Models/User');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGOOSE_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoose.disconnect();
});

describe('User Routes', () => {
    const userData = {
        username: 'testuser',
        password: 'testpassword',
        role: 'student'
    };

    beforeEach(async () => {
        await User.deleteMany(); // Clean up the user collection before each test
    });

    it('should sign up a new user', async () => {
        const res = await request(app)
            .post('/user/signup')
            .send(userData);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('User Signedup Successfully!!');
    });

    it('should not sign up an existing user', async () => {
        await new User(userData).save(); // Pre-create the user

        const res = await request(app)
            .post('/user/signup')
            .send(userData);

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('User already exists');
    });

    it('should login an existing user', async () => {
        await new User(userData).save(); // Pre-create the user

        const res = await request(app)
            .post('/user/login')
            .send({ username: userData.username, password: userData.password });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('User Login Successfully!!');
    });

    it('should not login with incorrect password', async () => {
        await new User(userData).save(); // Pre-create the user

        const res = await request(app)
            .post('/user/login')
            .send({ username: userData.username, password: 'wrongpassword' });

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual('Incorrect password!!');
    });

    it('should fetch user profile', async () => {
        await new User(userData).save(); // Pre-create the user

        const res = await request(app)
            .get(`/user/profile/${userData.username}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('UserProfile fetched Successfully!!');
    });

    it('should not fetch profile for non-existent user', async () => {
        const res = await request(app)
            .get('/user/profile/nonexistentuser');

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('User not found !!');
    });
});
