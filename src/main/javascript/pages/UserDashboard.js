import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {Row, Col, CardPanel} from "react-materialize";
import TopBaner from "../_components/TopBanner";
import {LangContext} from "../language";

class UserDashboard extends Component {
    render() {
        return (
            <LangContext.Consumer>
                {({lang}) => (
                    <div>
                        <TopBaner
                            title={lang.userDashboard.bannerTitle}
                            subtitle={lang.userDashboard.bannerSubtitle}
                            button={false}
                        />
                        <Row className="body">
                            <div className="container">
                                <Row>
                                    <CardPanel className="white" style={{textAlign: "left"}}>
                                        <h2 className="page-title">
                                            {this.props.name} {this.props.surname}
                                        </h2>
                                        <h5 className="page-subtitle">{this.props.email}</h5>
                                    </CardPanel>
                                    <Row>
                                        <Col m={3}>
                                            <Link to="/myOrders">
                                                <CardPanel className="white">
                                                    <img src="/img/icons/user.svg" alt="user"/>
                                                    <span>{lang.userDashboard.myOrders}</span>
                                                </CardPanel>
                                            </Link>
                                        </Col>
                                        <Col m={3}>
                                            <Link to="/myDetails">
                                                <CardPanel className="white">
                                                    <img src="/img/icons/userlist.svg" alt="userlist"/>
                                                    <span>{lang.userDashboard.accountDetails}</span>
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
    const {user} = state.authentication;
    return {user};
}

const actionCreators = {};

const connectedUserDashboard = connect(mapState, actionCreators)(UserDashboard);
export {connectedUserDashboard as UserDashboard};
