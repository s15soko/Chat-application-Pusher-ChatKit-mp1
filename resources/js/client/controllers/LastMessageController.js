export class LastMessageController
{
    /**
     * Show last message data in sidebar in friend bottom container
     * 
     * @param {string} message 
     * @param {int} userID
     */
    static showLastMessageInSidebar(message, userID)
    {
        $("#friends").find("#user"+userID).find(".lastMessage").text(message);
    }

    /**
     * If someone sended a message but current
     * logged user i chatting with someone else
     * 
     * @param {int} userID
     */
    static markRoom(userID)
    {
        $("#friends").find("#user" + userID).addClass("newMessage");
    }

    /**
     * Remove class
     * 
     * @param {int} userID
     */
    static unmarkRoom(userID)
    {
        $("#friends").find("#user" + userID).removeClass("newMessage");
    }

    /**
     * Scroll to messages bottom container
     */
    static scrollToBottom()
    {
        $("#messages").scrollTop($("#messages").height());
    }
}