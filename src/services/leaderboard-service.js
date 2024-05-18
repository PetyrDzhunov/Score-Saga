const { handleError } = require('../utils/error-utils');
const { getSortedAllusers } = require('./users-service');

const getLeaderboardUsers = async () => {
  try {
    const allUsers = await getSortedAllusers('DESC');
    return allUsers;
  } catch (err) {
    handleError(err);
  }
};

module.exports = { getLeaderboardUsers };
