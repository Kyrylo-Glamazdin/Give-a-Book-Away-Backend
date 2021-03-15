const express = require('express');
const router = express.Router();

const {Book} = require('../db/models');

router.get('/', (request, response, next) => {
    //RECOMMENDED BOOKS BASED ON LOCATION? (for the main page)
})

router.get('/:id', (request, response, next) => {
    Book.findByPk(request.params.id)
    .then(book => {
        response.status(200).send(book)
    })
    .catch(err => console.log(err))
})

router.post('/', (requset, response, next) => {
    Book.create(request.body)
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