const DBConnection = require('../DatabaseConnection'); 
var pollConnection = DBConnection.init();

class DatabaseMessagesController
{
    /**
     * Save message in database
     * 
     * @param {int} userID 
     * @param {int} roomID 
     * @param {string} message 
     */
    static saveMessage(userID, roomID, message)
    {
        pollConnection.getConnection(function(err, connection){
            if(err){
                return;
            }

            var now = new Date().getTime();

            connection.query(`INSERT INTO private_messages VALUES (null, ?, ?, ?, '${now}');`, [Number(userID), Number(roomID), String(message)], 
                function(error, result, fields){
                    connection.release();

                    // return...
                })
        })
    }
}

module.exports = DatabaseMessagesController;