### Features

- Chat (type one-to-one)
- Friends management system (Adding, removing)

###Quick Token

Because application works on php and node server, I created 'quick token', which is creating on php side when user is connecting with chatkit server. Token is placed in request header and checked on node server to auth user.


####Javascript　

```javascript
static create()
    {
        // generate token
        let quickToken = QuickTokenController.generateToken();
        QuickTokenController.saveInDatabase(quickToken);
        // set quick token header
        axios.defaults.headers.common.quickToken = quickToken;
    }
```
###Routing

**1) Php/ Laravel server side **

* /user/data/getdata
* /user/friends/get
* /user/friends/search
* /messages/private/get
* /pusher/chatkit/quicktoken/save

**2) Node.js server side **

* /pusher/chatkit/auth
* /pusher/chatkit/message/send
* /pusher/chatkit/room/create
* /chat/friends/list/send
* /chat/friends/list/remove
* /chat/friends/list/accept
* /chat/friends/list/discard

###Images

Image:

![](https://github.com/s15soko/Chat-application-Pusher-ChatKit-mp1/blob/master/assets/ch1.PNG)
> Chat window.

![](https://github.com/s15soko/Chat-application-Pusher-ChatKit-mp1/blob/master/assets/sbV1.PNG)
> Chat screen friends sidebar.

![](https://github.com/s15soko/Chat-application-Pusher-ChatKit-mp1/blob/master/assets/search1.PNG)
> Search panel.

