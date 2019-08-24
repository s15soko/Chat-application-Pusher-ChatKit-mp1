import * as React from 'react';
import styled from 'styled-components';

import { Options } from "./friendSuggestParts/Options";

const Friend = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
    padding: 2px;
`;

const Picture = styled.picture`
    min-width: 45px;
    max-width: 45px;
    height: 45px;
    overflow: hidden;
    border-radius: 25px;
    display: block;
`;

const Avatar = styled.img`
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: cover;
`;

const Name = styled.span`
    font-size: 22px;
    padding-left: 10px;
    width: 100%;
`;

export class FriendSuggest extends React.Component
{
    render()
    {
        var friends = this.props.friends;
        var currentLoggedUser = this.props.currentLoggedUser;
        var list = [];

        if(friends.length == 0){
            return(
                <div><h3>Sorry! Nothing found.</h3></div>
            );
        }

        friends.forEach(friend => {
            list.push(
                <Friend id={"friend" + friend.id} key={friend.id} className='friend'>

                    <Picture>
                        <Avatar src={friend.avatar}/>
                    </Picture>
                    <Name>{friend.name}</Name>
                    <Options 
                        friend={friend}
                        currentLoggedUser={currentLoggedUser}
                    />

                </Friend>
            );
        });

        return(
            <div>
                {list}
            </div>
        );
    }
}