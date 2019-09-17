/* eslint-disable max-len */
import React, { useContext, useEffect, Fragment, useState } from "react";
import {
  Avatar,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Typography
} from "@material-ui/core";
import EventContext from "../../context/events/eventContext";
import AuthContext from "../../context/auth/authContext";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";
import Themebutton from "../layout/Themebutton";
import FormatDate from "../../utils/formateDate";
import _ from "lodash";
import Events from "../dashboard/EventsTabs";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";

const EventCard = event => {
  const eventContext = useContext(EventContext);
  const {
    deleteEvent,
    setCurrent,
    setEditing,
    addAttendee,
    getEvents
  } = eventContext;

  const authContext = useContext(AuthContext);
  const { loadUser, updateUser, user } = authContext;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, [user]);

  const {
    _id,
    name,
    date,
    location,
    className,
    creator,
    attendees,
    poster
    // type
  } = event;

  const handleDelete = () => {
    deleteEvent(_id, poster);
  };

  const handleGoing = () => {
    if (user === null) {
      setOpen(true);
    } else {
      const { goingEvents } = user;
      let updatedUser;
      if (goingEvents.length === 0) {
        updatedUser = {
          ...user,
          goingEvents: [event]
        };
      } else {
        updatedUser = {
          ...user,
          goingEvents: [...goingEvents, event]
        };
      }
      updateUser(updatedUser);

      let updatedAttendee = {
        ...event,
        attendees: [...attendees, user]
      };
      addAttendee(updatedAttendee);
    }
  };

  const handleNotGoing = () => {
    if (user !== null) {
      const { goingEvents } = user;
      const updatedUser = {
        ...user,
        goingEvents: goingEvents.filter(event => event._id !== _id)
      };
      updateUser(updatedUser);

      let updatedAttendee = {
        ...event,
        attendees: attendees.filter(attendee => attendee._id !== user._id)
      };
      addAttendee(updatedAttendee);
    }
  };

  const handleEditing = () => {
    if (user !== null) {
      if (user._id === creator) {
        return (
          <Fragment>
            <DeleteOutlinedIcon
              className={"MuiAvatar-delete-button"}
              onClick={handleDelete}
            />
            <EditOutlined
              className={"MuiAvatar-edit-button"}
              onClick={() => {
                setCurrent(event);
                setEditing(true);
              }}
            />
          </Fragment>
        );
      }
    }
  };

  const isUserGoing = () => {
    //return true if going
    if (user !== null) {
      const { goingEvents } = user;
      if (_.find(goingEvents, { _id: _id })) return true;
    }
    return false;
  };

  return (
    <Card className={`MuiEngagementCard--01 ${className}`}>
      <CardMedia
        className={"MuiCardMedia-root"}
        // image={`http://localhost:5000/api/file/${poster}`}
        image={`${window.location.protocol}//${window.location.hostname}/api/file/${poster}`}
      />
      <CardContent className={"MuiCardContent-root"}>
        <Typography
          className={"MuiTypography--heading"}
          variant={"h6"}
          gutterBottom
        >
          {name}
        </Typography>
        <Typography className={"MuiTypography--subheading"} variant={"caption"}>
          {location} <br />
        </Typography>
        <Typography className={"MuiTypography--subheading"} variant={"caption"}>
          {FormatDate(date).formatedCardDate}
        </Typography>
        <Divider className={"MuiDivider-root"} light />

        <div className={"MuiCardContent--attendContainer"}>
          <div>
            {attendees.map(attendee => (
              <Avatar
                className={"MuiAvatar-root"}
                key={attendee._id}
                src={attendee.avatar}
              />
            ))}
          </div>

          {isUserGoing() === true ? (
            <Themebutton content="Going" handleClick={handleNotGoing} />
          ) : (
            <Themebutton
              style={{
                border: "1px solid pink",
                color: "pink",
                background: "transparent"
              }}
              content="Going"
              handleClick={handleGoing}
            />
          )}
        </div>
        {handleEditing()}
      </CardContent>
      <Dialog
        fullWidth
        maxWidth={"sm"}
        open={open}
        onBackdropClick={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
      >
        <Typography
          align="center"
          style={{ color: "black", padding: "5rem" }}
          gutterBottom
        >
          You have to login to publish the content .
          <Link to="/login">SIGN IN</Link>
        </Typography>
      </Dialog>
    </Card>
  );
};

EventCard.getTheme = muiBaseTheme => ({
  MuiCard: {
    root: {
      "&.MuiEngagementCard--01": {
        backgroundColor: "rgba(183, 183, 183, 0.2)",
        color: "#ececec",
        transition: "0.3s",
        overFlow: "hidden",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        "& .MuiCardMedia-root": {
          paddingTop: "56.25%"
        },
        "& .MuiCardContent-root": {
          position: "relative",
          textAlign: "left",
          padding: muiBaseTheme.spacing(3)
        },
        "& .MuiCardContent--attendContainer": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        },
        "& .MuiDivider-root": {
          margin: `${muiBaseTheme.spacing(3)}px 0`
        },
        "& .MuiTypography--heading": {
          fontWeight: "bold",
          color: "white"
        },
        "& .MuiTypography--subheading": {
          fontSize: "0.75rem",
          lineHeight: 1.8,
          [muiBaseTheme.breakpoints.up("md")]: {
            fontSize: "1rem"
          }
        },
        "& .MuiAvatar-delete-button": {
          position: "absolute",
          right: "5%",
          bottom: "50%",
          cursor: "pointer"
        },
        "& .MuiAvatar-edit-button": {
          position: "absolute",
          right: "20%",
          bottom: "50%",
          cursor: "pointer"
        },
        "& .MuiAvatar-root": {
          display: "inline-block",
          border: "2px solid white",
          "&:not(:first-of-type)": {
            marginLeft: -muiBaseTheme.spacing()
          }
        }
      }
    }
  }
});
export default EventCard;
