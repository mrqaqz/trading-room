import React, {Component} from "react";
import {connect} from "react-redux";

import {Row, Col, CardPanel, Button} from "react-materialize";
import {Link} from "react-router-dom";
import TopBaner from "../_components/TopBanner";
import {LangContext} from "../language";

class AdminDashboard extends Component {
    constructor() {
        super();
        this.state = {
            title: "Tools",
            subtitle: "Tools to manage Appload Traderoom users",
            button: false,
        };
    }

    render() {
        return (
            <LangContext.Consumer>
                {({lang}) => (
                    <div>
                        <TopBaner title={this.state.title} subtitle={this.state.subtitle} button={this.state.button}/>
                        <Row className="body">
                            <div className="container">
                                <Row>
                                    <Row>
                                        <Col m={3}>
                                            <Link to="/manageOrders">
                                                <CardPanel className="white">
                                                    <img src="/img/icons/orders.svg" alt="orders"/>

                                                    <span>{lang.adminDashboard.orders}</span>
                                                </CardPanel>
                                            </Link>
                                        </Col>
                                        <Col m={3}>
                                            <Link to="/manageUsers">
                                                <CardPanel className="white">
                                                    <img src="/img/icons/user.svg" alt="user"/>

                                                    <span>{lang.adminDashboard.user}</span>
                                                </CardPanel>
                                            </Link>
                                        </Col>

                                        <Col m={3}>
                                            <Link to="/manageProducts">
                                                <CardPanel className="white">
                                                    <img src="/img/icons/userlist.svg" alt="userlist"/>

                                                    <span>{lang.adminDashboard.userList}</span>
                                                </CardPanel>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Row>
                            </div>
                        </Row>
                    </div>
                )}
            </LangContext.Consumer>
        );
    }
}

function mapState(state) {
    return state;
}

const actionCreators = {};

const connectedAdminDashboard = connect(
    mapState,
    actionCreators
)(AdminDashboard);
export {connectedAdminDashboard as AdminDashboard};
