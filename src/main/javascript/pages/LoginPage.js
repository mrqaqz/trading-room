import React from "react";
import {Button, Col, TextInput} from "react-materialize";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {userActions} from "../_actions";
import {Loader} from "../_components/Loader";
import picture from "../img/appload-icon-black.svg";
import {LangContext} from "../language";
import LanguageSwitch from "../_components/LanguageSwitch";

class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const {loggingIn, loggedIn} = this.props;
        const {username, password} = this.state;

        if (loggingIn) {
            return <Loader/>;
        } else if (loggedIn) {
            this.props.history.push("/");
        }
        // else {
        return (
            <LangContext.Consumer>
                {({lang}) => (
                    <main>
                        <div className="container account">
                            <div className="signin block z-depth-5">
                                <Col l = {6} className="hide-on-med-and-down">
                                    <div className="signin-pic">
                                        <img src={picture} align="Appload"/>
                                    </div>
                                </Col>

                                <Col s = {12} m = {6}>
                                    <LanguageSwitch className="right p-b-15"/>
                                    <span className="form-title">Login</span>
                                    <form name="form" onSubmit={this.handleSubmit} className="account-form">

                                        {this.props.error ? <span className="message-error">{lang.loginPage.errorMessage}</span> : null}
                                        <TextInput
                                            className="input100"
                                            label="Email"
                                            type="email"
                                            id="username"
                                            onChange={this.handleChange}
                                            name="username"
                                            value={username}
                                            validate
                                        />

                                        <TextInput
                                            className="input100"
                                            label="Password"
                                            id="password"
                                            type="password"
                                            onChange={this.handleChange}
                                            name="password"
                                            value={password}
                                            validate
                                        />

                                        <div className="center p-t-12">
                                            <a className="txt3" href="/passwordReset">{lang.loginPage.forgotPassword}?</a>
                                        </div>

                                        <div className="center p-t-6">
                                            <a className="txt3" href="/register">
                                                {lang.loginPage.register}
                                                <i className="fas fa-arrow-right m-l-5" aria-hidden="true"></i>
                                            </a>
                                        </div>

                                        <div className="container-main100-btn">
                                             <Button className="main100-btn" type="submit">{lang.loginPage.login}</Button>
                                        </div>
                                    </form>
                                </Col>
                            </div>
                        </div>
                    </main>
                )}
            </LangContext.Consumer>
        );
    }
}

// }

function mapState(state) {
    const {loggingIn, loggedIn, error} = state.authentication;
    return {loggingIn, loggedIn, error};
}

const actionCreators = {
    login: userActions.login,
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export {connectedLoginPage as LoginPage};
