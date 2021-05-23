const Sequelize = require('sequelize');
const db = require('../db');

//individual message in a conversation
const ChatLine = db.define('chatline', {
    id: {
        type: Sequelize.BIGINT,
        allownull: false,
        autoIncrement: true,
        primaryKey: true
    },
    chatId: {
        type: Sequelize.INTEGER,
        allownull: false
    },
    //user that sent the message
    userId: {
        type: Sequelize.INTEGER,
        allownull: false
    },
    //message text
    lineText: {
        type: Sequelize.TEXT,
        allownull: false
    },
    //message time
    time: {
        type: Sequelize.STRING,
        allownull: false
    }
}, {
    timestamps: true
});

module.exports = ChatLine;