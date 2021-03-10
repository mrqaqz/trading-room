import React, {Component} from "react";
import {Col, Row, Textarea, TextInput} from "react-materialize";
import {connect} from "react-redux";
import TopBaner from "../_components/TopBanner";
import {LangContext} from "../language";

class MyDetails extends Component {
    render() {
        const {user} = this.props;

        return (<LangContext.Consumer>
                {({lang}) => (
                    <div>
                        <TopBaner
                            title={lang.myDetails.bannerTitle}
                            subtitle={lang.myDetails.bannerSubtitle}
                        />
                        <div>
                            <Row className="body">
                                <div className="container">
                                    <Col m={10} className="white">
                                        <h4 className="page-title">Client</h4>

                                        <form>
                                            <TextInput disabled id="id" label={lang.myDetails.lblId} value={user.id}/>
                                            <TextInput
                                                disabled
                                                id="email"
                                                label={lang.myDetails.lblEmail}
                                                value={user.username}
                                            />
                                            <TextInput id="name" label={lang.myDetails.lblName} value={user.name}/>
                                            <TextInput
                                                id="surname"
                                                label={lang.myDetails.lblSurname}
                                                value={user.surname}
                                            />
                                            <TextInput
                                                id="phone"
                                                label={lang.myDetails.lblPhone}
                                                value={user.phoneNumber}
                                            />
                                            <TextInput
                                                id="company"
                                                label={lang.myDetails.lblCompany}
                                                value={user.company}
                                            />
                                            <Textarea id="address" label={lang.myDetails.lblAddress}
                                                      value={user.address}/>
                                        </form>
                                    </Col>
                                </div>
                            </Row>
                        </div>
                    </div>)}
            </LangContext.Consumer>
        );
    }
}

function mapState(state) {
    const {user} = state.authentication;
    return {user};
}

const actionCreators = {};

const connectedMyDetails = connect(mapState, actionCreators)(MyDetails);
export {connectedMyDetails as MyDetails};
