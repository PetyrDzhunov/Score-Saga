const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/users-utils');
const { sucessfullUser } = require('../__mocks__/user.mocks');

describe('generateToken', () => {
  it('should generate a valid JWT token with correct payload', () => {
    const token = generateToken(sucessfullUser);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded).toMatchObject({
      id: sucessfullUser.id,
      username: sucessfullUser.username,
      email: sucessfullUser.email,
    });
  });

  it('should generate a token with correct expiry time', () => {
    const token = generateToken(sucessfullUser);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.exp).toBeDefined();
  });
});
