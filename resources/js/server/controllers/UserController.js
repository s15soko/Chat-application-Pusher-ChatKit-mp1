const UserIDController = require("../../client-server/UserIDController");

class UserController
{
    /**
     * Create chatkit user 
     * 
     * @param {object} chatkit 
     * @param {string} userChatkitID 
     * 
     * @return {Promise int} status
     */
    static createUser(chatkit, userChatkitID)
    {
        return new Promise(function(resolve, reject){
            try {
                if(!UserIDController.validateUserID(userChatkitID))
                    resolve(403);

                chatkit
                    .createUser({
                        id: userChatkitID,
                        name: userChatkitID,
                    })
                    .then(() => { resolve(201); })
                    .catch((err) => {
                        if(err.error = "services/chatkit/user_already_exists")
                            resolve(200);
                        else {
                            resolve(err.status);
                        }
                    }); 
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = UserController;