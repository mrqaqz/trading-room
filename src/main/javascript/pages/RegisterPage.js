import React from "react";
import {Controller, useForm} from "react-hook-form";
import {Button, Row, Col, Select, Textarea, TextInput} from "react-materialize";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {userActions} from "../_actions";
import Logo from "../_components/Logo";
import {Loader} from "../_components/Loader";
import {LangContext} from "../language";

export default function RegisterPage(props) {
    const {control, handleSubmit, errors} = useForm();
    const onSubmit = (data) => props.register(data);

    if (props.reregistering) {
        return <Loader/>;
    }

    if (props.registered) {
        props.history.push("/userdashboard")
    }

    return (
        <LangContext.Consumer>
            {({lang}) => (
                <Row className="container body">
                    <div className="signup block z-depth-5">
                        <Col m={12}>
                            <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
                                <span className="form-title">{lang.registerPage.title}</span>
                                <span className="form-subtitle">{lang.registerPage.subtitle}</span>
                                <br/>
                                {/* -- Personal Details Bloc -- */}
                                <span className="txt4">Personal Details</span>

                                <Row m={12} className="row">
                                    <Col m={6}>
                                        <Controller
                                            control={control}
                                            label={lang.registerPage.name}
                                            as={TextInput}
                                            className="input100"
                                            defaultValue=""
                                            name="name"
                                            id="name"
                                            rules={{required: true}}
                                            validate
                                        />
                                        <span className="message-error">{errors.name && lang.registerPage.errorName}{" "}</span>
                                    </Col>
                                    <Col m={6}>
                                        <Controller
                                            control={control}
                                            label={lang.registerPage.surname}
                                            as={TextInput}
                                            defaultValue=""
                                            name="surname"
                                            id="surname"
                                            rules={{required: true}}
                                            validate
                                        />
                                        <span className="message-error">{errors.surname && lang.registerPage.errorSurname}{" "}</span>
                                    </Col>
                                </Row>

                                <Row m={12} className="row">
                                    <Col m={6}>
                                        <Controller
                                            control={control}
                                            label={lang.registerPage.phone}
                                            as={TextInput}
                                            className="input100"
                                            defaultValue=""
                                            name="phoneNumber"
                                            id="phone"
                                            type="tel"
                                            rules={{
                                                required: true,
                                                pattern: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm,
                                            }}
                                            validate
                                        />
                                        <span className="message-error">{errors.phoneNumber && lang.registerPage.errorPhone}{" "}</span>
                                    </Col>
                                </Row>

                                {/* -- Company Details Bloc -- */}
                                <span className="txt4">Company Details</span>
                                <Row m={12} className="row">
                                    <Col m={6}>
                                        <Controller
                                            control={control}
                                            label={lang.registerPage.companyName}
                                            as={TextInput}
                                            className="input100"
                                            defaultValue=""
                                            name="company_name"
                                            id="company_name"
                                        />
                                    </Col>
                                    <Col m={6}>
                                        <Controller
                                            control={control}
                                            label={lang.registerPage.companyNuit}
                                            as={TextInput}
                                            className="input100"
                                            defaultValue=""
                                            name="company_nuit"
                                            id="company_nuit"
                                        />
                                    </Col>
                                </Row>

                                {/* -- Address Details Bloc -- */}
                                <span className="txt4">Address Details</span>
                                <Row m={12} className="row">
                                    <Col s = {12} m = {6}>
                                    <Controller
                                        control={control}
                                        label={lang.registerPage.address}
                                        as={TextInput}
                                        className="input100"
                                        defaultValue=""
                                        name="address"
                                        id="address"
                                        validate
                                    />
                                    <span className="message-error">{errors.address && lang.registerPage.errorAddress}{" "}</span>
                                    </Col>
                                    <Col m={6}>
                                        <Controller
                                            as={Select}
                                            control={control}
                                            name="provincia"
                                            id="provincia"
                                            multiple={false}
                                            onChange={function noRefCheck() {
                                            }}
                                            options={{
                                                classes: "",
                                                dropdownOptions: {
                                                    alignment: "left",
                                                    autoTrigger: true,
                                                    closeOnClick: true,
                                                    constrainWidth: false,
                                                    coverTrigger: false,
                                                    hover: false,
                                                    inDuration: 150,
                                                    onCloseEnd: null,
                                                    onCloseStart: null,
                                                    onOpenEnd: null,
                                                    onOpenStart: null,
                                                    outDuration: 250,
                                                },
                                            }}
                                            value="">

                                            <option disabled value="">
                                               {lang.registerPage.provinceTitle}
                                            </option>
                                            {/** find a way to get these dynamically */}
                                            <option value="Cabo_Delgado">Cabo Delgado</option>
                                            <option value="Gaza">Gaza</option>
                                            <option value="Inhambane">Inhambane</option>
                                            <option value="Manica">Manica</option>
                                            <option value="Maputo_cidade">Maputo (Cidade)</option>
                                            <option value="Maputo_Provincia">
                                                Maputo (Prov&iacute;ncia)
                                            </option>
                                            <option value="Nampula">Nampula</option>
                                            <option value="Niassa">Niassa</option>
                                            <option value="Sofala">Sofala</option>
                                            <option value="Tete">Tete</option>
                                            <option value="Zambezia">Zamb&eacute;zia</option>
                                        </Controller>
                                    </Col>
                                </Row>

                                <Row m={12} className="row">
                                    <Col m={6}>
                                        <Controller
                                            control={control}
                                            label={lang.registerPage.country}
                                            as={TextInput}
                                            className="input100"
                                            defaultValue={lang.registerPage.countryDefault}
                                            enable="false"
                                            name="country"
                                            id="country"
                                        />
                                    </Col>
                                </Row>

                                {/* -- Login Details Bloc -- */}
                                <span className="txt4">Login Details</span>
                                <Row m={12} className="row">
                                    <Col m={6}>
                                        <Controller
                                            control={control}
                                            label={lang.registerPage.email}
                                            as={TextInput}
                                            email
                                            defaultValue=""
                                            name="username"
                                            id="email"
                                            rules={{
                                                required: true,
                                                // pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                                            }}
                                            validate
                                        />
                                        <span className="message-error">{errors.email && lang.registerPage.errorEmail}{" "}</span>
                                    </Col>
                                </Row>
                                <Row m={12} className="row">
                                    <Col m={6}>
                                        <Controller
                                            control={control}
                                            label={lang.registerPage.password}
                                            as={TextInput}
                                            password
                                            name="password"
                                            id="password"
                                            rules={{
                                                required: true,
                                                // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            }}
                                            validate
                                        />
                                        <span className="message-error">{errors.password && lang.registerPage.errorPassword}{" "}</span>
                                    </Col>
                                    <Col m={6}>
                                        <Controller
                                            control={control}
                                            label={lang.registerPage.confirmPassword}
                                            as={TextInput}
                                            className="input100"
                                            password
                                            name="confirm_password"
                                            id="confirm_password"
                                            rules={{
                                                required: true,
                                                // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            }}
                                            validate
                                        />
                                        <span className="message-error">{errors.password && lang.registerPage.errorConfirmPassword}{" "}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    {lang.registerPage.hasAccount}{" "}
                                    <Link to="/login" className="red-text">
                                        {lang.registerPage.signIn}
                                    </Link>
                                </Row>
                                <Row className="row">
                                    <div className="container-main100-btn">
                                        <Button
                                            className="main100-btn"
                                            type="submit">
                                            {lang.registerPage.signUp}
                                        </Button>
                                    </div>
                                </Row>
                            </form>
                        </Col>
                    </div>
                </Row>
            )}
        </LangContext.Consumer>
    );
}

function mapState(state) {
    const {reregistering, registered} = state.registration;
    return {reregistering, registered};
}

const actionCreators = {
    register: userActions.register,
};

const connectedLoginPage = connect(mapState, actionCreators)(RegisterPage);
export {connectedLoginPage as RegisterPage};