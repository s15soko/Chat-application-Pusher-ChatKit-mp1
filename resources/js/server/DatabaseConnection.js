const mysql = require('mysql');
require("dotenv").config();

class DatabaseConnection
{
    static init()
    {
        var connection = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        });

        return connection;
    }
}

module.exports = DatabaseConnection;