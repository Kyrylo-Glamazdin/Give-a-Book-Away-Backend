const Book = require('./book');
const User = require('./user');
const Chat = require('./chat');
const ChatLine = require('./chatLine');

//DEFINE ASSOCIATIONS
User.hasMany(Book);
Book.belongsTo(User);
Chat.belongsTo(User, {
    foreignKey: {
        name: "userOneId"
    },
    as: "userOne"
})
Chat.belongsTo(User, {
    foreignKey: {
        name: "userTwoId"
    },
    as: "userTwo"
})
ChatLine.belongsTo(Chat);
Chat.hasMany(ChatLine);
ChatLine.belongsTo(User);
User.hasMany(ChatLine);

module.exports = {
    Book, User, Chat, ChatLine
}