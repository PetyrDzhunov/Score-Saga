const { getCurrentYear } = require('../src/utils/matches-utils');
const { readEnvironmentFile } = require('./envFile');

readEnvironmentFile();

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.RAPID_API_HOST,
  },
};

console.log(getCurrentYear());
const roundUrl = `https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=39&season=${getCurrentYear()}&current=true`;
const fixtureUrl = (round) =>
  `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2023&round=${round}`;

module.exports = { options, roundUrl, fixtureUrl };
