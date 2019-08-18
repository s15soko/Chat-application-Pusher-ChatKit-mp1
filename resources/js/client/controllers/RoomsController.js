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
}