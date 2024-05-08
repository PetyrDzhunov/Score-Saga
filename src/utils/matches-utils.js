function getCurrentYear() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return currentMonth >= 8 ? currentYear : currentYear - 1;
}

const createMatchFromFixture = (object) => {
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
};

module.exports = { createMatchFromFixture, getCurrentYear };
