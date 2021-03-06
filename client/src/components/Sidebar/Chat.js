import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { setActiveChat } from "../../store/activeConversation";
import UnreadCounter from "./UnreadCounter";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";


const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = (props)=>{ 
    const dispatch = useDispatch()
    const handleClick = async (conversation) => {
        await dispatch(setActiveChat(conversation.otherUser.username));
    };
    const classes  = useStyles();
    const otherUser = props.conversation.otherUser;

    return (
      <Box
        onClick={() => handleClick(props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={props.conversation} />
        <UnreadCounter conversation={props.conversation} conversationLength={props.conversationLength} messageCountObj={props.messageCountObj} />
      </Box>
    );
}

export default Chat;
