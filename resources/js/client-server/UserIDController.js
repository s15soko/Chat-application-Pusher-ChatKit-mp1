class UserIDController
{
    /**
     * Return prefix for user id
     * 
     * @retun {string}
     */
    static getUserPrefix()
    {
        return String("uid:");
    }

    /**
     * Get numeric user id and add prefix
     * 
     * @param {int} userID
     * 
     * @return {string}
     */
    static addPrefix(userID)
    {
        const prefix = UserIDController.getUserPrefix();
        userID = prefix + userID;
        return String(userID);
    }

    /**
     * Remove prefix
     * 
     * @param {string} userChatkitID 
     * 
     * @return {int}
     */
    static removePrefix(userChatkitID)
    {
        var prefix = UserIDController.getUserPrefix();
        var userID = userChatkitID.replace(prefix, '');
        return Number(userID);
    }

    /**
     * Validate user chatkit id 
     * 
     * @param {string} userChatkitID 
     * 
     * @return {boolean}
     */
    static validateUserID(userChatkitID)
    {
        const pattern = /^(uid:)([0-9]+){5,64}$/;
        return RegExp(pattern).test(userChatkitID);
    }
}

module.exports = UserIDController;