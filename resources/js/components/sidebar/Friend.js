import * as React from 'react';

export class Friend extends React.Component
{
    render()
    {
        var friends = this.props.friends;
        const list = [];

        friends.forEach(friend => {
            list.push(
                <div key={friend.id} id={"user"+friend.id}  className='friend' data-user-id={friend.id}>
                    <picture>
                        <img src={friend.avatar}/>
                    </picture>
                    <div className='dataContainer'>
                        <span className='name hideText'>{friend.name}</span>
                        <span className='lastMessage hideText'></span>
                    </div>
                </div>        
            );
        });

        return (
            <div>{list}</div>
        );
    }
}

