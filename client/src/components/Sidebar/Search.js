import React from "react";
import { FormControl, FilledInput, InputAdornment, ThemeProvider } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, createTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  filledInput: {
    height: 50,
    background: "#E9EEF9",
    letterSpacing: 0,
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    "&::placeholder": {
      color: "#ADC0DE",
      opacity: 1,
    },
  },
}));
const theme = createTheme(
  {
    typography:{
      fontSize: 13,
      fontWeight: "bold",
    }
  });

const Search = (props) =>{
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const classes = useStyles()

    return (
      <form onSubmit={handleSubmit}>
        <ThemeProvider theme={theme}>
          <FormControl fullWidth hiddenLabel>
              <FilledInput
                name="search"
                onChange={props.handleChange}
                classes={{ root: classes.filledInput, input: classes.input }}
                disableUnderline
                placeholder="Search"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
               }
              ></FilledInput>
            </FormControl>
          </ThemeProvider>
      </form>
    );
}

export default Search;