const express = require('express');
const router = express.Router();

const {User} = require('../db/models');

router.post('/signin', (request, response, next) => {
    let { username, password } = request.body;
    User.findOne({where : {username: username}}).then(userData => {
        if(userData) {
            User.findOne({where : {username: username, password: password}})
            .then(fullData => {
                if(fullData) {
                    return response.status(200).json({ status: true, data: fullData});
                } else {
                    return response.status(200).json({ status: false, message: "Password is not correct." });
                }
            })
            .catch(err => next(err));
        } else {
            return response.status(200).json({ status: false, message: "This user not exist." });
        }
    })
    .catch(err => next(err));
})

router.post('/signup', (request, response, next) => {
    User.findOne({where : {username: request.body.userName}})
    .then(userData => {
        if(userData) {
            response.status(200).json({ status: true, message: "This username is already taken"});
        }
        else {
            User.create({
                username: request.body.userName,
                name: request.body.firstName + " " + request.body.lastName,
                password: request.body.password,
                zipcode: request.body.zip,
                email: request.body.email
            })
            .then(user => {
                user.password = undefined;
                response.status(200).json({status: true, newUser: user})
            })
            .catch(err => next(err))
        }
    })
    .catch(err => next(err));
})

module.exports = router;