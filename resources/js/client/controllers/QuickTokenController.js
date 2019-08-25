import {RandomStringController} from './RandomStringController';

export class QuickTokenController
{
    /**
     * Create, save and set token in header
     */
    static create()
    {
        // generate token
        let quickToken = QuickTokenController.generateToken();
        QuickTokenController.saveInDatabase(quickToken);
        // set quick token header
        QuickTokenController.setHeader(quickToken);
    }

    /**
     * Generate token
     * 
     * @return {string}
     */
    static generateToken()
    {
        var token = RandomStringController.randomString(64);
        return token;
    }

    /**
     * Save token
     * 
     * @param {string} token 
     */
    static saveInDatabase(token)
    {
        axios.post('/pusher/chatkit/quicktoken/save', qs.stringify({token: token}));
    }

    /**
     * Set token in header 
     * 
     * @param {string} quickToken 
     */
    static setHeader(quickToken)
    {
        axios.defaults.headers.common.quickToken = quickToken;
    }
}