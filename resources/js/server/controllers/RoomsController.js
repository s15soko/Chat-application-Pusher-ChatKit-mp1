const UserIDController = require("../../client-server/UserIDController");
const RoomIdController = require("../../client-server/RoomIdController");

const DBConnection = require('../DatabaseConnection'); 

class RoomsController
{
    // /**
    //  * Join to room
    //  * 
    //  * @param {object} chatkit 
    //  * @param {string} roomID 
    //  * @param {string} users 
    //  */
    // static joinToRoom(chatkit, roomID, users)
    // {
    //     chatkit
    //         .addUsersToRoom({
    //             roomId: String(roomID),
    //             userIds: [users]
    //         })
    //         .then(() => {})
    //         .catch(err => console.error(err))
    // }

    // /**
    //  * Create one to one room
    //  * 
    //  * @param {object} chatkit 
    //  * @param {int} userID 
    //  * @param {int} friendID 
    //  * 
    //  * @return {Promise int} status 
    //  */
    // static createOneToOneRoom(chatkit, userID, friendID)
    // {
    //     var roomID = RoomIdController.createForOneToOne(userID, friendID);
    //     var isPrivate = true;
    //     var roomName = "One-to-one room";
    //     var roomMembers = [String(UserIDController.addPrefix(friendID))];

    //     return new Promise(function(resolve, reject){
    //         try {
    //             chatkit
    //                 .createRoom({
    //                 id: String(roomID),
    //                 creatorId: String(UserIDController.addPrefix(userID)),
    //                 isPrivate: Boolean(isPrivate),
    //                 name: String(roomName),
    //                 userIds: roomMembers
    //                 })
    //                     .then(() => { resolve(201); })
    //                     .catch((err) => {
    //                         if(err.error == "services/chatkit/bad_request/duplicate_room_id")
    //                             resolve(200);
    //                         else {
    //                             resolve(err.status);
    //                         }
    //                     });
    //         } catch (error) {
    //             resolve(400);
    //         }
    //     });
    // }

    /**
     * Check if room exist in database
     * 
     * @param {int} roomID 
     */
    static checkIfRoomExist(roomID)
    {
        return new Promise(function(resolve, reject){
            try {
                var connection = DBConnection.init();
                connection.connect();
    
                connection.query(`SELECT room_id from rooms WHERE id = ? LIMIT 1`, [
                    Number(roomID),
                ], function(error, result, fields){
                    resolve(result);
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Get room members (users ids) 
     * 
     * @param {int} roomID 
     */
    static getRoomMembers(roomID)
    {
        return new Promise(function(resolve, reject){
            try {
                var connection = DBConnection.init();
                connection.connect();
    
                connection.query(`SELECT user_id from rooms_members WHERE room_id = ?`, [
                    Number(roomID),
                ], function(error, results, fields){
                    resolve(results);
                })
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Create room 
     * 
     * @param {*} roomID 
     * @param {*} creatorID 
     * @param {*} roomMembers 
     * @param {*} isPrivate 
     * @param {*} roomName 
     * 
     * @return {Promise int} status
     */
    static createRoom(chatkit, roomChatkitID, creatorID, roomMembers, isPrivate = true, roomName = "room")
    {
        return chatkit
            .createRoom({
                id: String(roomChatkitID),
                creatorId: String(creatorID),
                isPrivate: Boolean(isPrivate),
                name: String(roomName),
                userIds: roomMembers
            });
    }

    // /**
    //  * Check if user is a member of the room
    //  * 
    //  * @param {int} userID 
    //  * @param {string} roomChatkitID 
    //  * 
    //  * @return {Promise boolean}
    //  */
    // static isUserARoomMember(userID, roomChatkitID)
    // {
    //     return new Promise(function(resolve, reject){
    //         try {
    //             var connection = DBConnection.init();
    //             connection.connect();
    
    //             connection.query(``, function(error, result, fields){
    
    //                 if(error) 
    //                     resolve(false);
    //                 else
    //                     resolve((result.length > 0));
    //             })
    //         } catch (error) {
    //             resolve(false);
    //         }
    //     });
    // }
}

module.exports = RoomsController;