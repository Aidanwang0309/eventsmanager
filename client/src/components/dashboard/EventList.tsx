import React, { useEffect } from 'react';
import { useEventAction, useEventState, useAuthState } from 'src/shared/hooks';
import { Row, Col, List, Card } from 'antd';
import _ from 'lodash';
import { formatDate } from 'src/shared/utils';
import { IEvent } from 'src/context/events/eventTypes';

type IData = {
  name: string;
  date: string;
  location: string;
  type: string;
  poster: string;
};

const EventList = (props: { list: string }) => {
  const { events } = useEventState();
  const { getEvents } = useEventAction();
  const { user } = useAuthState();

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  const data = (): IData[] => {
    const { list } = props;

    const eventsMap = user && {
      going: user.goingEvents.filter(event => {
        return formatDate(event.date).isFuture;
      }),
      myEvents: events.filter(event => event.creator === user._id),
      archived: user.goingEvents.filter(event => formatDate(event.date).isPast)
    };

    const data = (eventsMap as any)[list].reduce(
      (acc: IData[], cur: IEvent) => [
        ...acc,
        {
          name: cur.name,
          date: cur.date,
          location: cur.location,
          type: cur.type,
          poster: cur.poster
        }
      ],
      []
    );
    return data;
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
              background: 'rgba(116, 119, 132, 0.07)',
              border: 'none'
            }}
            title={item.name}
          >
            <Row gutter={16} style={{ maxHeight: '70px', overflow: 'hidden' }}>
              <Col xs={0} sm={10} md={10} lg={10} xl={10}>
                <img
                  style={{ height: '100%', width: '100%' }}
                  src={`${window.location.protocol}//${window.location.hostname}/api/file/${item.poster}`}
                  // src={`http://localhost:5000/api/file/${item.poster}`}
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
