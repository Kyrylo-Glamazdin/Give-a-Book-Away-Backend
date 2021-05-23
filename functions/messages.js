const moment = require('moment');

//format message for socket actions
function formatMessage(id, username, line, conversationId, otherUserId) {
    return {
        id,
        username,
        line,
        conversationId,
        time: moment().format('LLL'),
        otherUserId: otherUserId
    }
}

module.exports = formatMessage;