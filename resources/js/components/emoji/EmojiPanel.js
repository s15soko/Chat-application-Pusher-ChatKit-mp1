import { Smileys } from "./parts/Smileys";
import { PeopleAndFantasy } from "./parts/PeopleAndFantasy";
import * as React from 'react';

export class EmojiPanel extends React.Component
{
    render()
    {
        return(
            <div>
                <Smileys/>
                <PeopleAndFantasy/>
            </div>
        );
    }
}