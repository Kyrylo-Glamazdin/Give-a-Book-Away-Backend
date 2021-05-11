# Give A Book Away
Give A Book Away is an online platform for exchanging books. Here you can:
* Create an account
* Search for books in your area
* Post books
* Edit book information
* View the approximate distance to the book you would like to pick up
* Chat with other users

# Deployment
Heroku link: [https://books-away.herokuapp.com/](https://books-away.herokuapp.com/)

# Back-End Installation
Clone the repo, then type:

`
npm install
`

After completing the installation, you can run the app by typing:

`
nodemon app.js
`

Keep in mind that you will need to have the following API keys & URLs with listed variable names in your .env file to run the project:
* [MapQuest Distance Matrix API key](https://developer.mapquest.com/): (DISTANCE_MATRIX_API_KEY)
* [Google Books API key](https://developers.google.com/books/docs/v1/getting_started): (REACT_APP_BOOKS_API_KEY)
* [URL to a remote database](https://www.elephantsql.com/) (DB_URL) or a local postgreSQL database.
This is only the back-end part of the project. To completely install the project, you also need to follow the instructions in the [front-end](https://github.com/Kyrylo-Glamazdin/Give-A-Book-Away-Frontend) repo.

# Contributors
* [Kyrylo Glamazdin](https://www.linkedin.com/in/kyrylo-glamazdin-359190184/)
* [Neisha Tarannum](https://github.com/neisha18)
* [Lesly Ayala](https://github.com/leslya14)
* [Shelsy Saenz](https://github.com/shelsysaenz)
