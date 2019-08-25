const mysql = require('mysql');
require("dotenv").config();

class DatabaseConnection
{
    /**
     * Get pool
     */
    static init()
    {
        try {
            var pool = mysql.createPool({
                connectionLimit: process.env.DATABASE_CONNECTION_LIMIT,
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                charset: process.env.DATABASE_CHARSET
            });
    
            return pool;
        } catch (error) {
            return null;
        }
    }
}

module.exports = DatabaseConnection;