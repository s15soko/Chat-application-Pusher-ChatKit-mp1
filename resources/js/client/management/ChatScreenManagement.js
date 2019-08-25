import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { UserDataController } from '../controllers/UserDataController';
import { UserFriendsController } from "../controllers/UserFriendsController";
import { SidebarController } from "../controllers/SidebarController";
import { QuickTokenController } from "../controllers/QuickTokenController";
import { MessagesController } from "../controllers/MessagesController";
import { RoomsController } from "../controllers/RoomsController";
import { LastMessageController } from "../controllers/LastMessageController";
import { CurrentChatController } from "../controllers/CurrentChatController";
import { EmojiPanelController } from "../controllers/EmojiPanelController";

const UserIDController = require("../../client-server/UserIDController");
const RoomIDController = require("../../client-server/RoomIDController");

export class ChatScreenManagement
{
    constructor()
    {
        // Actuall chatting in room...
        this.actuallChattingRoom = {
            roomChatkitID: "", // string
            roomID: "", // int,
            members: [] 
        };

        // pusher chatkit object
        this.chatManager = null;

        // current chatkit user
        this.currentUserChatkit = null;

        // current logged user data
        this.currentLoggedUser = {
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
                management.currentLoggedUser = userData['data'];

                // get user friends
                UserFriendsController.getFriends()
                    .then(function(response){
                        var friends = response['data'];
        
                        // fill sidebar
                        SidebarController.build(friends, management.currentLoggedUser);
        
                        management.userFriends = friends;
                    });


                // init chat manager
                management.chatManager = new ChatManager({
                    instanceLocator: 'v1:us1:4f3fcbda-acc9-415e-86df-621a6b34ebe4',
                    userId: String(UserIDController.addPrefix(management.currentLoggedUser.id)),
                    connectionTimeout: 5000,
                    tokenProvider: new TokenProvider({ url: 'http://localhost:3000/pusher/chatkit/auth' })
                });

                // connect
                management.chatManager.connect()
                    .then(currentUser => {

                        QuickTokenController.create(); 
                        management.userConnected = true;
                        management.currentUserChatkit = currentUser;

                        // SET HOOKS
                        var firstRoom = true;
                        // for each room
                        management.currentLoggedUser.rooms.forEach(room => {

                            if(firstRoom){
                                management.chatIn(room.room_id, room.id);
                                
                                firstRoom = false;
                                SidebarController.markFirstRoomOnList();

                                management.updateRoomMembers();

                                CurrentChatController.showChatTopUserData(
                                    management.getFriendData(
                                        SidebarController.getFirstFromList()));

                                MessagesController.stackMessages(room.id, management.currentLoggedUser);
                            }

                            management.subscribeRoom(room.room_id)
                                .catch(function(err){
                                    if(err.info.error == "services/chatkit/not_found/room_not_found")
                                    {
                                        // try to create room
                                        // and connent one more time
                                        RoomsController.checkByRoomID(room.id)
                                            .then(function(response){
                                                if(response == 200 || response == 201){
                                                    management.subscribeRoom(room.room_id);
                                                };
                                            });
                                    }
                                })
                                
                            });
                        });
            });

