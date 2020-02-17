import React, { useState, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useEventAction, useAuthState, useAuthAction } from 'src/shared/hooks';
import { IUser } from 'src/context/auth/authTypes';
import { Button, BUTTON_VARIANTS } from 'src/shared/components';
import { formatDate } from 'src/shared/utils';

import _ from 'lodash';
import {
  Avatar,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Typography,
  Dialog,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';

// Types
type EventCardProps = {
  name: string;
  date: string;
  type: string;
  location: string;
  _id: string;
  creator: string;
  attendees: IUser[];
  poster: string;
  user: IUser | null;
  updateUser: (props: IUser) => Promise<void>;
};

const { REACT_APP_ENV } = process.env

const EventCard = (event: EventCardProps) => {
  const { _id, name, date, location, creator, attendees, poster, user, updateUser } = event;
  const ImgUrl = REACT_APP_ENV === 'development' ? `http://localhost:5000/api/file/${poster}` : `${window.location.protocol}//${window.location.hostname}/api/file/${poster}`

  const classes = useStyles();

  // const { updateUser } = useAuthAction();
  // const { user } = useAuthState();
  const { deleteEvent, setCurrent, setEditing, addAttendee } = useEventAction();
  const [open, setOpen] = useState<boolean>(false);


  const handleDelete = () => {
    deleteEvent({ id: _id, poster });
  };


  console.log(user);
  const toggleGoing = (state: Boolean) => {
    console.log(user);
    if (user === null) {
      setOpen(true);
      return;
    }
    const { goingEvents } = user;
    const updatedUser = {
      ...user,
      goingEvents: state ? goingEvents.length === 0 ? [event] : [...goingEvents, event] : goingEvents.filter(event => event._id !== _id)
    }
    const attendeeUpdatedEvent = {
      ...event,
      attendees: state ? [...attendees, user] : attendees.filter(attendee => attendee._id !== user._id)
    }
    addAttendee(attendeeUpdatedEvent);
    updateUser(updatedUser);
  }

  const handleEditing = (): ReactElement | null => {
    return user !== null && user._id === creator ? (
      <>
        <DeleteOutlinedIcon
          className={classes.MuiAvatarDeleteButton}
          onClick={handleDelete}
        />
        <EditOutlined
          className={classes.MuiAvatarEditButton}
          onClick={() => {
            setCurrent(event);
            setEditing(true);
          }}
        />
      </>
    ) : null;
  };

  const isUserGoing = (props: IUser | null) => {
    if (props !== null) {
      const { goingEvents } = props;
      if (_.find(goingEvents, { _id: _id })) return true;
    }
    return false;
  };

  return (
    <Card className={classes.MuiEngagementCard} key={_id}>
      <CardMedia
        className={classes.MuiCardMedia}
        image={ImgUrl}
      />
      <CardContent className={classes.MuiCardContent}>
        <Typography
          className={classes.MuiTypographyHeading}
          variant={'h6'}
          gutterBottom
        >
          {name}
        </Typography>
        <Typography
          className={classes.MuiTypographySubheading}
          variant={'caption'}
        >
          {location} <br />
        </Typography>
        <Typography
          className={classes.MuiTypographySubheading}
          variant={'caption'}
        >
          {formatDate(date).formatedCardDate}
        </Typography>
        <Divider className={classes.MuiDivider} light />

        <div className={classes.MuiCardContentAttendContainer}>
          <div>
            {attendees.length > 0 &&
              attendees.map(attendee => {
                return (
                  <Avatar
                    className={classes.MuiAvatar}
                    key={attendee._id}
                    src={attendee.avatar}
                  />
                );
              })}
          </div>

          <Button
            style={{ width: '50%' }}
            variant={isUserGoing(user) ? BUTTON_VARIANTS.DEFAULT : BUTTON_VARIANTS.OUTLINED}
            onClick={() => toggleGoing(!isUserGoing(user))}
          >
            {isUserGoing(user) ? 'DROP' : 'GOING'}
          </Button>

        </div>
        {handleEditing()}
      </CardContent>
      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={open}
        onBackdropClick={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
      >
        <Typography
          align="center"
          style={{ color: 'black', padding: '5rem' }}
          gutterBottom
        >
          You have to login to publish the content.
          <Link to="/login">SIGN IN</Link>
        </Typography>
      </Dialog>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    MuiEngagementCard: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.primary.contrastText,
      transition: '0.3s',
      overFlow: 'hidden',
      boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
      width: '80%',
      margin: '3rem auto',
      [theme.breakpoints.up('sm')]: {
        width: '40%',
        margin: '3rem auto'
      },
      [theme.breakpoints.up('md')]: {
        width: '35%',
        margin: '2rem auto'
      },
      [theme.breakpoints.up('lg')]: {
        width: '30%',
        margin: '3rem auto'
      },
      '&:hover': {
        boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
      }
    },

    MuiCardMedia: {
      paddingTop: '56.25%'
    },

    MuiCardContent: {
      position: 'relative',
      textAlign: 'left',
      padding: theme.spacing(3)
    },
    MuiCardContentAttendContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: '45px',
      overFlow: 'hidden',
      '& button': {
        color: theme.palette.primary.contrastText,
        borderColor: theme.palette.secondary.light
      }
    },
    MuiDivider: {
      margin: `${theme.spacing(3)}px 0`
    },
    MuiTypographyHeading: {
      fontWeight: 'bold',
      color: theme.palette.primary.contrastText
    },
    MuiTypographySubheading: {
      fontSize: '0.75rem',
      lineHeight: 1.8,
      [theme.breakpoints.up('md')]: {
        fontSize: '1rem'
      }
    },
    MuiAvatarDeleteButton: {
      position: 'absolute',
      right: '5%',
      bottom: '50%',
      cursor: 'pointer'
    },
    MuiAvatarEditButton: {
      position: 'absolute',
      right: '20%',
      bottom: '50%',
      cursor: 'pointer'
    },
    MuiAvatar: {
      display: 'inline-block',
      border: '2px solid white',
      '&:not(:first-of-type)': {
        marginLeft: theme.spacing(-1)
      }
    }
  })
);

// const eventCardPropsAreEqual = (prevEvent: EventCardProps, nextEvent: EventCardProps) => {

//   if (nextEvent.user !== null) {
//     if (prevEvent.user === null) {
//       console.log('here1')
//       return false
//     }
//     console.log('here2', prevEvent.attendees, nextEvent.attendees, nextEvent.user)
//     return prevEvent.attendees.length === nextEvent.attendees.length &&
//       prevEvent.user._id === nextEvent.user._id
//   }
//   console.log('here3')
//   return true;
// }

export default EventCard;
