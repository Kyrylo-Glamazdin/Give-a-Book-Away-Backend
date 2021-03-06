const express = require("express");
const router = express.Router();
const axios = require("axios");
const { booksKey, distanceKey } = require("../config");

const { Book, User } = require("../db/models");
const { Op } = require("sequelize");

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

router.post("/recommended", (request, response, next) => {
  //RANDOM RECOMMENDED BOOKS
  let userZipcode = request.body.zipcode;
  let zipCodeArray = [userZipcode];
  Book.findAll({
    where: { userId: { [Op.not]: request.body.id } }, //filter from books posted by user making the request
    include: [
      {
        model: User,
      },
    ],
  })
  .then((bookList) => {
    //select 12 random books
    if (bookList.length > 12) {
      let randomBooks = [];
      let len = 12;
      let len2 = bookList.length;
      while (len > 0) {
        let selectedIndex = getRandomInt(len2);
        let selectedBook = bookList[selectedIndex];
        randomBooks.push(selectedBook);
        let tempBook = bookList[len2 - 1];
        bookList[len2 - 1] = selectedBook;
        bookList[selectedIndex] = tempBook;
        len--;
        len2--;
      }
      bookList = randomBooks;
    }
    for (let i = 0; i < bookList.length; i++) {
      zipCodeArray.push(bookList[i].user.zipcode);
    }
    //get location data about each book
    const zipCodeObject = { locations: zipCodeArray };
    axios.post("http://www.mapquestapi.com/directions/v2/routematrix?key=" + distanceKey, zipCodeObject)
    .then((distanceResponse) => {
      for (let i = 0; i < bookList.length; i++) {
        if (distanceResponse.data.distance[i + 1] !== undefined) {
          bookList[i].dataValues.distance = distanceResponse.data.distance[i + 1].toFixed(1);
          bookList[i].dataValues.city = distanceResponse.data.locations[i + 1].adminArea5;
          bookList[i].dataValues.state = distanceResponse.data.locations[i + 1].adminArea3;
          bookList[i].dataValues.zipcode = bookList[i].dataValues.user.dataValues.zipcode;
          bookList[i].dataValues.username = bookList[i].dataValues.user.dataValues.username;
          bookList[i].dataValues.userOwnerId = bookList[i].dataValues.user.dataValues.id;
        } else {
            bookList[i].distance = undefined;
          }
        }
        response.status(200).json(bookList);
      });
    })
    .catch((err) => next(err));
});

//find book by its ISBN
router.post("/isbn", async (request, response, next) => {
  let userZipcode = request.body.zipcode;
  let bookObject = request.body.book;
  let zipCodeArray = [userZipcode];
  Book.findAll({
    where: {
      isbn: bookObject.isbn,
      userId: { [Op.not]: request.body.id },
    },
    include: [
      {
        model: User,
      },
    ],
  }).then((result) => {
    if (result.length === 0) {
      response.status(200).json([]);
      return;
    }
    for (let i = 0; i < result.length; i++) {
      zipCodeArray.push(result[i].user.zipcode);
    }
    const zipCodeObject = { locations: zipCodeArray };
    //get distance & location data for each book
    if (zipCodeObject.locations.length > 1) {
      axios.post("http://www.mapquestapi.com/directions/v2/routematrix?key=" + distanceKey, zipCodeObject)
        .then((distanceResponse) => {
          for (let i = 0; i < result.length; i++) {
            if (distanceResponse.data.distance[i + 1] !== undefined) {
              result[i].dataValues.distance = distanceResponse.data.distance[i + 1].toFixed(1);
              result[i].dataValues.city = distanceResponse.data.locations[i + 1].adminArea5;
              result[i].dataValues.state = distanceResponse.data.locations[i + 1].adminArea3;
              result[i].dataValues.zipcode = result[i].dataValues.user.dataValues.zipcode;
              result[i].dataValues.username = result[i].dataValues.user.dataValues.username;
              result[i].dataValues.userOwnerId = result[i].dataValues.user.dataValues.id;
            } else {
              result[i].distance = undefined;
            }
          }
          //sort by distance
          result.sort((a, b) => (a.dataValues.distance > b.dataValues.distance ? 1 : -1))
        })
        .then(() => {
          response.status(200).json(result);
        })
        .catch((err) => {
          next(err);
        });
    }
  });
});

