import React from "react";
import { Col, Row } from "react-materialize";
import Header from "./Header";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { UserIcon } from "./UserIcon";
import LanguageSwitch from "./LanguageSwitch";

function TopBaner(props) {
  const { title, subtitle } = props;

  return (
    <Row style={{ marginBottom: 0 + "px" }}>
      <Col m={2} className="center">
        <Logo />
      </Col>
      <Col m={8}>
        <Row style={{ minHeight: 30 + "px" }} />
        <Navigation />

        <Header title={title} subtitle={subtitle} />
      </Col>
      <Col m={2}>
        <UserIcon />
        <LanguageSwitch />
      </Col>
    </Row>
  );
}

export default TopBaner;
