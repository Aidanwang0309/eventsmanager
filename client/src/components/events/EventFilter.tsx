import React, { useState, useContext, ChangeEvent } from 'react';
import { useEventAction } from 'src/shared/hooks';

import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, makeStyles, Theme, createStyles } from '@material-ui/core';

const EventFilter = () => {
  const classes = useStyles();

  const eventAction = useEventAction();
  const { filterEvents, clearFilter } = eventAction;

  const [text, setText] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setText(e.target.value);
      filterEvents(text);
    } else {
      clearFilter();
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        onChange={onChange}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'Search' }}
      />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200
        }
      }
    }
  })
);

export default EventFilter;
