const DBConnection = require('../DatabaseConnection'); 
var poolConnection = DBConnection.init();

class RoomsController
{
    /**
     * Check if room exist in database
     * 
     * @param {int} roomID 
     * 
     * @return {Promise object}
     */
    static checkIfRoomExist(roomID)
    {
        return new Promise(function(resolve, reject){

            poolConnection.getConnection(function(err, connection)
            { 
                if(err){
                    reject(err);
                    return;
                }

                connection.query(`SELECT room_id from rooms WHERE id = ? LIMIT 1`, [Number(roomID)], 
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
     * Get room members (users ids) 
     * 
     * @param {int} roomID 
     * 
     * @return {Promise object}
     */
    static getRoomMembers(roomID)
    {
        return new Promise(function(resolve, reject){

            poolConnection.getConnection(function(err, connection)
            { 
                if(err){
                    reject(err);
                    return;
                }

                connection.query(`SELECT user_id from rooms_members WHERE room_id = ?`, [Number(roomID)], 
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
     * Create room 
     * 
     * @param {object} chatkit
     * @param {string} roomChatkitID 
     * @param {string} creatorChatkitID 
     * @param {object} roomMembers 
     * @param {boolean} isPrivate 
     * @param {string} roomName 
     * 
     * @return {*}
     */
    static createRoom(chatkit, roomChatkitID, creatorChatkitID, roomMembers, isPrivate = true, roomName = "room")
    {
        return chatkit
            .createRoom({
                id: String(roomChatkitID),
                creatorId: String(creatorChatkitID),
                isPrivate: Boolean(isPrivate),
                name: String(roomName),
                userIds: roomMembers
            });
    }
}

module.exports = RoomsController;