const Sequelize = require('sequelize');
const {dbURL} = require('../config')
//const dbName = require('../functions/dbName');


const db = new Sequelize(dbURL, {logging: false});

module.exports = db;