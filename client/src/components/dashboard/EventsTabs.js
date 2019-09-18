import React, { useState } from "react";
import { Tabs } from "antd";
import EventList from "./EventList";
import { useMediaQuery } from "react-responsive";

const Events = () => {
  const { TabPane } = Tabs;
  const [list, setList] = useState("going");

  const handleChange = key => {
    setList(key);
  };

  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1224px)"
  });

  return (
    <div
      id="events-tab"
      style={
        isTabletOrMobileDevice
          ? { width: "95%", padding: "2rem 1rem 0 5rem" }
          : null
      }
    >
      <Tabs defaultActiveKey="Going" onChange={handleChange}>
        <TabPane tab="Going" key="going">
          <EventList list={list} />
        </TabPane>
        <TabPane tab="Archived" key="archived">
          <EventList list={list} />
        </TabPane>
        <TabPane tab="My Events" key="myEvents">
          <EventList list={list} />
        </TabPane>
      </Tabs>
      ,
    </div>
  );
};

export default Events;
