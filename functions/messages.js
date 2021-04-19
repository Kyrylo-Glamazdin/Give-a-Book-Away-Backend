const moment = require('moment');

function formatMessage(id, username, line, conversationId) {
    return {
        id,
        username,
        line,
        conversationId,
        time: moment().format('LLL')
    }
}

module.exports = formatMessage;