import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { UserDataController } from '../controllers/UserDataController';
import { UserFriendsController } from "../controllers/UserFriendsController";
import { SidebarController } from "../controllers/SidebarController";
import { QuickTokenController } from "../controllers/QuickTokenController";
import { MessagesController } from "../controllers/MessagesController";
import { RoomsController } from "../controllers/RoomsController";

const UserIDController = require("../../client-server/UserIDController");
const RoomIDController = require("../../client-server/RoomIDController");

export class ChatScreenManagement
{
    constructor()
    {
        // Actuall chatting in room...
        this.actuallChattingIn = {
            roomChatkitID: "",
            roomID: ""
        };

        // pusher chatkit object
        this.chatManager = null;

        // current chatkit user
        this.currentUserChatkit = null;

        // current logged user data
        this.currentUser = {
            id: null,
            avatar: "",
            rooms: {} // rooms he belong to
        };

        // contains all user friends
        this.userFriends = {};

        // if connected with chatkit server
        this.userConnected = false;
    }

    /**
     * 1. Get current logged user session data
     * 2. Get user friends
     * 3. Init Chat manager
     * 4. Connect with chat
     * 5. Set hooks on user rooms
     * 6. Listen default app events 
     */
    init()
    {
        var management = this;

        // get current user data
        UserDataController.get()
            .then(function(userData){
                management.currentUser = userData['data'];

                // get user friends
                UserFriendsController.getFriends()
                    .then(function(response){
                        if(response['data'].length > 0){
                            var friends = response['data'];
            
                            management.userFriends = friends;
                            SidebarController.build(friends)
                        }else{
                        // add some friends 
                        }
                    });

                // init/ auth chat
                management.chatManager = new ChatManager({
                    instanceLocator: 'v1:us1:4f3fcbda-acc9-415e-86df-621a6b34ebe4',
                    userId: String(UserIDController.addPrefix(userData.data.id)),
                    connectionTimeout: 5000,
                    tokenProvider: new TokenProvider({ url: 'http://localhost:3000/pusher/chatkit/auth' })
                }); 

                // Connect with chat
                management.chatManager.connect()
                    .then(currentUser => {
                        currentUser.avatarURL = management.currentUser.avatar;

                        // generate token
                        let quickToken = QuickTokenController.generateToken();
                        QuickTokenController.saveInDatabase(quickToken);
                        // set quick token header
                        axios.defaults.headers.common.quickToken = quickToken;
                        
                        management.userConnected = true;
                        management.currentUserChatkit = currentUser;

                        // SET HOOKS
                        var firstRoom = true;
                        management.currentUser.rooms.forEach(room => {

                            if(firstRoom){
                                management.chatIn(room.room_id, room.id);
                                firstRoom = false;
                            }

                            management.subscribeRoom(room.room_id)
                                .catch(function(err){
                                    // try again 
                                    if(err.info.error == "services/chatkit/not_found/room_not_found"){
                                        RoomsController.checkByRoomID(room.id)
                                            .then(function(response){
                                                if(response == 200 || response == 201){
                                                    management.subscribeRoom(room.room_id);
                                                };
                                            })
                                    }
                                })
                            
                        });
                    });
            });

        this.events();
    }

    /**
     * Subscribe room
     * 
     * @param {string} roomChatkitID 
     */
    subscribeRoom(roomChatkitID)
    {
        var management = this;

        return management.currentUserChatkit
            .subscribeToRoomMultipart({
                roomId: String(roomChatkitID),
                hooks: {
                  onMessage: message => {
                      // sprawdz czy jest obecnie w tym okienku czatu
                      // jesli tak to pokaz wiadomosc a jesli nie to pokaz alert
                    MessagesController.build(message, management.currentUser.id);
                  }
                },
                messageLimit: 0 // load previous messages from database
            });
    }

    /**
     * Set actuall chat window data
     * 
     * @param {string} roomChatkitID 
     * @param {int} roomID 
     */
    chatIn(roomChatkitID, roomID)
    {
        this.actuallChattingIn.roomChatkitID = String(roomChatkitID);
        this.actuallChattingIn.roomID = Number(roomID);
    }

    /**
     * Send message
     */
    sendMessage()
    {
        var management = this;
        if(!management.userConnected)
            return;

        var data = {
            roomChatkitID: String(management.actuallChattingIn.roomChatkitID),
            roomID: Number(management.actuallChattingIn.roomID),
            userID: Number(management.currentUser.id),
            message: $("#chatMessageTextarea").val(),
        }

        MessagesController.send(data);
    }

    events()
    {
        var management = this;

        $(document).on("click", "#chatSubmit", function(){
            management.sendMessage();
        });

        $(document).on("click", "#test", function(){
            management.test();
        });

        $(document).on('click', ".friend", function(e){
            management.changeChatScreen(e);
        });
    }

    changeChatScreen(e)
    {
        var management = this;
        $("#messages").empty();
        var element = $(e.target).closest(".friend");
        element.addClass("active");

        var roomChatkitID = RoomIDController.createForOneToOne(management.currentUser.id, element.attr("data-user-id"));
        var roomID = null;
        
        management.currentUser.rooms.forEach(roomIndex => {
            if(roomIndex.room_id === roomChatkitID){
                roomID = roomIndex.id;
                return;
            }
        });

        management.chatIn(roomChatkitID, roomID);
    }

    test()
    {
        console.log('this.actuallChattingIn');
        console.log(this.actuallChattingIn);

        console.log('this.chatManager');
        console.log(this.chatManager);

        console.log('this.currentUserChatkit');
        console.log(this.currentUserChatkit);

        console.log('this.currentUser');
        console.log(this.currentUser);

        console.log('this.userFriends');
        console.log(this.userFriends);

        console.log('this.userConnected');
        console.log(this.userConnected);
    }
}