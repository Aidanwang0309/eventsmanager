import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from 'src/context';
import { useEventAction, useEventState, useAuthState } from 'src/shared/hooks';
import { Row, Col, List, Card } from 'antd';
import _ from 'lodash';
import { formatDate } from 'src/shared/utils';

const EventList = props => {
  const eventState = useEventState();
  const { events } = eventState;

  const eventAction = useEventAction();
  const { getEvents } = eventAction;

  const { user } = useAuthState();

  const getEventRef = useRef(getEvents);

  useEffect(() => {
    getEventRef.current();
  }, []);

  const data = () => {
    const data = [];
    const { list } = props;
    const myCreatedEvents = events.filter(event => event.creator === user._id);

    const myGoingEvents = user.goingEvents;
    const myPastEvents = myGoingEvents.filter(
      event => formatDate(event.date).isPast
    );
    const myFutureEvents = myGoingEvents.filter(
      event => formatDate(event.date).isFuture
    );

    switch (list) {
      case 'myEvents':
        myCreatedEvents.map(event => {
          const item = {
            name: event.name,
            date: event.date,
            location: event.location,
            type: event.type,
            poster: event.poster
          };
          data.push(item);
        });
        return data;
      case 'archived':
        myPastEvents.map(event => {
          const item = {
            name: event.name,
            date: event.date,
            location: event.location,
            type: event.type,
            poster: event.poster
          };
          data.push(item);
        });
        return data;
      case 'going':
        myFutureEvents.map(event => {
          const item = {
            name: event.name,
            date: event.date,
            location: event.location,
            type: event.type,
            poster: event.poster
          };
          data.push(item);
        });
        return data;

      default:
        events
          .filter(event => event.creator === user._id)
          .map(event => {
            const item = {
              name: event.name,
              date: event.date,
              location: event.location,
              type: event.type
            };
            data.push(item);
          });
        return data;
    }
  };

  return (
    <List
      id="events-list"
      grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
      itemLayout="horizontal"
      dataSource={data()}
      renderItem={item => (
        <List.Item>
          <Card
            style={{
              background: 'rgba(116, 119, 132, 0.24)',
              border: 'none'
            }}
            title={item.name}
          >
            <Row gutter={16} style={{ maxHeight: '70px', overflow: 'hidden' }}>
              <Col xs={0} sm={10} md={10} lg={10} xl={10}>
                <img
                  style={{ height: '100%', width: '100%' }}
                  // src={`${window.location.protocol}//${window.location.hostname}/api/file/${item.poster}`}
                  src={`http://localhost:5000/api/file/${item.poster}`}
                  alt="event poster"
                />
              </Col>
              <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                <p>{formatDate(item.date).formatedCardDate}</p>
                <p>{item.location}</p>
              </Col>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default EventList;
