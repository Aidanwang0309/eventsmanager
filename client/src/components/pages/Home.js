import React, { useState } from "react";
import Events from "../events/Events";
import EventForm from "../events/EventForm";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";

const Home = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);

  return (
    <div>
      <Fab
        color="primary"
        aria-label="Add"
        style={{ position: "fixed", bottom: "3rem", right: "3rem" }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} aria-labelledby="simple-dialog-title">
        <EventForm />
      </Dialog>

      <Events />
    </div>
  );
};

export default Home;
