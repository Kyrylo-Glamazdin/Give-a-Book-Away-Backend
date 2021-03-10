const Book = require('./book');
const User = require('./user');

User.hasMany(Book);
Book.belongsTo(User);

module.exports = {
    Book, User
}