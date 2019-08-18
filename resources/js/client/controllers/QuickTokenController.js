import {RandomStringController} from './RandomStringController';

export class QuickTokenController
{
    static generateToken()
    {
        var token = RandomStringController.randomString(64);
        return token;
    }

    static saveInDatabase(token)
    {
        axios.post('/pusher/chatkit/quicktoken/save', qs.stringify({token: token}));
    }
}