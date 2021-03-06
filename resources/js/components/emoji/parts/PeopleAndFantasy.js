import * as React from 'react';

export class PeopleAndFantasy extends React.Component
{
    peopleAndFantasy()
    {
        var peopleAndFantasy = Array(
            "👶","👧","🧒","👦","👩","🧑","👨","👵",
            "🧓","👴","👲","👳‍♀️","👳‍♂️","🧕","🧔","👱", 
            "👩‍🦲","👨‍🦳","👩‍🦳","🦸‍♀️","🦸‍♂️","🦹‍♀️","🦹‍♂️", "👮‍♀️",
            "👮‍♂️","👷‍♀️","👷‍♂️","💂‍♀️","💂‍♂️","🕵️‍♀️", "🕵️‍♂️","👩‍⚕️",
            "👨‍⚕️","👩‍🌾","👨‍🌾","👩‍🍳","👨‍🍳","👩‍🎓","👨‍🎓", "👩‍🎤","👨‍🎤",
            "👩‍🏫", "👨‍🏫","👩‍🏭","👨‍🏭","👩‍💻","👨‍💻","👩‍💼","👨‍💼",
            "👩‍🔧","👨‍🔧","👩‍🔬","👨‍🔬","👩‍🎨","👨‍🎨","👩‍🚒","👨‍🚒","👩‍✈️",
            "👨‍✈️","👩‍🚀","👨‍🚀","👩‍⚖️","👨‍⚖️","👰","🤵","👸","🤴",
            "🤶","🎅","🧙‍♀️","🧙‍♂️","🧝‍♀️","🧝‍♂️","🧛‍♀️","🧛‍♂️",
            "🧟‍♀️","🧟‍♂️","🧞‍♀️","🧞‍♂️","🧜‍♀️","🧜‍♂️","🧚‍♀️","🧚‍♂️",
            "👼","🤰","🤱","🙇‍♀️","🙇‍♂️","💁‍♀️","💁‍♂",
            "🙅‍♀️","🙅‍♂️","🙆‍♀️","🙆‍♂️","🙋‍♀️","🙋‍♂️","🤦‍♀",
            "🤦‍♂️","🤷‍♀️","🤷‍♂️","🙎‍♀️","🙎‍♂️","🙍‍♀️","🙍‍",
            "♂️","💇‍♀️","💇‍♂️","💆‍♀️","💆‍♂️","🧖‍♀️","🧖‍♂️",
            "💅","🤳","💃","🕺","👯‍♀️","👯‍♂️","🕴","🚶‍♀️","🚶‍♂️",
            "🏃‍♀️","🏃‍♂️","👫","👭","👬","💑","👩‍❤️‍👩","👨‍❤️‍👨","💏",
            "👩‍❤️‍💋‍👩","👨‍❤️‍💋‍👨","👪","👨‍👩‍👧","👨‍👩‍👧‍👦","👨‍👩‍👦‍👦","👨‍👩‍👧‍👧","👩‍👩‍👦","👩‍👩‍👧",
            "👩‍👩‍👧‍👦","👩‍👩‍👦‍👦","👩‍👩‍👧‍👧","👨‍👨‍👦","👨‍👨‍👧","👨‍👨‍👧‍👦","👨‍👨‍👦‍👦","👨‍👨‍👧‍👧","👩",
            "‍👦","👩‍👧","👩‍👧‍👦","👩‍👦‍👦","👩‍👧‍👧","👨‍👦","👨‍👧","👨‍👧‍👦","👨‍👦‍👦","👨‍👧‍👧",
            "🤲","👐","🙌","👏","🤝","👍","👎","👊","✊",
            "🤛","🤜","🤞","✌️","🤟","🤘","👌","👈","👉","👆",
            "👇","☝️", "✋","🤚","🖐","🖖","👋","🤙","💪","🦵",
            "🦶","🖕", "✍️","🙏", "💍","💄","💋","👄","👅",
            "👂","👃","👣","👁","👀","🧠", "🦴","🦷","🗣",
            "👤","👥"
        );

        return peopleAndFantasy;
    }

    render()
    {
        var emojis = this.peopleAndFantasy();
        var list = [];

        var counter = 0;
        emojis.forEach(emoji => {
            list.push(
                <span key={counter} className='icon'>{emoji}</span>
            );
            counter++;
        });

        return(
            <div className='peopleAndFantasy'>
                <h4>People and Fantasy</h4>
                {list}
            </div>
        );
    }
}