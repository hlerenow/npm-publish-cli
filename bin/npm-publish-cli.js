const chalk = require('chalk');
const log = console.log;

const miles = 18;
const calculateFeet = miles => miles * 5280;

console.log(chalk`
  There are {bold 5280 feet} in a mile.
  In {bold ${miles} miles}, there are {green.bold ${calculateFeet(miles)} feet}.
`);

log(chalk.keyword('orange')('Some orange text'));
log(chalk.keyword('orange').inverse('Hello!'));
