import * as React from 'react';
import styled from 'styled-components';

const OptionsContainer = styled.div`
    width: 80px;
    min-width: 80px;
`;

const ChoiseButton = styled.button`
    background: transparent;
    border: none;
    outline: none;
`;

const IconAdd = styled.i`
    color: #3E7FE0;
`;

const IconRemove = styled.i`
    color: #94334D;
`;

export class Options extends React.Component
{
    render()
    {
        var friend = this.props.friend;

        var choiseIcon = friend.added == null 
                ? <IconAdd className="fas fa-user-plus"></IconAdd> 
                : <IconRemove className="fas fa-user-minus"></IconRemove> 

        return(
            <div>
                <OptionsContainer className='options'>
                    <ChoiseButton className='choice'>
                        {choiseIcon} 
                    </ChoiseButton>
                </OptionsContainer>
            </div>
        );
    }
}