import React, { useContext, useEffect, useState, useRef } from "react";
import EventContext from "../../context/events/eventContext";
import AuthContext from "../../context/auth/authContext";
import { Row, Col, List, Card } from "antd";
import _ from "lodash";
// import { userInfo } from "os";
import FormateDate from "../../utils/formateDate";

const EventList = props => {
  const eventContext = useContext(EventContext);
  const { events, getEvents } = eventContext;

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  const data = () => {
    let data = [];
    const { list } = props;
    let myCreatedEvents = events.filter(event => event.creator === user._id);

    let myGoingEvents = user.goingEvents;
    let myPastEvents = myGoingEvents.filter(
      event => FormateDate(event.date).isPast
    );
    let myFutureEvents = myGoingEvents.filter(
      event => FormateDate(event.date).isFuture
    );

    switch (list) {
      case "myEvents":
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
      case "archived":
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
      case "going":
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
      grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 }}
      itemLayout="horizontal"
      dataSource={data()}
      renderItem={item => (
        <List.Item>
          <Card
            style={{
              background: "rgba(116, 119, 132, 0.24)",
              border: "none"
            }}
            title={item.name}
          >
            <Row gutter={16}>
              <Col xs={0} sm={10} md={10} lg={10} xl={10}>
                <img
                  style={{ height: "100%", width: "100%" }}
                  image={`${window.location.protocol}//${window.location.hostname}/api/file/${item.poster}`}
                  // src={`http://localhost:5000/api/file/${item.poster}`}
                  alt="event poster"
                />
              </Col>
              <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                <p>{FormateDate(item.date).formatedCardDate}</p>
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
