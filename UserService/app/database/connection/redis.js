const redis = require('redis');
const config = require('../../config/config');

let redisClient;
try {
    redisClient = redis.createClient({
        host: config.redisHost,
        port: config.redisPort,
        retry_strategy: () => 1000
    });
} catch (error) {
    process.exit(1);
}

module.exports = redisClient;