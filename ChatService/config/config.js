module.exports = {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  dbUser: process.env.DBUSER,
  dbHost: process.env.DBHOST,
  dbDatabase: process.env.DBDATABASE,
  dbPassword: process.env.DBPASSWORD,
  dbPort: process.env.DBPORT,
  jwtSecret: process.env.JWTSECRET,
  authPort: process.env.AUTHPORT,
  userPort: process.env.USERPORT,
  chatPort: process.env.CHATPORT
};
