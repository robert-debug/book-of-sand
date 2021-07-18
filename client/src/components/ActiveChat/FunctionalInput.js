import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
},
}));

const FunctionalInput =(props) => {
  const [text, setText] = useState('')
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text,
      recipientId: props.otherUser.id,
      sender: props.user,
    };
    await dispatch(postMessage(reqBody));
    setText('')
  };


    return (
      <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleChange}
          />
        </FormControl>
      </form>
    );
  }

export default FunctionalInput;