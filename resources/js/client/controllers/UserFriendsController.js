
export class UserFriendsController
{
    static getFriends()
    {
        return axios.post("/user/friends/get");
    }

    /**
     * Get friend data from list by his id
     * 
     * @param {int} requireID 
     * @param {object} friends 
     * 
     * @return {object}
     */
    static returnFriendDataByID(requireID, friends)
    {
        var data = [];
        friends.forEach(friend => {
            if(Number(friend.id) === Number(requireID))
                data = friend;
                
        });

        return data;
    }
}