import * as React from 'react';

export class Top extends React.Component
{
    render()
    {
        var currentLoggedUser = this.props.currentLoggedUser;

        return(
            <div>
                <picture>
                    <img src={currentLoggedUser.avatar}/>
                </picture>
                <div className='dataContainer'>
                    <span >Chats</span>
                </div>
            </div> 
        );
    }
}

