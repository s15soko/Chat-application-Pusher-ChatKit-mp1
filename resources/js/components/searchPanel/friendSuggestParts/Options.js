import * as React from 'react';
import styled from 'styled-components';

import { UserFriendsController } from "../../../client/controllers/UserFriendsController";

const OptionsContainer = styled.div`
    width: 84px;
    min-width: 84px;
`;

const IconAddS = styled.i`
    color: #3E7FE0;
    cursor: pointer;
`;

const IconRemoveS = styled.i`
    color: black;
    cursor: pointer;
`;

const Container = styled.div`
    display: inline-flex;
`;

const AcceptButton = styled.button`
    background: transparent;
    border: none;
    outline: none;
    padding: 0 4px;
    font-size: 16px;
`;

const DiscardButton = styled.button`
    background: transparent;
    border: none;
    outline: none;
    padding: 0 2px;
`;

const DiscardIcon = styled.i`
    color: black;
`;


const SendedFlag = styled.div`
    display: flex;
    align-items: center;
`;

const SendedText = styled.span`
    padding: 0 2px;
    font-size: 16px;
`;


export class Options extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            render: "add", // add, remove, acceptOrDiscard, sent
            friend: props.friend,
            currentLoggedUser: props.currentLoggedUser
        }

        this.acceptOrDiscard.bind(this);
    }

    setRenderAdd(){
        this.setState({
            render: "add"
        })
    }

    setRenderRemove(){
        this.setState({
            render: "remove"
        })
    }

    setRenderAcceptOrDiscard(){
        this.setState({
            render: "acceptOrDiscard"
        })
    }

    setRenderSent(){
        this.setState({
            render: "sent"
        })
    }

    /** ACTIONS */
    actionAdd()
    {
        var options = this;

        UserFriendsController.addFriend(this.state.currentLoggedUser.id, this.state.friend.id)
            .then(function(response){
                var status = response.status;

                if(status == 200 || status == 201){
                    options.setState({
                        render: "sent"
                    })
                }
            });
    }

    actionRemove()
    {
        var options = this;

        UserFriendsController.removeFriend(this.state.currentLoggedUser.id, this.state.friend.id)
            .then(function(response){
                var status = response.status;

                if(status == 200 || status == 201){
                    options.setState({
                        render: "add"
                    })
                }
            });
    }

    actionAccept()
    {
        var options = this;

        UserFriendsController.acceptFriend(this.state.currentLoggedUser.id, this.state.friend.id)
            .then(function(response){
                var status = response.status;

                if(status == 200 || status == 201){
                    options.setState({
                        render: "remove"
                    })
                }
            });
    }

    actionDiscard()
    {
        var options = this;

        UserFriendsController.discardFriend(this.state.currentLoggedUser.id, this.state.friend.id)
            .then(function(response){
                var status = response.status;

                if(status == 200 || status == 201){
                    options.setState({
                        render: "add"
                    })
                }
            }); 
    }

    /**
     * Before render
     */
    componentWillMount()
    {
        var friend = this.state.friend;
        var currentLoggedUser = this.state.currentLoggedUser;

        // if invitation was sended
        if(friend.sended != null){
            // who invite
            if(currentLoggedUser.id == friend.invited_user_id){
                this.setRenderAcceptOrDiscard();
            }
            else{
                this.setRenderSent();
            }
        }
        else if(friend.sended == null){
            if(friend.added == null){
                this.setRenderAdd();
            }else{
                this.setRenderRemove();
            }
        }
    }

    render()
    {
        var renderMe = this.getChoiceContainer();

        return(
            <div>
                <OptionsContainer className='options'>
                    {renderMe}
                </OptionsContainer>
            </div>
        );
    }

    /**
     * Get correct button
     * 
     * @param {object} friend 
     * @param {object} currentLoggedUser 
     */
    getChoiceContainer()
    {
        var choise = null;

        switch(this.state.render)
        {
            case "add":
                choise = this.add();
            break;
            case "remove":
                choise = this.remove();
            break;
            case "acceptOrDiscard":
                choise = this.acceptOrDiscard();
            break;
            case "sent":
                choise = this.sent();
            break;
        }

        return(
            <div className='choice'>
                {choise} 
            </div>
        );
    }

    acceptOrDiscard()
    {
        return(
            <Container> 
                <AcceptButton onClick={() => this.actionAccept()}>Accept</AcceptButton>  
                <DiscardButton onClick={() => this.actionDiscard()}>
                    <DiscardIcon className="fas fa-trash"></DiscardIcon>
                </DiscardButton>
            </Container> 
        );
    }

    sent()
    {
        return(
            <Container>
                <SendedFlag>
                    <i className="fas fa-check"></i>
                </SendedFlag>
                <SendedText>Sent</SendedText>  
            </Container>
        );
    }

    add()
    {
        return(
            <IconAddS onClick={() => this.actionAdd()} className="fas fa-user-plus"></IconAddS> 
        );
    }

    remove()
    {
        return(
            <IconRemoveS onClick={() => this.actionRemove()} className="fas fa-user-minus"></IconRemoveS>
        );
    }
}