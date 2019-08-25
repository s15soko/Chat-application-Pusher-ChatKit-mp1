const DBConnection = require('../DatabaseConnection'); 
var poolConnection = DBConnection.init();

class DatabaseRoomsController
{
    /**
     * Save room in database
     * 
     * @param {string} roomChatkitID 
     * @param {string} type 
     * 
     * @return {Promise object}
     * || Data like last inserted id
     */
    static saveRoom(roomChatkitID, type = 'one-to-one')
    {
        return new Promise(function(resolve, reject){

            poolConnection.getConnection(function(err, connection)
            { 
                if(err){
                    reject(err);
                    return;
                }

                connection.query(`INSERT INTO rooms VALUES (null, ?, ?) ON DUPLICATE KEY UPDATE id = id`, [String(roomChatkitID), String(type)], 
                    function(err, result, fields) {
                        connection.release();

                        if(err){
                            reject(err);
                            return;
                        }

                        resolve(result);  
                    });
            }); 
        });
    }

    /**
     * 
     * @param {int} roomID 
     * @param {object} member
     */
    static saveRoomMember(roomID, member)
    {
        return new Promise(function(resolve, reject){

            poolConnection.getConnection(function(err, connection)
            { 
                if(err){
                    reject(err);
                    return;
                }

                var now = Math.round(new Date().getTime() / 1000);

                connection.query(`INSERT INTO rooms_members VALUES (null, ?, ?, ${now});`, [Number(member), Number(roomID)], 
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

module.exports = DatabaseRoomsController;