import React, {Component} from "react";
import {Col, Row, Textarea, TextInput} from "react-materialize";
import {connect} from "react-redux";
import {userActions} from "../_actions";
import {Loader} from "../_components/Loader";
import TopBaner from "../_components/TopBanner";
import {LangContext} from "../language";

class UserPage extends Component {
    render() {
        if (!this.props.loading) {
            let {userId} = this.props.match.params;
            this.props.getUser(userId);
            return <Loader/>;
        } else {
            const {user} = this.props;

            return (
                <LangContext.Consumer>
                    {({lang}) => (
                        <div>
                            <TopBaner title={lang.userPage.bannerTitle} subtitle={lang.userPage.bannerSubtitle}/>
                            <div>
                                <Row className="body">
                                    <div className="container">
                                        <Col m={10} className="white">
                                            <h4 className="page-title">{lang.userPage.client}</h4>

                                            <form>
                                                <TextInput disabled id="id" label={lang.userPage.lblId}
                                                           value={user.id}/>
                                                <TextInput
                                                    disabled
                                                    id="email"
                                                    label={lang.userPage.lblEmail}
                                                    value={user.username}
                                                />
                                                <TextInput id="name" label={lang.userPage.lblName} value={user.name}/>
                                                <TextInput
                                                    id="surname"
                                                    label={lang.userPage.lblSurname}
                                                    value={user.surname}
                                                />
                                                <TextInput
                                                    id="phone"
                                                    label={lang.userPage.lblPhone}
                                                    value={user.phoneNumber}
                                                />
                                                <TextInput
                                                    id="company"
                                                    label={lang.userPage.lblCompany}
                                                    value={user.company}
                                                />
                                                <Textarea
                                                    id="address"
                                                    label={lang.userPage.lblAddress}
                                                    value={user.address}
                                                />
                                                <TextInput id="role" label={lang.userPage.lblRole}
                                                           value={user.userRole}/>
                                                <TextInput
                                                    disabled
                                                    id="confirmed"
                                                    label={lang.userPage.lblConfirmed}
                                                    value={user.confirmed}
                                                />
                                            </form>
                                        </Col>
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
    const {user, loading} = state.users;
    return {user, loading};
}

const actionCreators = {
    getUser: userActions.getOne,
};

const connectedOrderPage = connect(mapState, actionCreators)(UserPage);
export {connectedOrderPage as UserPage};
