import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Chip } from "@material-ui/core";

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
    console.log(conversationLength)
    useEffect(()=>{
        setConversationCount(0)
    },[activeConversation])

    useEffect(()=>{
        setConversationCount(counter)
    },[conversationLength])
    

    return (
        <>
        {
            unreadConversationCount > 0 ? <Chip
                color="primary"
                label={unreadConversationCount}
                size='small'
            /> : null

        }
        </>
    )
}
export default UnreadCounter;