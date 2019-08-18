export class RandomStringController
{
    static randomString(length)
    {
        let string = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
        var charsLength = characters.length;

        for ( var i = 0; i < length; i++ ) 
            string += characters.charAt(Math.floor(Math.random() * charsLength));
        
        return string;
    }
}