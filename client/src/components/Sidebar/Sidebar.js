import React from "react";
import { useSelector } from 'react-redux';
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { CurrentUser, Search, Chat } from "./index.js";


const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 15
  }
}));

const Sidebar = (props) => {
  const classes = useStyles();
  const conversations = props.conversations || [];
  const { handleChange, searchTerm } = props;
  const messageCountObj = {} 
  let count = 0
  const conversationLength = useSelector(state => {
    state.conversations.forEach((convo)=>{
        messageCountObj[convo.id] = 0
        convo.messages.forEach((message)=>{
            count += 1;
            console.log(message)
            console.log(messageCountObj)
            if (messageCountObj && message.unread && message.senderId === convo.otherUser.id){
              messageCountObj[convo.id] += 1
              console.log('bang')
            } 
        })
    });
    return count;
})
  console.log(conversations)
  return (
    <Box className={classes.root}>
      <CurrentUser />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {conversations
        .filter((conversation) => conversation.otherUser.username.includes(searchTerm)).sort((conversationA, conversationB)=>{
          return new Date(conversationB.latestCreatedMessage) - new Date(conversationA.latestCreatedMessage)
        })
        .map((conversation) => {
          return <Chat conversation={conversation} key={conversation.otherUser.username} conversationLength={conversationLength} messageCountObj={messageCountObj} />;
        })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversations
  };
};

export default connect(mapStateToProps)(Sidebar);
