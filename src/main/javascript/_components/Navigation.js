import "materialize-css";
import React from "react";
import { Icon, Navbar, NavItem, Row } from "react-materialize";


export default function Navigation() {
  return (
    <Row className="valign-wrapper">
      <Navbar
        alignLinks="left"
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: "left",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true,
        }}
      >
        <NavItem href="#">Getting started</NavItem>
        <NavItem href="#">Carrier</NavItem>
        <NavItem href="#">Shipper</NavItem>
        <NavItem href="/" className="active">
          Trading room
        </NavItem>
      </Navbar>
      
    </Row>
  );
}
