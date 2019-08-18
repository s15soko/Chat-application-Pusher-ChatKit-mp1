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
                        <img src="https://s3.amazonaws.com/moelis-assets/wp-content/uploads/2019/03/21153309/Joe-simon_BWW_7003-256x256.jpg"/>
                    </picture>
                </div>
                <div className='data'>
                    {/* <div className='top'>
                        <span>{"user: " + message.senderId}</span>
                    </div> */}
                    <div className='content'>           
                        {message.parts[0].payload.content}
                    </div>
                </div>
            </div>
        );
    }
}