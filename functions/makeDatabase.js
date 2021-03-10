const pgtools = require('pgtools');
const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: process.env.LOCAL_DATABASE_PASSWORD
};

const dbName = require('./dbName');

const makeDatabase = async() => {
    console.log('Trying to create a database');
    await pgtools.createdb(dbConfig, dbName);
    console.log('Database created successfully');
}

module.exports = makeDatabase;