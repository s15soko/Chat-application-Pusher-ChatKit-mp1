import * as React from 'react';

export class Smileys extends React.Component
{
    smileys()
    {
        var smileys = Array(
            "😀","😁","😂","🤣","😃","😄","😅","😆",
            "😉","😊","😋","😎","😍","😘","🥰","😗",
            "😙","😚️","🙂","🤗","🤩","🤔","🤨","😐",
            "😑","😶","🙄","😏","😣","😥","😮","🤐",
            "😯","😪","😫","😴","😌","😛","😜","😝",
            "🤤","😒","😓","😔","😕","🙃","🤑","😲",
            "🙁","😖","😞","😟","😤","😢","😭","😦",
            "😧","😨","😩","🤯","😬","😰","😱","🥵",
            "🥶","😳","🤪","😵","😡","😠","🤬","😷",
            "🤒","🤕","🤢","🤮","🤧","😇","🤠","🤡",
            "🥳","🥴","🥺","🤥","🤫","🤭","🧐","🤓",
            "😈","👿","👹","👺","💀","👻","👽","🤖",
            "💩","😺","😸","😹","😻","😼","😽","🙀",
            "😿","😾"
        );

        return smileys;
    }

    render()
    {
        var emojis = this.smileys();
        var list = [];

        var counter = 0;
        emojis.forEach(emoji => {
            list.push(
                <span key={counter} className='icon'>{emoji}</span>
            );
            counter++;
        });

        return(
            <div className='smileys'>
                <h4>Smileys</h4>
                {list}
            </div>
        );
    }
}