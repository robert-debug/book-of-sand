import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Chip } from "@material-ui/core";

const UnreadCounter = ( { counter } ) =>{
    const [unreadConversationCount, setConversationCount] = useState(0);
    
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