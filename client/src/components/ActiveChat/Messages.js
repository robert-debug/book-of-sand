import React from "react";
import { Box, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { useDispatch } from 'react-redux'
import moment from "moment";
import { readMessage } from '../../store/utils/thunkCreators';

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const dispatch = useDispatch();
  const onLoad = (messageId) =>{
    const body = { recipientId: userId, messageId }
    dispatch(readMessage(body))
  }
  const useStyles = makeStyles(() => ({
    avatar: {
      height: 25,
      width: 25,
      marginLeft: 780,
      marginTop: 6,
    }
  }));
  const classes = useStyles();

  return (
    <Box>
      {messages.map((message, i) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <>
          <SenderBubble key={message.id} text={message.text} time={time} />
          </>
        ) : (

          <>
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} onLoad={onLoad} messageId={message.id} />
          {
            messages.length - 1 === i ? (<Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>) : null
          }
          </>
        );
      })}
    </Box>
  );
};

export default Messages;
