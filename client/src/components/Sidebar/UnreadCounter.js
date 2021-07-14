import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Chip } from "@material-ui/core";

const UnreadCounter = ( { counter } ) =>{
    const [unreadConversationCount, setConversationCount] = useState(0);
    console.log(counter)
    // console.log(conversation)
    // const user = useSelector(state => state.user)
    // console.log(user)
    // let counter = 0;
    // conversation.messages.forEach((message)=>{
    //     if (user.id !== message.senderId && message.unread === true){
    //         counter += 1;
    //     }
    // })
    useEffect(()=>{
        setConversationCount(counter)
    },[])
    
    return (
        <>
        {
            unreadConversationCount > 0 ? <Chip
                color="primary"
                label={counter}
                size='small'
            /> : null

        }
        </>
    )
}
export default UnreadCounter;