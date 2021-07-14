import React from "react";
import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Chip } from "@material-ui/core";

const Chart = ( { props } ) =>{
    const [unreadConversationCount, setConversationCount] = useState(0);
    const 
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
export default Chart;