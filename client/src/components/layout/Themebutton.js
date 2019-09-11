import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const Themebutton = props => {
  const classes = useStyles();

  const { type, content, handleClick, value, style } = props;
  return (
    <Button
      style={style}
      className={classes.button}
      variant="outlined"
      type={type}
      value={value}
      onClick={handleClick}
    >
      {content}
    </Button>
  );
};

const useStyles = makeStyles(theme => ({
  button: {
    width: "50%",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    // margin: "40px 20px",
    padding: "0 15px"
  }
}));

export default Themebutton;
