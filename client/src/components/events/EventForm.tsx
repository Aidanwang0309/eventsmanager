import React, {
  useState,
  useContext,
  useEffect,
  ChangeEvent,
  FormEvent
} from 'react';
import { useEventAction, useEventState } from 'src/shared/hooks';
import { IEvent } from 'src/context/events/eventTypes';

import EventPicture from './EventPicture';
import { Button, BUTTON_VARIANTS } from 'src/shared/components';
import { formatDate } from 'src/shared/utils';

import {
  makeStyles,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  createStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const EventForm = () => {
  const eventState = useEventState();
  const { current } = eventState;

  const eventAction = useEventAction();
  const { addEvent, updateEvent, clearCurrent, setEditing } = eventAction;

  const classes = useStyles();

  const initialEvent = {
    _id: '',
    creator: '',
    name: '',
    date: `${formatDate().getCurrentDate}`,
    location: '',
    type: '',
    poster: '',
    attendees: []
  };
  const [event, setEvent] = useState<IEvent>(initialEvent);
  const { name, location, date, type } = event;

  useEffect(() => {
    current !== null && setEvent(current);
  }, [current]);

  const handleChange = (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setEvent({ ...event, [e.target.name as any]: e.target.value });
  };

  const handlePicture = (imageName: string): void => {
    setEvent({ ...event, poster: imageName });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (current === null) {
      addEvent(event);
    } else {
      updateEvent(event);
    }
    onClear();
    setEditing(false);
  };

  const onClear = () => {
    clearCurrent();
  };

  return (
    <form
      onSubmit={onSubmit}
      className={classes.container}
      noValidate
      autoComplete='off'
    >
      <CloseIcon
        className={classes.closeButton}
        onClick={() => {
          setEditing(false);
          onClear();
        }}
      />
      <div className={classes.formHeader}>
        <Typography variant='h5' component='h5' gutterBottom>
          {current ? 'Update event' : 'Add event'}
        </Typography>
      </div>
      <div className={classes.formBody}>
        <EventPicture handlePicture={handlePicture} />
        <div className={classes.formPart}>
          <TextField
            id='standard-name'
            label='Name'
            className={classes.textField}
            value={name}
            name='name'
            onChange={handleChange}
            margin='normal'
          />
          <TextField
            id='standard-name'
            label='Location'
            className={classes.textField}
            value={location}
            name='location'
            onChange={handleChange}
            margin='normal'
          />

          <TextField
            id='datetime-local'
            label='Event Time'
            type='datetime-local'
            className={classes.textField}
            value={date}
            name='date'
            margin='normal'
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='party-type'>Type</InputLabel>
            <Select
              value={type}
              onChange={handleChange}
              name='type'
              margin='dense'
            >
              <MenuItem value={'Rave'}>Rave</MenuItem>
              <MenuItem value={'Circuit'}>Circuit</MenuItem>
              <MenuItem value={'Art'}>Art</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes.formPart2}>
        {current && (
          <Button
            style={{ marginRight: '1rem', width: '50%' }}
            variant={BUTTON_VARIANTS.DEFAULT}
            onClick={onClear}
          >
            Clear
          </Button>
        )}
        <Button
          style={{ width: '50%' }}
          variant={BUTTON_VARIANTS.DEFAULT}
          type='submit'
        >
          {current ? 'Update' : 'Add'}
        </Button>
      </div>
    </form>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
      margin: '10% 5%'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: '100%'
    },

    closeButton: {
      position: 'absolute',
      top: '1.5rem',
      right: '1.5rem',
      cursor: 'pointer'
    },
    formHeader: {
      top: '1.5rem',
      left: '2.5rem',
      position: 'absolute'
    },
    formBody: {
      marginTop: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      width: '98%',
      alignItems: 'center'
    },
    formPart: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column'
    },

    formPart2: {
      marginTop: '1.5rem',
      paddingLeft: '0.7rem',
      width: '98%',
      height: '45px',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%'
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    }
  })
);

export default EventForm;

// Types
// type EventFormState = {
//   _id: string;
//   creator: string;
//   name: string;
//   date: string;
//   location: string;
//   type: string;
//   poster: string;
//   attendees = [];
// };
