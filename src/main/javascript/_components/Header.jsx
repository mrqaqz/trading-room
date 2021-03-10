import React from "react";
import { Col, Row } from "react-materialize";

export default function Header(props) {
  const { title, subtitle } = props;
  return (
    <Row className="valign-wrapper">
      <Col m={10}>
        <h1 className="page-title">{title}</h1>
        <h4 className="page-subtitle">{subtitle}</h4>
      </Col>
    </Row>
  );
}
