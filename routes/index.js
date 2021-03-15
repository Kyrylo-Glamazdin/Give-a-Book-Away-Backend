const express = require('express');
const router = express.Router();

const bookRouter = require('./book');
const userRouter = require('./user');
router.use('/book', bookRouter);
router.use('/user', userRouter);

router.use((request, response, next) => {
    let error = new Error("Route not found");
    error.status = 404;
    next(error);
});

module.exports = router;