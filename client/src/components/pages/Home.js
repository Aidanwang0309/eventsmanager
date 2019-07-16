import React, { useContext, Fragment } from "react";
import Events from "../events/Events";
import EventForm from "../events/EventForm";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";

import EventContext from "../../context/events/eventContext";

const Home = () => {
  const eventContext = useContext(EventContext);

  const { editing, setEditing } = eventContext;

  return (
    <Fragment>
      <Fab
        color="primary"
        aria-label="Add"
        style={{ position: "fixed", bottom: "3rem", right: "3rem" }}
        onClick={() => setEditing(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog
        fullWidth={"fullWidth"}
        maxWidth={"md"}
        open={editing}
        aria-labelledby="simple-dialog-title"
      >
        <EventForm />
      </Dialog>

      <Events />
    </Fragment>
  );
};

export default Home;
