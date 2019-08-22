import { EmojiPanel } from "../../components/emoji/EmojiPanel";

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class EmojiPanelController
{
    static fillEmojiContainer()
    {
        ReactDOM.render(<EmojiPanel />, document.getElementById("emojisContainer"));
    }
}