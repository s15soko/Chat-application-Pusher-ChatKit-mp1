const path = require("path");
require("dotenv").config({path: path.join(__dirname + "/server/.env")});

const port = process.env.SERVER_PORT || 3000;

const express = require('express')
const app = express()
const bodyParser = require('body-parser');

var UserIDController = require("./client-server/UserIDController");
var QuickTokenController = require("./server/controllers/QuickTokenController");
var UserController = require("./server/controllers/UserController");
var ChatKitController = require("./server/controllers/ChatKitController"); 
var RoomsController = require("./server/controllers/RoomsController");
const chatkit = ChatKitController.init();

// default
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.append('Access-Control-Allow-Headers', 
      'Content-Type, X-CSRF-Token, x-requested-with, quickToken');
  next();
});

// listen
app.listen(port, () => console.log(`App listening on port ${port}!`))


// pusher chatkit auth 
app.post('/pusher/chatkit/auth', (req, res) => {
  var userChatkitID = req.query.user_id;

  UserController.createUser(chatkit, userChatkitID);

  const authData = chatkit
    .authenticate({
      userId: userChatkitID
    });

  res.status(authData.status)
    .send(authData.body);  
});

// send a message
app.post("/pusher/chatkit/message/send", (req, res) => {
  
  var roomID = req.body.roomID;
  var userID = req.body.userID;
  var message = req.body.message;
  var roomChatkitID = req.body.roomChatkitID;
  var userChatkitID = UserIDController.addPrefix(userID); 
  var token = req.headers.quicktoken;

  QuickTokenController.checkToken(userID, token)
    .then(function(response){
      if(response) {
        var WhiteSpacesController = require("./server/WhiteSpacesController");
        // if message is empty return
        if(WhiteSpacesController.removeWhiteSpaces(message).length == 0){
          res.status(400)
            .send('Message is empty');
          return;
        }

        // sql
        var DatabaseMessagesController = require("./server/controllers/DatabaseMessagesController");
        DatabaseMessagesController.saveMessage(userID, roomID, message);

        // chatkit
        var MessagesController = require("./server/controllers/MessagesController");
        MessagesController.sendSimpleMessage(chatkit, {
          userChatkitID: userChatkitID,
          roomChatkitID: roomChatkitID,
          message: message
        })
          .then(function(response){
            res.sendStatus(response);
          });

      }else{
        res.sendStatus(403);
      }
    }) 
});


// send a message
app.post("/pusher/chatkit/room/create", (req, res) => {
  
  var roomID = req.body.roomID;
  RoomsController.checkIfRoomExist(roomID)
    .then(function(response){

      if(response.length > 0){
        var roomChatkitID = response[0].room_id;

        RoomsController.getRoomMembers(roomID)
          .then(function(response){
            
            var members = response;
            if(members.length > 0){
            
              var usersToJoin = [];
              var creatorID = null;

              members.forEach(member => {
                  var memberFinalID = UserIDController.addPrefix(member.user_id);
                  // make sure users exist
                  UserController.createUser(chatkit, memberFinalID);

                  if(creatorID == null){
                    creatorID = memberFinalID;
                    return;
                  }
                  usersToJoin.push(memberFinalID);
              });

              
              RoomsController.createRoom(chatkit, roomChatkitID, creatorID, usersToJoin)
                .then(() => {
                  res.sendStatus(200);
                }).catch((err) => {
                  res.sendStatus(err.status);
                });
            }

          });
      }
    })
      .catch(function(error){
        console.log(error);
      });
});