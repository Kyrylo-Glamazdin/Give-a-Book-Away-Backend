const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allownull: true
    },
    username: {
        type: Sequelize.STRING,
        allownull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allownull: false
    },
    zipcode: {
        type: Sequelize.STRING,
        allownull: false
    }
}, {
    timestamps: false
});

module.exports = User;