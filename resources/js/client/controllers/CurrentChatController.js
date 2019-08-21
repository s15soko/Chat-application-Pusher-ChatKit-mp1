export class CurrentChatController
{
    /**
     * Show friend data in chat navbar
     * 
     * @param {object} friendData 
     */
    static showChatTopUserData(friendData)
    {
        CurrentChatController.showAvatar(friendData.avatar);
        CurrentChatController.showName(friendData.name);
    }

    /**
     * 
     * @param {string} avatar 
     */
    static showAvatar(avatar)
    {
        $("#chatTop").find("picture > img").attr("src", avatar);
    }

    /**
     * 
     * @param {string} name 
     */
    static showName(name)
    {
        $("#chatTop").find(".top > span").text(name);
    }
    
    /**
     * 
     * @param {object} state 
     */
    static showStatus(state)
    {
        $("#chatTop").find(".bottom > span").text(state.current);
    }
}