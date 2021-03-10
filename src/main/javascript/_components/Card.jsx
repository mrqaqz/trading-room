import React, { Component } from "react";
import {
  Autocomplete,
  Button,
  Card,
  CardTitle,
  Col,
  Divider,
  Icon,
  Modal,
  Row,
  Textarea,
} from "react-materialize";
import "materialize-css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { productActions } from "../_actions/product.actions";
import { LangContext } from "../language";

class ItemCard extends Component {
    render() {
        const { product, key } = this.props;
        let imgsrc = "/img/icons/" + product.category + ".svg";

        return (
            <LangContext.Consumer>
                {({ lang }) => (
                    <Col l={3} m={6} s={12}>
                        <Card
                            key={key}
                            actions={[
                                <Link to={"/products/details/" + product.id} className="main100-btn">
                                    {lang.homepage.button}
                                </Link>
                            ]}
                            header={<CardTitle key={key} image={imgsrc} />}
                        >
                            <span className="product-name">{product.name}</span> <br />
                            <span className="product-price">{product.unitPrice} Mts</span>
                            <span className="product-unit"> / {product.unit}</span> <br />
                            <span className="product-quantity">{product.quantity} {product.unit}</span>
                        </Card>
                    </Col>
                )}
            </LangContext.Consumer>
        );
    }
}

function mapState(state) {
    return state;
}

const actionCreators = {getAll: productActions.getAll,};

const connectedCard = connect(mapState, actionCreators)(ItemCard);
export { connectedCard as ItemCard };
