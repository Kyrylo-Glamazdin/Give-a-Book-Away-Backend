const express = require('express');
const router = express.Router();
const axios = require('axios');
const {booksKey, distanceKey} = require('../config')

const {Book, User} = require('../db/models');
const {Op} = require('sequelize');

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

router.post('/recommended', (request, response, next) => {
    //RANDOM RECOMMENDED BOOKS
    let userZipcode = request.body.zipcode
    let zipCodeArray = [userZipcode];
    Book.findAll({
        where: {userId: {[Op.not]: request.body.id}}, //filter from books posted by user making the request
        include:[{
            model: User
        }]
    })
    .then(bookList => {
        if (bookList.length > 12) {
            let randomBooks = [];
            let len = 12;
            let len2 = bookList.length
            while(len > 0) {
                let selectedIndex = getRandomInt(len2)
                let selectedBook = bookList[selectedIndex]
                randomBooks.push(selectedBook)
                let tempBook = bookList[len2 - 1]
                bookList[len2 - 1] = selectedBook
                bookList[selectedIndex] = tempBook
                len--;
                len2--;
            }
            bookList = randomBooks
        }
        for (let i = 0; i < bookList.length; i++) {
                zipCodeArray.push(bookList[i].user.zipcode)
        }
        const zipCodeObject = {locations: zipCodeArray}
        axios.post("http://www.mapquestapi.com/directions/v2/routematrix?key=" + distanceKey, zipCodeObject)
        .then(distanceResponse => {
            for (let i = 0; i < bookList.length; i++) {
                if (distanceResponse.data.distance[i + 1] !== undefined) {
                    bookList[i].dataValues.distance = distanceResponse.data.distance[i + 1].toFixed(1);
                }
                else {
                    bookList[i].distance = undefined;
                }
            }
            response.status(200).json(bookList)
        })
    })
    .catch(err => next(err))
})

router.post('/isbn', async (request, response, next) => {
    let userZipcode = request.body.zipcode
    let bookObject = request.body.book
    let zipCodeArray = [userZipcode];
    Book.findAll({
        where: {
            isbn: bookObject.isbn,
            userId: {[Op.not]: request.body.id}
        },
        include:[{
            model: User
        }]
    })
    .then(result => {
        for (let i = 0; i < result.length; i++) {
            zipCodeArray.push(result[i].user.zipcode)
        }
        const zipCodeObject = {locations: zipCodeArray}
        if (zipCodeObject.locations.length > 1) {
            axios.post("http://www.mapquestapi.com/directions/v2/routematrix?key=" + distanceKey, zipCodeObject)
            .then(distanceResponse => {
                for (let i = 0; i < result.length; i++) {
                    if (distanceResponse.data.distance[i + 1] !== undefined) {
                        result[i].dataValues.distance = distanceResponse.data.distance[i + 1].toFixed(1);
                    }
                    else {
                        result[i].distance = undefined;
                    }
                }
                response.status(200).json(result)
            })
        }
        else {
            response.status(200).json([])
        }
    })
})

router.get('/key', (request, response, next) => {
    response.status(200).json(booksKey.booksKey)
})

//get books posted by user with provided id
router.get('/:id', (request, response, next) => {
    Book.findAll({
        where: {
            userId: request.params.id
        }
    })
    .then(books => response.status(200).json(books))
    .catch(err => next(err))
})

router.post('/post', async (request, response, next) => {
    let newBook = request.body.book
    let associatedUser = request.body.user
    Book.create({
        title: newBook.title,
        author: newBook.author,
        isbn: newBook.isbn,
        preview_image: newBook.preview_image,
        userId: associatedUser.id
    })
    .then(book => response.status(200).json(book))
    .catch(err => next(err));
})

router.put('/:id', (request, response, next) => {
    Book.update(request.body, {
        where: {
            id: request.params.id
        }
    })
    .then(() => response.status(200))
    .catch(err => next(err));
})

router.delete('/:id', (request, response, next) => {
    Book.destroy({
        where: {
            id: request.params.id
        }
    })
    .then(() => response.status(200))
    .catch(err => next(err));
})

module.exports = router;