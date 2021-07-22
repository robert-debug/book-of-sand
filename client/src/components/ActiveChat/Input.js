import React, { useState } from "react";
import { FormControl, FilledInput, ThemeProvider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import { makeStyles, createTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
  },
  input: {
    height: 70,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 15,
},
}));

const theme = createTheme(
  {
    spacing:{
      my: 10,
    },
    palette: {
      main: "#F4F6FA",
    }
  });

const Input =(props) => {
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
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    );
  }

export default Input;