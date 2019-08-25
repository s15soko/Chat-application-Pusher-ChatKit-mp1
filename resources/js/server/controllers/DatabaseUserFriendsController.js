const DBConnection = require('../DatabaseConnection'); 
var poolConnection = DBConnection.init();

class DatabaseUserFriendsController
{
    /**
     * 
     * @param {*} userID 
     * @param {*} friendID 
     * 
     * @return {Promise int} status
     */
    static addUserFriend(userID, friendID)
    {
        return new Promise(function(resolve, reject){

            poolConnection.getConnection(function(err, connection)
            { 
                if(err){
                    reject(err);
                    return;
                }

                var now = Math.round(new Date().getTime() / 1000);

                connection.query(`INSERT INTO users_friends VALUES (null, ?, ?, ${now}, ${now})`, [Number(userID), Number(friendID)], 
                    function(err, result, fields) {
                        connection.release();

                        if(err){
                            reject(err);
                            return;
                        }

                        resolve(200); 
                    });
            }); 
        });
    }
}

module.exports = DatabaseUserFriendsController;