
export class UserFriendsController
{
    static getFriends()
    {
        return axios.post("/user/friends/get");
    }
}