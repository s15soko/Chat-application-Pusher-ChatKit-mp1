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
     * @param {*} currentLoggedUser 
     */
    static build(friends, currentLoggedUser)
    {
        SidebarController.buildTop(currentLoggedUser);
        SidebarController.buildFriendsContent(friends);
    }

    static buildTop(currentLoggedUser)
    {
        var element = document.getElementById("sidebarHeader");
        ReactDOM.render(<Top currentLoggedUser={currentLoggedUser}/>, element);
    }

    static buildFriendsContent(friends)
    {
        var element = document.getElementById("friends");
        ReactDOM.render(<Friend friends = {friends}/>, element);
    }

    /**
     * Return user id who is first on list
     */
    static getFirstFromList()
    {
        var element = $("#friends").find(".friend").first();
        return element.attr("data-user-id");
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