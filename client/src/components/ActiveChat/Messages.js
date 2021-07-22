import React from "react";
import { Box } from "@material-ui/core";
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


  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} onLoad={onLoad} messageId={message.id} />
        );
      })}
    </Box>
  );
};

export default Messages;
