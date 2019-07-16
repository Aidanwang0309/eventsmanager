/* eslint-disable max-len */
import React, { useContext } from "react";
import {
  Avatar,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Typography
} from "@material-ui/core";
import EventContext from "../../context/events/eventContext";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlined from "@material-ui/icons/EditOutlined";

const faces = [
  // "http://i.pravatar.cc/300?img=1",
  // "http://i.pravatar.cc/300?img=2",
  // "http://i.pravatar.cc/300?img=3",
  // "http://i.pravatar.cc/300?img=4"
];

const EventCard = event => {
  const eventContext = useContext(EventContext);
  const { _id, name, date, location, className } = event;
  const { deleteEvent, setCurrent, setEditing } = eventContext;

  const handleDelete = () => {
    deleteEvent(_id);
  };

  return (
    <Card className={`MuiEngagementCard--01 ${className}`}>
      <CardMedia
        className={"MuiCardMedia-root"}
        image={
          "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
        }
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
          {date}
        </Typography>
        <Divider className={"MuiDivider-root"} light />
        {faces.map(face => (
          <Avatar className={"MuiAvatar-root"} key={face} src={face} />
        ))}
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
      </CardContent>
    </Card>
  );
};

EventCard.getTheme = muiBaseTheme => ({
  MuiCard: {
    root: {
      "&.MuiEngagementCard--01": {
        transition: "0.3s",
        maxWidth: 304,
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
        "& .MuiDivider-root": {
          margin: `${muiBaseTheme.spacing(3)}px 0`
        },
        "& .MuiTypography--heading": {
          fontWeight: "bold"
        },
        "& .MuiTypography--subheading": {
          lineHeight: 1.8
        },
        "& .MuiAvatar-delete-button": {
          position: "absolute",
          right: "5%",
          bottom: "5%",
          cursor: "pointer"
        },
        "& .MuiAvatar-edit-button": {
          position: "absolute",
          right: "20%",
          bottom: "5%",
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

// EventCard.displayName = "Card";

// EventCard.metadata = {
//   name: "Engagement Card",
//   description: "Show people's engagement"
// };

export default EventCard;
