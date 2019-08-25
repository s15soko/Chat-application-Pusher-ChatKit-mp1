import * as React from 'react';
import styled from 'styled-components';

const Picture = styled.picture`
    width: 35px;
    height: 35px;
    overflow: hidden;
    border-radius: 25px;
`;

const Image = styled.img`
    width: 100%;
    object-fit: cover;
    max-width: 100%;
    max-height: 100%;
`;

const MessageContent = styled.div`
    border-radius: 12px;
    background-color: rgb(236, 236, 236);
    padding: 1px 9px;
    color: black;
    word-wrap: break-word;
    width: max-content;
    max-width: 64%;
`;

export class Content extends React.Component
{
    render()
    {
        var message = this.props.message;

        return(
            <div className="box">
                <div className='picture'>
                    <Picture>
                        <Image src={message.avatar}/>
                    </Picture>
                </div>
                <div className='data'>
                    <MessageContent className='content'>           
                        {message.content}
                    </MessageContent>
                </div>
            </div>
        );
    }
}