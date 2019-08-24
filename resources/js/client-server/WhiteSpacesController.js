class WhiteSpacesController
{
    /**
     * Remove all white spaces from string
     * 
     * @param {string} sentence 
     * 
     * @return {string}
     */
    static removeWhiteSpaces(sentence)
    {
        sentence = String(sentence).replace(/\s/g, "");
        return String(sentence);
    }
}

module.exports = WhiteSpacesController;