import * as React from 'react';
import { Content } from "./parts/Content";

export class Sender extends React.Component
{
    render()
    {
        var message = this.props.message;

        return(
            <div className="chatMessage senderMessage">
               <Content message={message}/>
            </div>
        );
    }
}