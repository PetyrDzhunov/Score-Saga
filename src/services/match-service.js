const { handleError } = require('../utils/error-utils.js');
const {
  options,
  roundUrl,
  fixtureUrl,
} = require('../../config/football-api-config.js');
const Match = require('../../models/match.js');
const { createMatchFromFixture } = require('../utils/matches-utils.js');

const getNextFixtures = async () => {
  try {
    const response = await fetch(roundUrl, options);
    const round = await response.json();
    const result = round.response[0];
    const finalUrlForFixtures = fixtureUrl(result);
    const fixtures = await fetch(finalUrlForFixtures, options);
    const finalFixtures = await fixtures.json();

    const promises = finalFixtures.response.map(createMatchFromFixture);

    await Promise.all(promises);

    return { success: true };
  } catch (err) {
    handleError(err);
  }
};

const getAllMatches = async () => {
  try {
    return await Match.findAll();
  } catch (err) {
    handleError(err);
  }
};

const getOneMatch = async (id) => {
  try {
    return await Match.findByPk(id);
  } catch (err) {
    handleError(err);
  }
};

module.exports = { getNextFixtures, getOneMatch, getAllMatches };
