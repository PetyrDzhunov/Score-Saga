const User = require('../../models/user.js');
const { DatabaseError } = require('../utils/error-utils.js');
const {
  options,
  roundUrl,
  fixtureUrl,
} = require('../../config/football-api-config.js');
const Match = require('../../models/match.js');

const getNextFixtures = async () => {
  try {
    const response = await fetch(roundUrl, options);
    const round = await response.json();
    const result = round.response[0];
    const finalUrlForFixtures = fixtureUrl(result);
    const fixtures = await fetch(finalUrlForFixtures, options);
    const finalFixtures = await fixtures.json();

    const promises = finalFixtures.response.map((object) => {
      const { fixture, teams, goals } = object;
      const { venue, status } = fixture;
      const { home, away } = teams;

      return Match.create({
        venue: venue.name,
        status: status.short,
        homeTeamName: home.name,
        homeTeamLogo: home.logo,
        homeTeamGoals: goals.home,
        homeTeamWinner: home.winner,
        awayTeamName: away.name,
        awayTeamLogo: away.logo,
        awayTeamGoals: goals.away,
        awayTeamWinner: away.winner,
      });
    });

    await Promise.all(promises);

    return { success: true };
  } catch (err) {
    throw new DatabaseError(err);
  }
};

const getOneMatch = async (id) => {
  try {
    return await Match.findByPk(id);
  } catch (err) {
    throw new DatabaseError(err);
  }
};

module.exports = { getNextFixtures, getOneMatch };
