import React, { Component } from "react";
import { Button, Divider, Dropdown, Icon } from "react-materialize";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { userActions } from "../_actions";

class UserIcon extends Component {
  constructor() {
    super();

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    let dropdownOptions = {
      alignment: "left",
      autoTrigger: true,
      closeOnClick: true,
      constrainWidth: false,
      container: null,
      coverTrigger: false,
      hover: false,
      inDuration: 150,
      onCloseEnd: null,
      onCloseStart: null,
      onOpenEnd: null,
      onOpenStart: null,
      outDuration: 250,
    };

    let { user } = this.props;

    if (this.props.loggedIn) {
      switch (user.userRole) {
        case "SYS_ADMIN":
          return (
            <Dropdown
              id="Dropdown_6"
              options={dropdownOptions}
              trigger={
                <Button
                  node="button"
                  waves="light"
                  className="valign-wrapper"
                  flat
                >
                  <Icon right className="user-icon">
                    person
                  </Icon>
                  {user.name}
                </Button>
              }
            >
              <a onClick={this.handleLogOut}>Log out</a>

              <Divider />

              <Link to="/admindashboard">admindashboard</Link>
              <Link to="/userdashboard">userdashboard</Link>
              <Link to="/publish">Publish product</Link>
            </Dropdown>
          );
        case "SELLER":
          return (
            <Dropdown
              id="Dropdown_6"
              options={dropdownOptions}
              trigger={
                <Button
                  node="button"
                  waves="light"
                  className="valign-wrapper"
                  flat
                >
                  <Icon right className="user-icon">
                    person
                  </Icon>
                  {user.name}
                </Button>
              }
            >
              <a onClick={this.props.logout}>Log out</a>

              <Divider />

              <Link to="/userdashboard">userdashboard</Link>
              <Link to="/publish">Publish product</Link>
            </Dropdown>
          );
        case "BUYER":
          return (
            <Dropdown
              id="Dropdown_6"
              options={dropdownOptions}
              trigger={
                <Button
                  node="button"
                  waves="light"
                  className="valign-wrapper"
                  flat
                >
                  <Icon right className="user-icon">
                    person
                  </Icon>
                  {user.name}
                </Button>
              }
            >
              <a onClick={this.props.logout}>Log out</a>

              <Divider />

              <Link to="/userdashboard">userdashboard</Link>
            </Dropdown>
          );
      }
    } else {
      return (
        <Dropdown
          id="Dropdown_6"
          options={dropdownOptions}
          trigger={
            <Button node="button" waves="light" className="valign-wrapper" flat>
              <Icon right className="user-icon">
                person
              </Icon>
              My account
            </Button>
          }
        >
          <Link to="/login">Log In</Link>
          <Link to="/register">Register</Link>

          {/**Delete this later - in here for dev purposes only 
        <Divider />
        <Link to="/admindashboard">admindashboard</Link>
        <Link to="/userdashboard">userdashboard</Link>
        <Link to="/publish">Publish product</Link>
        */}
        </Dropdown>
      );
    }
  }
}

function mapState(state) {
  const { loggedIn, user } = state.authentication;

  return {
    loggedIn,
    user,
  };
}

const actionCreators = {
  logout: userActions.logout,
};

const connectedUserIcon = withRouter(
  connect(mapState, actionCreators)(UserIcon)
);

export { connectedUserIcon as UserIcon };
