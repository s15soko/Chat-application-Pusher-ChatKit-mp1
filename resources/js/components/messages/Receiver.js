import * as React from 'react';
import { Content } from "./parts/Content";

export class Receiver extends React.Component
{
    render()
    {
        var message = this.props.message;

        return(
            <div className='chatMessage receiverMessage'>
                <Content message={message}/>
            </div>
        );
    }
}