import React, { useState, useContext, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AlertContext from "../../context/alert/alertContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const classes = useStyles();
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          variant="error"
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{alert.msg}</span>}
          action={[
            //   <Button
            //     key="undo"
            //     color="secondary"
            //     size="small"
            //     onClick={handleClose}
            //   >
            //     UNDO
            //   </Button>,
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
        />
      </div>
    ))
  );
};

export default Alert;
