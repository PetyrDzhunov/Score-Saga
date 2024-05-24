const app = require('../app');
const request = require('supertest');
const {
  invalidEmailUser,
  invalidPasswordUser,
  invalidAndNotInDbUsernames,
  sucessfullUser,
} = require('../__mocks__/user.mocks');
const { deleteOneUser } = require('../services/users-service');

describe('GET /users', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('returns a status 200', async () => {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
  });

  it('returns an array', async () => {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json');

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('returns an array of users model', async () => {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json');
    response.body.forEach((user) => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('password');
      expect(user).toHaveProperty('avatar');
      expect(user).toHaveProperty('totalPredictions');
      expect(user).toHaveProperty('successfulPredictions');
      expect(user).toHaveProperty('successRate');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });
  });
});

describe('POST /users/register', () => {
  it('responds with json', async () => {
    const response = await request(app)
      .post('/users/register')
      .set('Accept', 'application/json')
      .send(sucessfullUser);
    expect(response.headers['content-type']).toMatch(/json/);
    await deleteOneUser(response.body.user.id);
  });

  test.each(invalidAndNotInDbUsernames)(
    'should throw custom error with invalid username',
    async ({ description, userData }) => {
      const response = await request(app)
        .post('/users/register')
        .set('Accept', 'application/json')
        .send(userData);

      expect(response.body.error.message).toBe('Username or email is wrong!');
      expect(response.body.error.status).toBe(500);
    },
  );

  it('should throw custom error with password less than 6 symbols', async () => {
    const response = await request(app)
      .post('/users/register')
      .set('Accept', 'application/json')
      .send(invalidPasswordUser);

    expect(response.body.error.message).toBe('Password is too short');
    expect(response.body.error.status).toBe(500);
  });
  it('creates a new user with valid data', async () => {
    const response = await request(app)
      .post('/users/register')
      .set('Accept', 'application/json')
      .send(sucessfullUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty(
      'username',
      sucessfullUser.username,
    );
    expect(response.body.user).toHaveProperty('email', sucessfullUser.email);
    expect(response.body.user).toHaveProperty('avatar', sucessfullUser.avatar);
    expect(response.body).toHaveProperty('token');
    await deleteOneUser(response.body.user.id);
  });

  it('returns status 500 on server error', async () => {});
});

describe('POST /users/login', () => {
  let createdUserId;
  beforeAll(async () => {
    // Create a user and store the created user's ID
    const response = await request(app)
      .post('/users/register')
      .set('Accept', 'application/json')
      .send(sucessfullUser);

    createdUserId = response.body.user.id;
  });

  afterAll(async () => {
    // Delete the user after all tests have finished
    await deleteOneUser(createdUserId);
  });
  const loginUserDataWithUsername = {
    usernameOrEmail: sucessfullUser.username,
    password: sucessfullUser.password,
  };

  const loginWithWrongPassword = {
    usernameOrEmail: sucessfullUser.username,
    password: 'wrong password',
  };

  const loginUserDataWithEmail = {
    usernameOrEmail: sucessfullUser.email,
    password: sucessfullUser.password,
  };

  const loginWithNotExistingUsername = {
    usernameOrEmail: 'random123',
    password: 'random',
  };

  const loginWithNotExistingEmail = {
    usernameOrEmail: 'random123@gmail.com',
    password: 'random',
  };

  it('login as expected with valid username and password', async () => {
    const response = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send(loginUserDataWithUsername);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty(
      'username',
      sucessfullUser.username,
    );
    expect(response.body.user).toHaveProperty('email', sucessfullUser.email);
    expect(response.body.user).toHaveProperty('avatar', sucessfullUser.avatar);
    expect(response.body).toHaveProperty('token');
  });

  it('login as expected with valid email and password', async () => {
    const response = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send(loginUserDataWithEmail);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty(
      'username',
      sucessfullUser.username,
    );
    expect(response.body.user).toHaveProperty('email', sucessfullUser.email);
    expect(response.body.user).toHaveProperty('avatar', sucessfullUser.avatar);
    expect(response.body).toHaveProperty('token');
  });

  it('should throw error with not existing username - User not found', async () => {
    const response = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send(loginWithNotExistingUsername);

    expect(response.body.error.message).toBe('User not found!');
    expect(response.body.error.status).toBe(500);
    expect(response.body).not.toHaveProperty('token');
  });

  it('should throw error with not existing email - User not found', async () => {
    const response = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send(loginWithNotExistingEmail);

    expect(response.body.error.message).toBe('User not found!');
    expect(response.body.error.status).toBe(500);
    expect(response.body).not.toHaveProperty('token');
  });

  it('should throw error with not existing email - User not found', async () => {
    const response = await request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .send(loginWithWrongPassword);

    expect(response.body.error.message).toBe(
      'Username, email or password is wrong!',
    );
    expect(response.body.error.status).toBe(500);
    expect(response.body).not.toHaveProperty('token');
  });
});
