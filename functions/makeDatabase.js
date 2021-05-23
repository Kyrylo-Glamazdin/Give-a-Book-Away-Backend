const pgtools = require('pgtools');
const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: "DB_PASSWORD"
};

const dbName = require('./dbName');

//create a local PostgreSQL database
const makeDatabase = async() => {
    console.log('Trying to create a database');
    await pgtools.createdb(dbConfig, dbName);
    console.log('Database created successfully');
}

module.exports = makeDatabase;