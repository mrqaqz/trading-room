import React, {Component} from "react";
import {Row, Col, CardPanel} from "react-materialize";
import {connect} from "react-redux";
import TopBaner from "../_components/TopBanner";
import {leadActions} from "../_actions";
import {LangContext} from "../language";

class MyOrders extends Component {
    constructor() {
        super();

        this.state = {
            pageNumber: 0,
        };
    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        this.props.getByUser(this.props.user.id, this.state.pageNumber);
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       


    render() {
        const {userleads, user} = this.props;

        let leadList = userleads.content.map((lead, key) => (
            <Row>
                <Col m={6}>
                    <img
                        src={"/img/icons/" + lead.product.category + ".svg"}
                        className="responsive-img"
                    />
                </Col>
                <Col m={6}>
                    <p className="left-align">
                        <span className="user-name">{lead.product.name}</span> <br/>
                        <span className="user-details-title">description:</span>
                        <span className="user-details-info">
              {lead.product.description}
            </span>
                        <br/>
                        <span className="user-details-title">price: </span>
                        <span className="user-details-info">
              {lead.product.unitPrice}/{lead.product.unit}
            </span>
                        <br/>
                        <span className="user-details-title">location: </span>
                        <span className="user-details-info">{lead.product.origin}</span>
                        <br/>
                    </p>
                </Col>
            </Row>
        ));

        return (<LangContext.Consumer>
                {({lang}) => (
                    <div>
                        <TopBaner
                            title={lang.myOrders.bannerTitle}
                            subtitle={lang.myOrders.bannerSubtitle}
                            button={false}
                        />
                        <Row className="body">
                            <div className="container">
                                <Row/>
                                <Row className="white valign-wrapper center-align tab-title">
                                    <Col m={4}>{lang.myOrders.clientName}</Col>
                                    <Col m={8}>{lang.myOrders.productsRequested}</Col>
                                </Row>
                                <Row>
                                    <Col m={4}>
                                        <CardPanel className="white user-card">
                                            <p className="left-align">
                    <span className="user-name">
                      {user.name} {user.surname}
                    </span>
                                                <br/>
                                                <span className="user-details">
                      <span className="user-details-title">{lang.myOrders.email} </span>
                      <span className="user-details-info">{user.username}</span>
                      <br/>
                      <span className="user-details-title">{lang.myOrders.phone} </span>
                      <span className="user-details-info">
                        {user.phoneNumber}
                      </span>
                      <br/>
                      <span className="user-details-title">{lang.myOrders.company} </span>
                      <span className="user-details-info">{user.company}</span>
                      <br/>
                      <span className="user-details-title">{lang.myOrders.address} </span>
                      <span className="user-details-info">{user.address}</span>
                      <br/>
                    </span>
                                            </p>
                                        </CardPanel>
                                    </Col>
                                    <Col m={8}>
                                        <CardPanel className="white user-card">{leadList}</CardPanel>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                    </div>)}
            </LangContext.Consumer>
        );
    }
}

function mapState(state) {
    const {user} = state.authentication;
    const {userleads} = state.leads;
    return {user, userleads};
}

const actionCreators = {
    getByUser: leadActions.getByUser,
};

const connectedMyOrders = connect(mapState, actionCreators)(MyOrders);
export {connectedMyOrders as MyOrders};
