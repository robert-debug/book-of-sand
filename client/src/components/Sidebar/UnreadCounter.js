import React, {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chip } from "@material-ui/core";

const UnreadCounter = ( { counter, conversation } ) =>{
    const [unreadConversationCount, setConversationCount] = useState(0);
    const activeConversation = useSelector(state => state.activeConversation)
    const conversationLength = useSelector(state => {
        let counter = 0;
        state.conversations.forEach((convo)=>{
            convo.messages.forEach((message)=>{
                counter += 1;
            })
        });
        return counter;
    })
    useEffect(()=>{
        setConversationCount(0)
    },[activeConversation])

    useEffect(()=>{
        setConversationCount(counter)
    },[conversationLength])
    

    return (
        <>
        {
            unreadConversationCount > 0 && activeConversation !== conversation.otherUser.username  ? <Chip
                color="primary"
                label={unreadConversationCount}
                size='small'
            /> : null

        }
        </>
    )
}
export default UnreadCounter;