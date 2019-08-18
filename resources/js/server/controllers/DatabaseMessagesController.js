const DBConnection = require('../DatabaseConnection'); 

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
        try {
            var connection = DBConnection.init();
            connection.connect();

            var now = new Date().getTime();

            connection.query(`INSERT INTO private_messages VALUES (null, ?, ?, ?, '${now}');`, [
                Number(userID),
                Number(roomID),
                String(message)
            ], function(error, result, fields){

            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DatabaseMessagesController;