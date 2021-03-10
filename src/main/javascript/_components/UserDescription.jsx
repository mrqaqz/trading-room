import React from "react";

export default function UserDescription(props) {
  const { user } = props;

  return (
    <ol>
      <li>User name:-- {user.name}</li>
      <li>User surname:-- {user.surname}</li>
      <li>User phoneNumber:-- {user.phoneNumber}</li>
      <li>User email:-- {user.email}</li>
      <li>User address:-- {user.address}</li>
      <li>User company:-- {user.company}</li>
      <li>User role:-- {user.role}</li>
      <li>User approved:-- {user.approved.toString()}</li>
      <li>User name:-- {user.name}</li>
    </ol>
  );
}
