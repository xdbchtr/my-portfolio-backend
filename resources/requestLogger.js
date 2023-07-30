const chalk = require('chalk');

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  let methodColor;
  switch (req.method) {
    case 'GET':
      methodColor = chalk.green;
      break;
    case 'POST':
      methodColor = chalk.blue;
      break;
    case 'PUT':
      methodColor = chalk.yellow;
      break;
    case 'DELETE':
      methodColor = chalk.red;
      break;
    default:
      methodColor = chalk.white;
  }

  console.log(
    `[${new Date().toISOString()}] ${methodColor(req.method)} ${req.originalUrl}`
  );

  next();

  const endTime = Date.now();
  const responseTime = endTime - startTime;
  console.log(
    `[${new Date().toISOString()}] Response time: ${chalk.green(responseTime + 'ms')}`
  );
};

module.exports = requestLogger;