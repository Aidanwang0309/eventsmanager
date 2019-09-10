import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Themebutton from "../layout/Themebutton";
import EventContext from "../../context/events/eventContext";
import CloseIcon from "@material-ui/icons/Close";
import EventPicture from "./EventPicture";
import * as moment from "moment";

const EventForm = () => {
  const classes = useStyles();
  const eventContext = useContext(EventContext);

  const {
    addEvent,
    updateEvent,
    current,
    clearCurrent,
    setEditing
  } = eventContext;

  useEffect(() => {
    if (current !== null) {
      setEvent(current);
    }
  }, [current]);

  const getCurrentDate = () => {
    //2019-07-01T10:30
    let formatedCurrentTime = moment().format("YYYY-MM-DD") + "T22:00";
    return formatedCurrentTime;
  };

  const [event, setEvent] = useState({
    name: "",
    location: "",
    date: `${getCurrentDate()}`,
    type: "",
    poster: ""
  });

  const { name, location, date, type } = event;

  const handleChange = e =>
    setEvent({ ...event, [e.target.name]: e.target.value });

  const handlePicture = imageName => {
    setEvent({ ...event, poster: imageName });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addEvent(event);
    } else {
      updateEvent(event);
    }
    clearCurrent();
    setEditing(false);
  };

  const onClear = () => {
    clearCurrent({
      name: "",
      location: "",
      date: `${getCurrentDate()}`,
      type: "",
      poster: ""
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className={classes.container}
      noValidate
      autoComplete="off"
    >
      <CloseIcon
        className={classes.closeButton}
        onClick={() => {
          setEditing(false);
          onClear();
        }}
      />
      <div className={classes.formHeader}>
        <Typography variant="h5" component="h5" gutterBottom>
          {current ? "Update event" : "Add event"}
        </Typography>
      </div>
      <div className={classes.formBody}>
        <EventPicture
          style={{ height: "15rem", width: "15rem" }}
          handlePicture={handlePicture}
        />
        <div className={classes.formPart}>
          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={name}
            name="name"
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Location"
            className={classes.textField}
            value={location}
            name="location"
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            id="datetime-local"
            label="Event Time"
            type="datetime-local"
            className={classes.textField}
            value={date}
            name="date"
            margin="normal"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="standard-name"
            label="type"
            className={classes.textField}
            value={type}
            name="type"
            onChange={handleChange}
            margin="normal"
          />
        </div>
      </div>
      <div className={classes.formPart2}>
        {current ? <Themebutton handleClick={onClear} content="Clear" /> : null}
        <Themebutton
          type="submit"
          content={current ? "Update event" : "Add event"}
        />
      </div>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    margin: "10% 5%"
  },

  closeButton: {
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",
    cursor: "pointer"
  },
  formHeader: {
    top: "1.5rem",
    left: "2.5rem",
    position: "absolute"
  },

  formBody: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    width: "98%",
    alignItems: "center"
  },

  formPart: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  },

  formPart2: {
    paddingTop: "1.5rem",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },

  button: {
    cursor: "pointer",
    width: "30%",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    margin: "40px 20px",
    padding: "0 30px"
  }
}));

export default EventForm;
