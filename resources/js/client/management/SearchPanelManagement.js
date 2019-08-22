import { Panel } from "../../components/searchPanel/Panel";
import { FriendSuggest } from "../../components/searchPanel/FriendSuggest";

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class SearchPanelManagement
{
    init()
    {
        this.build();
        this.events();
    }

    /**
     * Build view
     */
    build()
    {
        ReactDOM.render(<Panel />, document.getElementById("searchPanelContainer"));
    }

    searchFriends()
    {
        var name = $("#searchForm > input").val();
        if(name.length == 0)
            return;

        axios.post("/user/friends/search", qs.stringify({name: name}))
            .then(function(response){
                var friends = response['data'];
                ReactDOM.render(<FriendSuggest friends={friends}/>, document.getElementById("results"));
            });
    }

    /**
     * Default events
     */
    events()
    {
        var management = this;

        $("#searchForm").submit(function(){
            management.searchFriends();
        })
    }
}