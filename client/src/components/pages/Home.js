import React, { useContext, Fragment, useEffect } from "react";
import Events from "../events/Events";
import EventForm from "../events/EventForm";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import Alert from "../layout/Alert";
import EventContext from "../../context/events/eventContext";
import AuthContext from "../../context/auth/authContext";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import AuthContainer from "./AuthContainer";

const Home = () => {
  const eventContext = useContext(EventContext);
  const { editing, setEditing } = eventContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return (
    <AuthContainer>
      <Alert />
      <Fab
        color="primary"
        aria-label="Add"
        style={{
          zIndex: 100,
          position: "fixed",
          bottom: "3rem",
          right: "3rem",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        }}
        onClick={() => setEditing(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={editing}
        onBackdropClick={() => setEditing(false)}
        aria-labelledby="simple-dialog-title"
      >
        {isAuthenticated && !loading ? (
          <EventForm />
        ) : (
          <Typography
            align="center"
            style={{ color: "black", padding: "5rem" }}
            gutterBottom
          >
            You have to login to publish the content .
            <Link to="/login">SIGN IN</Link>
          </Typography>
        )}
      </Dialog>

      <Events />
    </AuthContainer>
  );
};

export default Home;
