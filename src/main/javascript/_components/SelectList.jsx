import React, { Component } from "react";
import { Col, Row, Checkbox } from "react-materialize";

export default class SelectList extends Component {
  constructor() {
    super();

    //TODO - do this dynamically
    this.state = {
      locations: [
        "Cabo Delgado",
        "Gaza",
        "Inhambane",
        "Manica",
        "Maputo Cidade",
        "Maputo Provincia",
        "Nampula",
        "Niassa",
        "Sofala",
        "Tete",
        "Zambezia",
      ],
      categories: [
        "CEREAIS",
        "FEIJOES",
        "LEGUMES E HORTICULAS",
        "PEIXE",
        "ANIMAIS DE CRIACAO",
        "CEMENTES E MATERIAL E PLATACAO",
        "FERTILIZANTES",
        "AGROQUIMICOS",
        "PRODUTOS VETERINARIOS",
        "EQUIPAMENTO AGRICOLA",
        "CARNES E DERIVADOS",
        "FRUTA",
      ],
    };
  }
  render() {
    let list; 
    if (this.props.listType === "location") {
      list = this.state.locations.map((location, key) => (
        <Row className="select-list-item">
          <Checkbox
            filledIn
            id={"loc"+key}
            label={location}
            value={location}
          />
        </Row>
      ));
    } else if (this.props.listType === "category") {
      list = this.state.categories.map((category, key) => (
        <Row className="select-list-item">
          <Checkbox
            filledIn
            id={"cat"+key}
            label={category}
            value={category}
          />
        </Row>
      ));
    }
    return (
      <Col className="select-list left-align" m={12}>
        <Row className="select-list-title">
          <span>{this.props.title}</span>
        </Row>
        <Row>
          {list}
        </Row>
      </Col>
    );
  }
}
