import React, { useState, useContext, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AlertContext from "../../context/alert/alertContext";
import { makeStyles } from "@material-ui/core/styles";
import { amber, green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  error: {
    backgroundColor: theme.palette.error.light
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  success: {
    backgroundColor: green[600]
  },
  warning: {
    backgroundColor: amber[700]
  }
}));

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (alertContext.alerts.length > 0) {
      setOpen(true);
    }
  }, [alertContext.alerts.length]);

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id}>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={open}
        >
          <SnackbarContent
            className={classes[`${alert.type}`]}
            message={<span id="message-id">{alert.msg}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          ></SnackbarContent>
        </Snackbar>
      </div>
    ))
  );
};

export default Alert;
