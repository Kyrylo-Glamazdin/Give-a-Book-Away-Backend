const moment = require('moment');

function formatMessage(username, line) {
    return {
        username,
        line,
        createdAt: moment().format('LLL')
    }
}

module.exports = formatMessage;