module.exports = {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  dbUser: process.env.DBUSER,
  dbHost: process.env.DBHOST,
  dbDatabase: process.env.DBDATABASE,
  dbPassword: process.env.DBPASSWORD,
  dbPort: process.env.DBPORT,
  jwtSecret: process.env.JWTSECRET,
  port: process.env.PORT
};