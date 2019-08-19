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
}