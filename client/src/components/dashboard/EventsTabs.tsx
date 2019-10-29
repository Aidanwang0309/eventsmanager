import React, { useState } from 'react';
import { Tabs } from 'antd';
import EventList from './EventList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const Events = () => {
  const classes = useStyles();
  const { TabPane } = Tabs;
  const [list, setList] = useState('going');

  const handleChange = (key: string) => {
    setList(key);
  };

  return (
    <div id="events-tab" className={classes.eventsTab}>
      <Tabs defaultActiveKey="Going" onChange={handleChange}>
        <TabPane tab="Going" key="going">
          <EventList list={list} />
        </TabPane>
        <TabPane tab="My Events" key="myEvents">
          <EventList list={list} />
        </TabPane>
        <TabPane tab="Archived" key="archived">
          <EventList list={list} />
        </TabPane>
      </Tabs>
      ,
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    eventsTab: {
      width: '100%',
      padding: '2rem 1rem 0 5rem',
      margin: '0 auto',
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.up('sm')]: {
        width: '95%',
        padding: '2rem 1rem 0 5rem'
      },
      '& div': {
        color: theme.palette.text.primary
      },
      '& p': {
        color: theme.palette.text.primary
      },
      '& a': {
        color: theme.palette.text.primary
      }
    }
  })
);

export default Events;
