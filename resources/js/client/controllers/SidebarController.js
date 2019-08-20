import { Friend } from "../../components/sidebar/Friend";
import { Top } from "../../components/sidebar/Top";

import * as React from 'react';
import * as ReactDOM from "react-dom";

export class SidebarController
{
    /**
     * Build sidebar data
     * || Alias for all builders
     * 
     * @param {*} friends 
     * @param {*} loggedUser 
     */
    static build(friends, loggedUser)
    {
        SidebarController.buildTop(loggedUser);
        SidebarController.buildFriendsContent(friends);
    }

    static buildTop(loggedUser)
    {
        var element = document.getElementById("sidebarHeader");
        ReactDOM.render(<Top loggedUser={loggedUser}/>, element);
    }

    static buildFriendsContent(friends)
    {
        var element = document.getElementById("friends");
        ReactDOM.render(<Friend friends = {friends}/>, element);
    }

    static markFirstRoomOnList()
    {
        var element = $("#friends").find(".friend").first();
        SidebarController.markActiveRoom(element);
    }

    static markActiveRoom(element)
    {
        element.addClass("active");
    }

    static unmarkAllActiveRooms()
    {
        var elements = $("#friends").children();

        elements.each(function(index){
            $(this).find(".friend").removeClass("active");
        })
    }
}