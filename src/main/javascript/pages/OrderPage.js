import React, {Component} from "react";
import {CardPanel, Col, Row, Button, Icon, Select} from "react-materialize";
import {connect} from "react-redux";
import {leadActions} from "../_actions";
import {Loader} from "../_components/Loader";
import TopBaner from "../_components/TopBanner";
import {LangContext} from "../language";

class OrderPage extends Component {
    render() {
        if (!this.props.loading) {
            let {orderId} = this.props.match.params;
            this.props.getLead(orderId);
            return <Loader/>;
        } else {
            const {lead} = this.props;

            const {user, product} = lead;

            return (<LangContext.Consumer>
                    {({lang}) => (
                        <div>
                            <TopBaner
                                title={lang.orderPage.bannerTitle}
                                subtitle={lang.orderPage.bannerSubtitle}
                            />
                            <div>
                                <Row className="body">
                                    <div className="container">
                                        <Row/>
                                        <Row className="white valign-wrapper center-align tab-title">
                                            <Col m={6}>{lang.orderPage.clientName} </Col>
                                            <Col m={6}>{lang.orderPage.productsRequested} </Col>
                                        </Row>
                                        <Row>
                                            <Col m={6}>
                                                <CardPanel className="white user-card">
                                                    <p className="left-align">
                        <span className="user-name">
                          {user.name} {user.surname}
                        </span>
                                                        <br/>
                                                        <span className="user-details">
                          <span className="user-details-title">{lang.orderPage.email}  </span>
                          <span className="user-details-info">
                            {user.username}
                          </span>
                          <br/>
                          <span className="user-details-title">{lang.orderPage.phone}  </span>
                          <span className="user-details-info">
                            {user.phoneNumber}
                          </span>
                          <br/>
                          <span className="user-details-title">{lang.orderPage.company}  </span>
                          <span className="user-details-info">
                            {user.company}
                          </span>
                          <br/>
                          <span className="user-details-title">{lang.orderPage.address}  </span>
                          <span className="user-details-info">
                            {user.address}
                          </span>
                          <br/>
                        </span>
                                                    </p>
                                                </CardPanel>
                                            </Col>
                                            <Col m={6}>
                                                <CardPanel className="white user-card">
                                                    <Row>
                                                        <Col m={6}>
                                                            <img
                                                                src={"/img/icons/" + product.category + ".svg"}
                                                                className="responsive-img"
                                                            />
                                                        </Col>
                                                        <Col m={6}>
                                                            <p className="left-align">
                                                                <span className="user-name">{product.name}</span>
                                                                <br/>
                                                                <span className="user-details-title">
                              {lang.orderPage.description}
                            </span>
                                                                <span className="user-details-info">
                              {product.description}
                            </span>
                                                                <br/>
                                                                <span
                                                                    className="user-details-title">{lang.orderPage.price} </span>
                                                                <span className="user-details-info">
                              {product.unitPrice}/{product.unit}
                            </span>
                                                                <br/>
                                                                <span className="user-details-title">
                              {lang.orderPage.quantity}
                            </span>
                                                                <span className="user-details-info">
                              {lead.qty}
                            </span>
                                                                <br/>
                                                                <span className="user-details-title">
                              {lang.orderPage.location}
                            </span>
                                                                <span className="user-details-info">
                              {product.origin}
                            </span>
                                                                <br/>
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </CardPanel>
                                            </Col>
                                        </Row>
                                    </div>
                                </Row>
                            </div>
                        </div>
                    )}
                </LangContext.Consumer>
            );
        }
    }
}

function mapState(state) {
    const {lead, loading} = state.leads;
    return {lead, loading};
}

const actionCreators = {
    getLead: leadActions.getLead,
};

const connectedOrderPage = connect(mapState, actionCreators)(OrderPage);
export {connectedOrderPage as OrderPage};
