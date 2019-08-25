import { Receiver } from "../../components/messages/Receiver";
import { Sender } from "../../components/messages/Sender";
import { LastMessageController } from './LastMessageController';
import { CurrentChatController } from "./CurrentChatController";
const UserIDController = require("../../client-server/UserIDController");

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class MessagesController
{
    /**
     * Send a message
     * 
     * @param {object} data 
     */
    static send(data)
    {    
        return axios.post("http://localhost:3000/pusher/chatkit/message/send", qs.stringify({
            roomChatkitID: String(data.roomChatkitID),
            roomID: Number(data.roomID),
            userID: Number(data.userID),
            message: data.message,
        }))
    }

    /**
     * Get messages from database
     * 
     * @param {int} roomID 
     */
    static getMessages(roomID)
    {
        return axios.post('/messages/private/get', qs.stringify({roomID: roomID}));
    }

    /**
     * Render a message
     * 
     * @param {object} message || ['senderID', 'avatar', 'content', 'created_at']
     * @param {int} currentUserID 
     */
    static build(message, currentUserID)
    {    
        var messageContainer = document.createElement("div");
        messageContainer.setAttribute("class", "messageContainer");

        if(currentUserID == message.senderID){
            if(ReactDOM.render(<Sender message={message}/>, messageContainer))
                $("#messages").append(messageContainer);
        }else{
            if(ReactDOM.render(<Receiver message={message}/>, messageContainer))
                $("#messages").append(messageContainer);
        }

        LastMessageController.scrollToBottom();
    }

    /**
     * On new message
     * 
     * @param {object} message 
     * @param {object} actuallChattingRoom 
     * @param {object} currentLoggedUser 
     * @param {object} senderData
     */
    static onNewChatKitMessage(message, actuallChattingRoom, currentLoggedUser, senderData)
    {
        var senderChatkitID = message.senderId;
        var senderID = UserIDController.removePrefix(senderChatkitID);
        var userID = currentLoggedUser.id;

        var dataForBuild = {
            senderID: senderID,
            // if current user is message author
            avatar: senderData.length == 0 ? currentLoggedUser.avatar : senderData.avatar,
            content: message.parts[0].payload.content,
            created_at: message.createdAt,
        };

        // if current user isn't comment author
        if(senderID != userID){            
            LastMessageController.showLastMessageInSidebar(dataForBuild.content, senderID);
        }

        // if user is in correct chat window
        if(actuallChattingRoom.roomChatkitID == message.roomId){
            MessagesController.build(dataForBuild, userID);
        }
        // else show alert someone has sent a message
        else{
            LastMessageController.markRoom(senderID);
        }
    }

    /**
     * Get messages from database and render them
     * 
     * @param {int} roomID 
     * @param {object} currentLoggedUser 
     */
    static stackMessages(roomID, currentLoggedUser)
    {
        MessagesController.getMessages(roomID)
            .then(function(response){
                var messages = response['data'];

                messages.forEach(message => {

                    var dataForBuild = {
                        senderID: message.user_id,
                        avatar: message.avatar,
                        content: message.content,
                        created_at: message.created_at,
                    };

                    MessagesController.build(dataForBuild, currentLoggedUser.id)
                });
            });
    }
}