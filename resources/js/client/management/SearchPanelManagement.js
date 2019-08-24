import { Panel } from "../../components/searchPanel/Panel";
import { FriendSuggest } from "../../components/searchPanel/FriendSuggest";
import { UserDataController } from '../controllers/UserDataController';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UserFriendsController } from "../controllers/UserFriendsController";
import { QuickTokenController } from "../controllers/QuickTokenController";

export class SearchPanelManagement
{
    constructor()
    {
        // current logged user data
        this.currentLoggedUser = {
            id: null,
            avatar: "",
            rooms: {}
        };
    }

    init()
    {
        var management = this;

        // get current user data
        UserDataController.get()
            .then(function(userData){
                management.currentLoggedUser = userData['data'];

                QuickTokenController.create();
                
                management.build();
            });

        this.events();
    }

    /**
     * Build view
     */
    build()
    {
        ReactDOM.render(<Panel />, document.getElementById("searchPanelContainer"));
    }

    /**
     * Search friends and render data
     */
    searchFriends()
    {
        var management = this;
        var name = $("#searchForm > input").val();
        if(name.length == 0)
            return;

        axios.post("/user/friends/search", qs.stringify({name: name}))
            .then(function(response){
                var friends = response['data'];
                ReactDOM.render(<FriendSuggest 
                                    friends={friends}
                                    currentLoggedUser={management.currentLoggedUser}
                                />, document.getElementById("results"));
            });
    }

    /**
     * Default events
     */
    events()
    {
        var management = this;

        $(document).submit("#searchForm", function(){
            management.searchFriends();
        })
    }
}