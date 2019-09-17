import React, { useContext, useEffect, useState, useRef } from "react";
import EventContext from "../../context/events/eventContext";
import AuthContext from "../../context/auth/authContext";
import { Table, Divider, Tag } from "antd";
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
      //   render: text => <a>{text}</a>
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location"
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type"
    }
  ];

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
            type: event.type
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
            type: event.type
          };
          data.push(item);
        });
        return data;
      case "going":
        console.log(myFutureEvents);

        myFutureEvents.map(event => {
          const item = {
            name: event.name,
            date: event.date,
            location: event.location,
            type: event.type
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
    <Table
      id="events-table"
      style={{ overflow: "hidden" }}
      columns={columns}
      dataSource={data()}
      // footer={() => <div style={{ textAlign: "right" }}>footer</div>}
    />
  );
};

export default EventList;
