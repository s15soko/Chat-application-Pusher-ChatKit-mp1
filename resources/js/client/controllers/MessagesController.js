import { Receiver } from "../../components/messages/Receiver";
import { Sender } from "../../components/messages/Sender";
import { UserDataController } from './UserDataController';

const UserIDController = require("../../client-server/UserIDController");

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class MessagesController
{
    static send(data)
    {    
        axios.post("http://localhost:3000/pusher/chatkit/message/send", qs.stringify({
            roomChatkitID: String(data.roomChatkitID),
            roomID: Number(data.roomID),
            userID: Number(data.userID),
            message: data.message,
        }))
            .then(function(res){})
            .catch(function(err){});
    }

    static build(message, currentUserID)
    {
        var senderID = message.senderId;
    
        var messageContainer = document.createElement("div");
        messageContainer.setAttribute("class", "messageContainer");
            
        if(UserIDController.addPrefix(currentUserID) == senderID){
            if(ReactDOM.render(<Sender message={message}/>, messageContainer))
                $("#messages").append(messageContainer);
        }else{
            if(ReactDOM.render(<Receiver message={message}/>, messageContainer))
                $("#messages").append(messageContainer);
        }
    }
}