const { UUIDV4 } = require('sequelize');

const sucessfullUser = {
  id: UUIDV4(),
  username: 'asdasdasd',
  email: 'asdasdasd@gmail.com',
  password: 'asdasdasd',
  avatar: 'asdasdasd.png',
};

const invalidPasswordUser = {
  id: UUIDV4(),
  username: 'perfectUser',
  email: 'perfectUser@gmail.com',
  password: '12345',
  avatar: 'avatar1.png',
};

const invalidEmailUser = {
  id: UUIDV4(),
  username: 'perfectUser',
  email: 'perfectUser@.com',
  password: '12345',
  avatar: 'avatar1.png',
};

const invalidUsernames = [
  {
    id: UUIDV4(),
    username: 'as', //short
    email: 'perfectUser@gmail.com',
    password: '12345',
    avatar: 'avatar1.png',
  },

  {
    id: UUIDV4(),
    username: 'asdasdasdasdasdas', // long
    email: 'perfectUser@gmail.com',
    password: '12345',
    avatar: 'avatar1.png',
  },
  {
    id: UUIDV4(),
    username: 'asd##@!!#@$$', // symbols
    email: 'perfectUser@gmail.com',
    password: '12345',
    avatar: 'avatar1.png',
  },
];

module.exports = {
  sucessfullUser,
  invalidPasswordUser,
  invalidEmailUser,
  invalidUsernames,
};
