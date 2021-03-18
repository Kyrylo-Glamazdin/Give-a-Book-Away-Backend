const express = require('express');
const app = express();
const db = require('./db');
const httpRouter = require('./routes/index.js');

const makeDatabase = require('./functions/makeDatabase');
const seedDatabase = require('./functions/seedDatabase');

const PORT = 3500;

const syncDB = async() => {
    try {
        await db.sync({force: false});
    } catch (error) {
        if (error.name == 'SequelizeConnectionError') {
            await makeDatabase();
            await db.sync({forse: true});
            await seedDatabase();
        }
        else {
            console.log(error);
        }
    }
}

const utilities = async() => {
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', "*");
        next();
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api", httpRouter);
    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    })
}

const start = async() => {
    await syncDB();
    await utilities();
}

start();