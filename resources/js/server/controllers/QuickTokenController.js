var DBConnection = require('../DatabaseConnection');
var poolConnection = DBConnection.init();

class QuickTokenController
{
    /**
     * Check token for auth php session
     * 
     * @param {int} userID 
     * @param {string} token
     * 
     * @return {Promise boolean}
     */
    static checkToken(userID, token)
    {
        return new Promise(function(resolve, reject){

            poolConnection.getConnection(function(err, connection)
            { 
                if(err){
                    reject(err);
                    return;
                }

                connection.query('SELECT token from quick_token WHERE user_id = ?', [Number(userID)], function(err, result, fields) {
                    connection.release();

                    if(err){
                        reject(err);
                        return;
                    }

                    if(result)
                        resolve(result[0].token == token);
                });
            });
            
        });
    }
}

module.exports = QuickTokenController;