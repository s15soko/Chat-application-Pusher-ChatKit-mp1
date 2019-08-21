const UserIDController = require("../../client-server/UserIDController");

export class RoomsController
{
    /**
     * It will check if room exist in db
     * If so create room 
     * 
     * @param {int} roomID 
     */
    static checkByRoomID(roomID)
    {
        return axios.post("http://localhost:3000/pusher/chatkit/room/create", qs.stringify({
            roomID: roomID,
        }));
    }

    /**
     * Check if rooms are the same
     * 
     * @param {*} currentRoom 
     * @param {*} expectedRoom 
     */
    static ifInRoom(currentRoom, expectedRoom)
    {
        if(currentRoom == expectedRoom)
            return true;
        return false;
    }

    /**
     * Get users ids 
     * 
     * @param {string} roomChatkitID 
     * 
     * @return {object}
     * || return chatkit users ids
     */
    static getOneToOneMembers(roomChatkitID)
    {
        var userIDPrefix = UserIDController.getUserPrefix();
        var members = [];
        var re = new RegExp("(" + userIDPrefix + ")([0-9]+)", 'g')
        var res;

        while((res = re.exec(roomChatkitID)) !== null)
            members.push(res[0]);
    
        return members;
    }
}