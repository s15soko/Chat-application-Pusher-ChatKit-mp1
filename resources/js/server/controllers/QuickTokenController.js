var DBConnection = require('../DatabaseConnection');

class QuickTokenController
{
    /**
     * Check token for auth php session
     * 
     * @param {int} userID 
     * @param {string} token
     * 
     * @return {boolean}
     */
    static checkToken(userID, token)
    {
        return new Promise(function(resolve, reject){
        
            try {
                var connection = DBConnection.init();
                connection.connect();
            
                connection.query(`SELECT token from quick_token WHERE user_id = ? LIMIT 1`, [
                    Number(userID),
                ], function(error, result, fields){

                    if(result.length > 0){
                        var sqlToken = result[0]['token'];

                        resolve(sqlToken === (token));
                    }
                })
            } catch (error) {
                resolve(false);
            }

        });
    }
}

module.exports = QuickTokenController;