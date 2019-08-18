class MessagesController
{
    /**
     * Send message by chatkit
     * 
     * @param {object} chatkit 
     * @param {Array} data 
     * 
     * @return {Promise int} status
     */
    static sendSimpleMessage(chatkit, data)
    {
        return new Promise(function(resolve, reject){
            try {
                chatkit.sendSimpleMessage({
                    userId: String(data.userChatkitID),
                    roomId: String(data.roomChatkitID),
                    text: String(data.message),
                  })
                    .then(res => {
                      resolve(200);
                    })
                    .catch(err => {
                      resolve(400);
                    })
            } catch (error) {
                resolve(400);
            }
        });
    }
}

module.exports = MessagesController;