import React from "react";
import NotificationCard from "./NotificationCard";

export default function NotificationItems(props) {
  const notificationList = props.notifications.map((notification, key) => (
    <NotificationCard key={key} notification={notification} approveAction={props.approveAction} rejectAction={props.rejectAction}/>
  ));
  // : null
  return <div>{notificationList}</div>;

}
