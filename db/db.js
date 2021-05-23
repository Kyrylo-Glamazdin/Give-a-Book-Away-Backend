const Sequelize = require("sequelize");
const { dbURL } = require("../config");
const dbName = require("../functions/dbName");

/* USE DATABASE URL FROM .env file */

const db = new Sequelize(dbURL, {logging: false});

/* USE LOCAL DATABASE  */

// const db = new Sequelize(dbName, "postgres", "DB_PASSWORD", {
//   dialect: "postgres",
//   port: 5432,
//   define: {
//     timestamps: false,
//   },
//   logging: false,
// });

module.exports = db;
