import React from "react";
import logo from "../img/logo-appload.png";
import { Link } from "react-router-dom";

export default function Logo(props) {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="Appload logo"
        className={"responsive-img nav-logo " + props.className}
      />
    </Link>
  );
}
