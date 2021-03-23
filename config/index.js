const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  booksKey: process.env.REACT_APP_BOOKS_API_KEY
};