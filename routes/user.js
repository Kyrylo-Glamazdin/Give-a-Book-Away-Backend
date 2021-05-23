const express = require('express');
const router = express.Router();

const {User} = require('../db/models');
//users

//get all users
router.get('/', (request, response, next) => {
    User.findAll()
    .then(user => response.status(200).json(user))
    .catch(err => next(err))
});

//get user by id
router.get('/:id', (request, response, next) => {
    User.findByPk(request.params.id)
    .then(user => {
        response.status(200).send(user)
    })
    .catch(err => console.log(err))
})

//add a new user (DEPRECATED)
router.post('/', (request, response, next) => {
    User.create(request.body)
    .then(user => response.status(200).json(user))
    .catch(err => next(err));
})

//edit user (DEPRECATED)
router.put('/:id', (request, response, next) => {
    User.update(request.body, {
        where: {
            id: request.params.id
        }
    })
    .then(() => response.status(200))
    .catch(err => next(err));
})

module.exports = router;