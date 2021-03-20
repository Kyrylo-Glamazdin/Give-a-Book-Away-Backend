const Sequelize = require('sequelize');
const dbName = require('../functions/dbName');

//const db = new Sequelize(process.env.DB_URL || `postgres://localhost:5432/${dbName}`, {logging: false});
const db = new Sequelize(
    dbName,
    "postgres",
    "Equbqkxl1738",
    {
        "dialect": "postgres",
        "port": 5432,
    define: {
        timestamps: false
    },
    logging: false
})

module.exports = db;