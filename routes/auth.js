const express = require('express');
const router = express.Router();

const {User} = require('../db/models');

const { generateSalt, hash, compare} = require('../hash');
let salt = generateSalt(10)

//sign in
router.post('/signin', (request, response, next) => {
    let { username, password } = request.body;
    //find user by username
    User.findOne({where : {username: username}}).then(userData => {
        if(userData) {
            //check password
            let hashedPassword = {
                hashedpassword: userData.password,
                salt: userData.salt
            }
            compare(password, hashedPassword)
            .then(fullData => {
                if(fullData) {
                    return response.status(200).json({ status: true, data: userData});
                } else {
                    //no authorization if the password is incorrect
                    return response.status(200).json({ status: false, message: "Password is not correct." });
                }
            })
            .catch(err => next(err));
        } else {
            //no authorization if username doesn't exist
            return response.status(200).json({ status: false, message: "This user does not exist." });
        }
    })
    .catch(err => next(err));
})

//create a new user
router.post('/signup', async (request, response, next) => {
    //check if such username is already taken. If so, prompt an error message
    User.findOne({where : {username: request.body.userName}})
    .then(async userData => {
        if(userData) {
            response.status(200).json({ status: false, message: "This username is already taken"});
        }
        else {
            let hashedPassword = hash(request.body.password, salt)
            User.create({
                username: request.body.userName,
                name: request.body.firstName + " " + request.body.lastName,
                password: hashedPassword.hashedpassword,
                salt: hashedPassword.salt,
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