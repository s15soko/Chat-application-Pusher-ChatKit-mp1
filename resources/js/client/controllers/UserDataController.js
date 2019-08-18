export class UserDataController
{
    static get()
    {
        return axios.post("/user/data/getdata")
    }
}