const express = require('express');
const router = express.Router();

const {Chat, ChatLine, User} = require('../db/models');
const {Op} = require('sequelize');

//get all chats where id is the logged in user
router.get('/:id', (request, response, next) => {
    Chat.findAll({
        where: {
            [Op.or]: [{
                userOneId: request.params.id
            }, {
                userTwoId: request.params.id
            }]
        }
    })
    .then(chats => response.status(200).json(chats))
    .catch(err => next(err))
})

router.get('/chatlines/:id', (request, response, next) => {
    let chatId = request.params.id
    ChatLine.findAll({
        where: {
            chatId
        },
        order: [
            ['createdAt', 'ASC']
        ]
    })
    .then(chatLines => response.status(200).json(chatLines))
    .catch(err => next(err))
})

router.post('/chat', (request, response, next) => {
    const {userOneId, userTwoId} = request.body
    Chat.create({
        userOneId,
        userTwoId 
    })
    .then(chat => response.status(200).json(chat))
    .catch(err => next(err))
})

router.post('/chatline', (request, response, next) => {
    const {chatId, userId, lineText, time} = request.body
    Chat.create({
        chatId,
        userId,
        lineText,
        time
    })
    .then(line => response.status(200).json(line))
    .catch(err => next(err))
})

module.exports = router;