//get similar books (works the same way as getting books by ISBN)
router.post("/similar", async (request, response, next) => {
  let userZipcode = request.body.zipcode;
  let booksArray = request.body.books;
  let zipCodeArray = [userZipcode];
  if (booksArray.length < 4) {
    return;
  }
  Book.findAll({
    where: {
      [Op.or]: [{
          isbn: booksArray[0].isbn,
          userId: { [Op.not]: request.body.id },
      }, {
          isbn: booksArray[1].isbn,
          userId: { [Op.not]: request.body.id },
      }, {
          isbn: booksArray[2].isbn,
          userId: { [Op.not]: request.body.id },
    }, {
          isbn: booksArray[3].isbn,
          userId: { [Op.not]: request.body.id },
      }]},
    include: [
      {
        model: User,
      },
    ],
  }).then((result) => {
    for (let i = 0; i < result.length; i++) {
      zipCodeArray.push(result[i].user.zipcode);
    }
    const zipCodeObject = { locations: zipCodeArray };
    //get distance & location data for each book
    if (zipCodeObject.locations.length > 1) {
      axios.post("http://www.mapquestapi.com/directions/v2/routematrix?key=" + distanceKey, zipCodeObject)
        .then((distanceResponse) => {
          for (let i = 0; i < result.length; i++) {
            if (distanceResponse.data.distance[i + 1] !== undefined) {
              result[i].dataValues.distance = distanceResponse.data.distance[i + 1].toFixed(1);
              result[i].dataValues.city = distanceResponse.data.locations[i + 1].adminArea5;
              result[i].dataValues.state = distanceResponse.data.locations[i + 1].adminArea3;
              result[i].dataValues.zipcode = result[i].dataValues.user.dataValues.zipcode;
              result[i].dataValues.username = result[i].dataValues.user.dataValues.username;
              result[i].dataValues.userOwnerId = result[i].dataValues.user.dataValues.id;
            } else {
              result[i].distance = undefined;
            }
          }
          //sort by distance
          result.sort((a, b) => (a.dataValues.distance > b.dataValues.distance ? 1 : -1))
        })
        .then(() => {
          response.status(200).json(result);
        })
        .catch((err) => {
          next(err)
        });
    } else {
      response.status(200).json([]);
    }
  });
});

//return google books api key
router.get("/key", (request, response, next) => {
  response.status(200).json(booksKey.booksKey);
});

//get books posted by user with provided id
router.get("/:id", (request, response, next) => {
  Book.findAll({
    where: {
      userId: request.params.id,
    },
  })
    .then((books) => response.status(200).json(books))
    .catch((err) => next(err));
});

//post a new book
router.post("/post", async (request, response, next) => {
  let newBook = request.body.book;
  let associatedUser = request.body.user;
  Book.create({
    title: newBook.title,
    author: newBook.author,
    isbn: newBook.isbn,
    preview_image: newBook.preview_image,
    userId: associatedUser.id,
    condition: newBook.condition,
    description: newBook.description,
  })
    .then((book) => response.status(200).json(book))
    .catch((err) => next(err));
});

//edit a book
router.put("/:id", (request, response, next) => {
  Book.update(request.body, {
    where: {
      id: request.params.id,
    },
  })
    .then(() => response.status(200).json(true))
    .catch((err) => next(err));
});

//delete a book
router.delete("/:id", (request, response, next) => {
  Book.destroy({
    where: {
      id: request.params.id,
    },
  })
  .then(() => response.status(200))
  .catch((err) => next(err));
});

//get all books posted by one user
router.post("/userbooks/", (request, response, next) => {
  let currentUserZipcode = request.body.currentUserZipcode;
  let otherUserZipcode = request.body.otherUserZipcode;
  let zipCodeArray = [currentUserZipcode, otherUserZipcode];
  const zipCodeObject = { locations: zipCodeArray };
  Book.findAll({
    where: {
      userId: request.body.userId,
    },
    include: [
      {
        model: User,
      },
    ],
  })
    .then((books) => {
      //get distance & location data for this user (and all of their books)
      axios.post("http://www.mapquestapi.com/directions/v2/routematrix?key=" + distanceKey, zipCodeObject)
        .then((distanceResponse) => {
          for (let i = 0; i < books.length; i++) {
            books[i].dataValues.distance = distanceResponse.data.distance[1].toFixed(1);
            books[i].dataValues.city = distanceResponse.data.locations[1].adminArea5;
            books[i].dataValues.state = distanceResponse.data.locations[1].adminArea3;
            books[i].dataValues.zipcode = books[i].dataValues.user.dataValues.zipcode;
            books[i].dataValues.username = books[i].dataValues.user.dataValues.username;
            books[i].dataValues.userOwnerId = books[i].dataValues.user.dataValues.id;
          }
          response.status(200).json(books);
        });
    })
    .catch((err) => next(err));
});

module.exports = router;