        EmojiPanelController.fillEmojiContainer();
        this.events();
    }

    /**
     * Subscribe room
     * 
     * @param {string} roomChatkitID 
     * 
     * @return {Promise}
     */
    subscribeRoom(roomChatkitID)
    {
        var management = this;

        return management.currentUserChatkit
            .subscribeToRoomMultipart({
                roomId: String(roomChatkitID),
                hooks: {
                  onMessage: message => {

                    var senderID = UserIDController.removePrefix(message.senderId);
                    var senderData = UserFriendsController.returnFriendDataByID(senderID, management.userFriends);

                    MessagesController.onNewChatKitMessage(message, management.actuallChattingRoom, management.currentLoggedUser, senderData);
                  },
                  onPresenceChanged: (state, user) => {
                    management.setFriendState(state, user);
                    management.updateFriendState(UserIDController.removePrefix(user.id));
                  }
                },
                // load previous messages from database
                messageLimit: 0 
            });
    }

    /**
     * Set friend state
     * 
     * @param {object} state 
     * @param {object} user 
     */
    setFriendState(state, user)
    {
        var management = this;
        var userID = UserIDController.removePrefix(user.id);

        management.userFriends.forEach(friend => {
            if(friend.id == userID){
                friend.state = state;
                return;
            }
        });
    }

    /**
     * Update user state {online, offline} in chat navbar
     * 
     * @param {int} userID 
     */
    updateFriendState(userID)
    {
        var management = this;
        if(userID == management.currentLoggedUser.id 
            || !RoomsController.userInRoom(management.actuallChattingRoom, UserIDController.addPrefix(userID)) )
                return;

        var friend = UserFriendsController.returnFriendDataByID(userID, management.userFriends);
        CurrentChatController.showStatus(friend.state);
    }

    updateRoomMembers()
    { 
        var roomChatkitID = this.actuallChattingRoom.roomChatkitID;
        this.actuallChattingRoom.members = RoomsController.getOneToOneMembers(roomChatkitID);
    }

    /**
     * Set actuall chat window data
     * 
     * @param {string} roomChatkitID 
     * @param {int} roomID 
     */
    chatIn(roomChatkitID, roomID)
    {
        var management = this;
        management.actuallChattingRoom.roomChatkitID = String(roomChatkitID);
        management.actuallChattingRoom.roomID = Number(roomID);
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
            roomChatkitID: String(management.actuallChattingRoom.roomChatkitID),
            roomID: Number(management.actuallChattingRoom.roomID),
            userID: Number(management.currentLoggedUser.id),
            message: $("#chatMessageTextarea").val(),
        }

        MessagesController.send(data)
            .then(function(res){
                //
            })
            .finally(function(){
                $("#chatMessageTextarea").val("");
            })
    }

    /**
     * Default chat events
     */
    events()
    {
        var management = this;

        $(document).on("click", "#chatSubmit", function(){
            management.sendMessage();
        });

        $(document).on('click', ".friend", function(e){
            management.changeChatScreen(e);
        });

        $(document).on('click', "#chatEmojiFace", function(e){
            $("#emojisContainer").toggleClass("active");
        });

        $(document).on('click', "#emojisContainer .icon", function(e){
            var emoji = $(this).text();
            var content = $("#chatMessageTextarea").val();
            $("#chatMessageTextarea").val(content + emoji);
        });
    }

    /**
     * If the user change the person who is talking to
     * 
     * @param {object} e || the object the user clicked on
     */
    changeChatScreen(e)
    {
        var management = this;
        SidebarController.unmarkAllActiveRooms()

        var element = $(e.target).closest(".friend");
        SidebarController.markActiveRoom(element);

        $("#messages").empty();

        var chatWithUserID = element.attr("data-user-id");
        CurrentChatController.showChatTopUserData(management.getFriendData(chatWithUserID));
        LastMessageController.unmarkRoom(chatWithUserID);

        var roomChatkitID = RoomIDController.createForOneToOne(management.currentLoggedUser.id, chatWithUserID);
        var roomID = null;

        // get room id for sql
        management.currentLoggedUser.rooms.forEach(roomIndex => {
            if(roomIndex.room_id === roomChatkitID){
                roomID = roomIndex.id;
                return;
            }
        });

        management.chatIn(roomChatkitID, roomID);
        management.updateRoomMembers();
        management.updateFriendState(chatWithUserID);
        MessagesController.stackMessages(roomID, management.currentLoggedUser);
    }

    /**
     * Get friend data by his ID
     * 
     * @param {int} userID 
     * 
     * @return {object}
     */
    getFriendData(userID)
    {
        var management = this;
        var friend = UserFriendsController.returnFriendDataByID(userID, management.userFriends);
        return friend;
    }
}