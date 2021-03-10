const express = require('express');
const app = express();
const db = require('./db');

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
    app.listen(PORT, () => {
        console.log(`Running on port ${3500}`);
    })
}

const start = async() => {
    await syncDB();
    await utilities();
}

start();