import React, { useState } from "react";
import { Tabs } from "antd";
import EventList from "./EventList";

const Events = () => {
  const { TabPane } = Tabs;
  const [list, setList] = useState("going");

  const handleChange = key => {
    setList(key);
  };

  return (
    <div id="events-tab">
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
