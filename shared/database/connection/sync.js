const sequelize = require('./sequelize');
require('../models/user');
require('../models/post');
sequelize.sync().catch(err => console.log(err));