import React, {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chip } from "@material-ui/core";

const UnreadCounter = ( { conversation, conversationLength, messageCountObj  } ) =>{
    const [unreadConversationCount, setConversationCount] = useState(0);
    const activeConversation = useSelector(state => state.activeConversation)

    useEffect(()=>{
        setConversationCount(0)
    },[activeConversation])

    useEffect(()=>{
        setConversationCount(messageCountObj[conversation.id])
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