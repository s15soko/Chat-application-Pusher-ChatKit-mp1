import * as React from 'react';

export class Content extends React.Component
{
    render()
    {
        var message = this.props.message;

        return(
            <div className="box">
                <div className='picture'>
                    <picture>
                        <img src={message.avatar}/>
                    </picture>
                </div>
                <div className='data'>
                    {/* <div className='top'>
                        <span>{"user: " + message.senderId}</span>
                    </div> */}
                    <div className='content'>           
                        {message.content}
                    </div>
                </div>
            </div>
        );
    }
}