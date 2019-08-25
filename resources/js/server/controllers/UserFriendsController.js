const DBConnection = require('../DatabaseConnection'); 
var poolConnection = DBConnection.init();

class UserFriendsController
{
    /**
     * Send invitation
     * 
     * @param {int} userID 
     * @param {int} friendID 
     * 
     * @return {Promise int} status
     */
    static sendFriendInvitation(userID, friendID)
    {
        return new Promise(function(resolve, reject){

            poolConnection.getConnection(function(err, connection)
            { 
                if(err){
                    reject(err);
                    return;
                }

                var now = Math.round(new Date().getTime() / 1000);

                connection.query(`INSERT INTO friends_invitations VALUES(null, ?, ?, ${now})`, [Number(userID), Number(friendID)], 
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

    /**
     * Remove friend
     * 
     * @param {int} userID 
     * @param {int} friendID 
     * 
     * @return {Promise int} status
     */
    static removeFriendFromList(userID, friendID)
    {
        return new Promise(function(resolve, reject){

            poolConnection.getConnection(function(err, connection)
            { 
                if(err){
                    reject(err);
                    return;
                }

                connection.query(`DELETE FROM users_friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?) LIMIT 2`, 
                    [
                        Number(userID), Number(friendID), Number(friendID), Number(userID),
                    ], 
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

    /**
     * Remove friend invitation
     * 
     * @param {int} userID 
     * @param {int} friendID 
     * 
     * @return {Promise int} status
     */
    static removeFriendInvitation(userID, friendID)
    {
        return new Promise(function(resolve, reject){

            poolConnection.getConnection(function(err, connection)
            { 
                if(err){
                    reject(err);
                    return;
                }

                connection.query(`DELETE FROM friends_invitations WHERE (user_id = ? AND invited_user_id = ?) OR (user_id = ? AND invited_user_id = ?) LIMIT 1`, 
                    [
                        Number(userID), Number(friendID), Number(friendID), Number(userID),
                    ], 
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

    /**
     * Accept invitation to friends
     * 
     * @param {object} chatkit 
     * @param {int} userID 
     * @param {int} friendID 
     */
    static acceptFriendInvitation(chatkit, userID, friendID)
    {
        const userController = require("./UserController");
        const roomIDController = require("../../client-server/RoomIDController");
        const userIDController = require("../../client-server/UserIDController");
        const databaseRoomsController = require("./DatabaseRoomsController");
        const databaseUserFriendsController = require("./DatabaseUserFriendsController");
        const roomController = require("./RoomsController");

        return new Promise(function(resolve, reject){
            try {
                // create chatkit ids
                var userChatkitID = userIDController.addPrefix(userID);
                var friendChatkitID = userIDController.addPrefix(friendID);

                // make sure users exists in chatkit system
                userController.createUser(chatkit, userChatkitID);
                userController.createUser(chatkit, friendChatkitID);

                // add to friends
                databaseUserFriendsController.addUserFriend(userID, friendID);
                databaseUserFriendsController.addUserFriend(friendID, userID);

                // create chatkit room id
                var roomChatkitID = roomIDController.createForOneToOne(userID, friendID);

                // create chatkit room
                roomController.createRoom(chatkit, 
                                            roomChatkitID, 
                                            userChatkitID, 
                                            [friendChatkitID]
                                            )
                        .catch(function(response){

                        })
                
                // save room in database
                databaseRoomsController.saveRoom(roomChatkitID)
                    .then(function(response){

                        var roomID = response.insertId;
                        
                        // save room members
                        databaseRoomsController.saveRoomMember(roomID, userID);
                        databaseRoomsController.saveRoomMember(roomID, friendID);
                    });
                
                // delete invitation notification
                UserFriendsController.removeFriendInvitation(userID, friendID);

                resolve(200);
            } catch (error) {
                resolve(500);
            }
        });
    }
}

module.exports = UserFriendsController;