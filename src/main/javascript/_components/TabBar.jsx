import React from "react";
import { Tab, Tabs } from "react-materialize";

export default function TabBar(props) {
  return (
    <Tabs className="tab-bar valign-wrapper">
      {/*pass titles parent object and generated the tabs programatically*/}
      <Tab title={props.date} active />
      <Tab title={props.price}></Tab>
      <Tab title={props.az}></Tab>
    </Tabs>
  );
}
