import React from "react";
import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Chip } from "@material-ui/core";

const UnreadCounter = ( { props } ) =>{
    const [unreadConversationCount, setConversationCount] = useState(0);
    const state = useSelector(state => state.conversations)
    console.log(state)
    return (
        <>
        {
            unreadConversationCount > 0 ? <Chip
                color="primary"
                label={unreadConversationCount}
            /> : null

        }
        </>
    )
}
export default UnreadCounter;