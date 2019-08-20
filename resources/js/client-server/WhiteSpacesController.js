class WhiteSpacesController
{
    static removeWhiteSpaces(sentence)
    {
        sentence = String(sentence).replace(/\s/g, "");
        return String(sentence);
    }
}

module.exports = WhiteSpacesController;