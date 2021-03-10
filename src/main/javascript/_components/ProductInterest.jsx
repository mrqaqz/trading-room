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
  TextInput,
} from "react-materialize";
import "materialize-css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { productActions } from "../_actions/product.actions";
import { LangContext } from "../language";

class Interest extends Component {
    constructor() {
        super();

        this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdatedResource = this.handleUpdatedResource.bind(this);

        this.state = {
            address: null,
            province: null,
            qty: null,
        };
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handlePlaceOrder() {
        if (
            this.state.address === null ||
            this.state.province === null ||
            this.state.qty === null
        ) {
            console.log("error");
        } else {
            this.props.placeOrder(
                this.props.product.id,
                this.state.address,
                this.props.user.id,
                this.state.province,
                this.state.qty
            );
        }
    }

    handleUpdatedResource(text) {
        this.setState({
            province: text,
        });
    }

    render() {
        const { product, key} = this.props;
        let imgsrc = "/img/icons/AGROQUIMICOS.svg";

        let modalOptions = {
            dismissible: true,
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: "10%",
            endingTop: "5%",
        };

        return (
            <LangContext.Consumer>
                {({ lang }) => (
                    <Modal
                        actions={[
                            <Button flat modal="close" node="top">
                                Close
                            </Button>,
                        ]}
                        bottomSheet={false}
                        fixedFooter={false}
                        id={key}
                        open={false}
                        options={modalOptions}
                        trigger={
                            <Button className="main100-btn">
                                Express Interest
                            </Button>
                        }>
                        <Row>
                            <Col m={6}><img src={imgsrc} alt="" className="responsive-img"/></Col>

                            <Col m={6} style={{ minHeight: "100%" }}>
                                <Row className="row"><h2 className="page-title">Product Name Here</h2></Row>
                                <br />
                                <Row>
                                    <span style={{ fontSize: 1.4 + "rem", textTransform: "capitalize", }}>Description</span>
                                    <p>Product Description Here</p>
                                </Row>
                                <Divider />
                                <Row className="row">
                                    <Textarea
                                        style={{ marginBottom: 0 + "px" }}
                                        id="delivery_address"
                                        label="Delivery address"
                                        onChange={this.handleChange}
                                        name="address"
                                    />
                                </Row>
                                <Row className="row">
                                    <Autocomplete
                                        style={{ marginTop: 0 + "px" }}
                                        title="Province"
                                        options={{
                                            onAutocomplete: (text) => {
                                            this.handleUpdatedResource(text);
                                        },
                                        data: {
                                            Cabo_Delgado: null,
                                            Gaza: null,
                                            Inhambane: null,
                                            Manica: null,
                                            Maputo_Cidade: null,
                                            Maputo_Provincia: null,
                                            Nampula: null,
                                            Niassa: null,
                                            Sofala: null,
                                            Tete: null,
                                            Zambezia: null,
                                            },
                                        }}
                                        onChange={this.handleChange}
                                        name="province"
                                    />
                                </Row>
                                <Divider />
                                <Row className="row">
                                    <label>Weight(Kgs)</label>
                                    <TextInput
                                        id="qty"
                                        name="qty"
                                        type="number"
                                        label="Quantity"
                                        onChange={this.handleChange}
                                    />
                                </Row>
                                <h3 className="price">000 MT/Kg</h3>
                                <Divider />
                                <Row className="valign-wrapper" style={{ marginTop: 10 + "px" }}>
                                    {this.props.loggedIn ? (
                                    <Button
                                        className="main100-ntn"
                                        onClick={this.handlePlaceOrder}
                                    >
                                        Confirm Interest
                                    </Button>
                                    ) : (
                                        <span>
                                            Please <Link to="/login">login</Link> to place order
                                        </span>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </Modal>
                )}
            </LangContext.Consumer>
        );
    }
}

function mapState(state) {
    return state;
}

const actionCreators = {getAll: productActions.getAll,};

const connectedCard = connect(mapState, actionCreators)(Interest);
export { connectedCard as Interest };
