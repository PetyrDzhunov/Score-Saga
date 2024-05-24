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
  username: 'notInDb',
  email: 'notInDb@.com',
  password: '12345',
  avatar: 'avatar1.png',
};

const invalidAndNotInDbUsernames = [
  {
    id: UUIDV4(),
    username: 'as', //short
    email: 'notInDb1@gmail.com',
    password: '12345',
    avatar: 'avatar1.png',
  },

  {
    id: UUIDV4(),
    username: 'asdasdasdasdasdas', // long
    email: 'notInDb43@gmail.com',
    password: '12345',
    avatar: 'avatar1.png',
  },
  {
    id: UUIDV4(),
    username: 'asd##@!!#@$$', // symbols
    email: 'notInDb23@gmail.com',
    password: '12345',
    avatar: 'avatar1.png',
  },
];

module.exports = {
  sucessfullUser,
  invalidPasswordUser,
  invalidEmailUser,
  invalidAndNotInDbUsernames,
};
