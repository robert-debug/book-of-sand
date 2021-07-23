import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import UnreadCounter from "./UnreadCounter";

const styles = {
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
};
let counter = 0;

class Chat extends Component {
  handleClick = async (conversation) => {
    counter = 0;
    await this.props.setActiveChat(conversation.otherUser.username);
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    let counter = 0;
    this.props.conversation.messages.forEach((message)=>{
        if (this.props.conversation.otherUser.id === message.senderId && message.unread === true){
            counter += 1;
        }
    })

    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation, counter)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
        <UnreadCounter conversation={this.props.conversation} counter={counter}/>
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};
// const mapStateToProps = (state) =>({
//    user: state.user 
// });

export default connect(null, mapDispatchToProps)(withStyles(styles)(Chat));
