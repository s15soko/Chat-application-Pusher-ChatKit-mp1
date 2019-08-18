const UserIDController = require("./UserIDController");

class RoomIDController
{
    /**
     * Create room id for one-to-one chat type
     * 
     * @param {string} userID 
     * @param {string} friendID 
     * 
     * @return {string}
     */
    static createForOneToOne(userID, friendID)
    {
        const prefix = "prv_u_";

        // lower id first
        var roomID = userID < friendID 
            ? String(prefix + UserIDController.addPrefix(userID) + "-" + UserIDController.addPrefix(friendID))
            : String(prefix + UserIDController.addPrefix(friendID) + "-" + UserIDController.addPrefix(userID))
        return roomID;
    }
}

module.exports = RoomIDController;