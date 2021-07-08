const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('secret', 10);
  const user = new User({
    username: 'hello',
    name: 'Thanh Binh',
    passwordHash,
  });

  await user.save();
});

describe('when there is initially a user saved', () => {
  test('return the all user', async () => {
    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(res.body[0].username).toEqual('hello');
  });

  test('user creation succeeds if input data are valid', async () => {
    const user = {
      username: 'goodbye',
      name: 'Not Thanh Binh',
      password: 'supersecret',
    };

    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDB();
    expect(usersAfter).toHaveLength(2);
    expect(usersAfter[1].username).toEqual('goodbye');
  });

  test('user creation fail with 400 if input data is/are invalid', async () => {
    const user = {
      username: 'hello',
      name: 'Not Thanh Binh',
      password: 'supersecret',
    };

    const res = await api.post('/api/users').send(user).expect(400);
    console.log(res.body);

    const usersAfter = await helper.usersInDB();
    expect(usersAfter).toHaveLength(1);
    expect(usersAfter[0].username).toEqual('hello');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
