const Match = require('../../models/match');

function getCurrentYear() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return currentMonth >= 8 ? currentYear : currentYear - 1;
}

const createOrUpdateMatchFromFixture = async (object) => {
  const { fixture, teams, goals } = object;
  const { venue, status, id } = fixture;
  const { home, away } = teams;

  const [match, isNewlyCreated] = await Match.findOrCreate({
    where: { fixtureId: id },
    defaults: {
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
    },
  });

  if (!isNewlyCreated) {
    match.update({
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
  }

  return match;
};

module.exports = { createOrUpdateMatchFromFixture, getCurrentYear };
