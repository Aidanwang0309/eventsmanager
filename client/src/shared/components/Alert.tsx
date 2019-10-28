import React, { useState, useContext, useEffect } from 'react';

import {
  Theme,
  makeStyles,
  createStyles,
  Snackbar,
  SnackbarContent,
  IconButton
} from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { AlertContext } from 'src/context';

const Alert = (): JSX.Element => {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  useEffect(() => {
    if (alerts.length > 0) {
      setOpen(true);
    }
  }, [alerts.length]);

  return (
    <>
      {alerts.length > 0 &&
        alerts.map(alert => (
          <div key={alert.id}>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              open={open}
            >
              <SnackbarContent
                className={classes[alert.type]}
                message={<span id="message-id">{alert.msg}</span>}
                action={[
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={() => setOpen(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                ]}
              />
            </Snackbar>
          </div>
        ))}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

export default Alert;
