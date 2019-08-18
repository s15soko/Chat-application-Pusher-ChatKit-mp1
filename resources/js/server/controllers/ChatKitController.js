const Chatkit = require('@pusher/chatkit-server');
require("dotenv").config();

class ChatKitController
{
    static init()
    {
        const locator = process.env.PUSHER_CHATKIT_INSTANCE_LOCATOR;
        const key = process.env.PUSHER_CHATKIT_PRIVATE_KEY;

        var chatkit = new Chatkit.default({
            instanceLocator: locator,
            key: key,
          })
        return chatkit;
    }
}

module.exports = ChatKitController;