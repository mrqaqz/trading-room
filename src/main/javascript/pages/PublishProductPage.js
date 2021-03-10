import React from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, Row, Select, TextInput, Col, Button} from "react-materialize";
import { connect } from "react-redux";
import TopBaner from "../_components/TopBanner";
import { LangContext } from "../language";
import { productActions } from "../_actions";

function PublishProductPage(props) {
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = (product) => props.register(product);

    return (
        <LangContext.Consumer>
            {({ lang }) => (
                <div>
                    <TopBaner
                        title={lang.publishProduct.bannerTitle}
                        subtitle={lang.publishProduct.bannerSubtitle}
                    />
                    <div>
                        <Row className="body">
                            <div className="container">
                                <Col m={12}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <span className="txt4">Product Specification</span>
                                        <Row className="row">
                                            <Col m={6}>
                                                <Controller
                                                    as={TextInput}
                                                    className="input100"
                                                    control={control}
                                                    defaultValue=""
                                                    name="name"
                                                    id="name"
                                                    label={lang.publishProduct.lblName}
                                                    rules={{ required: true }}
                                                    validate
                                                />
                                                <span className="message-error">{errors.name && lang.publishProduct.errorName}{" "}</span>
                                            </Col>
                                            <Col m={6}>
                                                <Controller
                                                    as={TextInput}
                                                    className="input100"
                                                    control={control}
                                                    defaultValue=""
                                                    name="description"
                                                    id="description"
                                                    label={lang.publishProduct.lblDescription}
                                                    rules={{ required: true }}
                                                    validate
                                                />
                                                <span className="message-error">{errors.name && lang.publishProduct.errorDescription}{" "}</span>
                                            </Col>
                                        </Row>
                                        <Row className="row">
                                            <Col m={6}>
                                                <Controller
                                                    as={Select}
                                                    control={control}
                                                    value=""
                                                    name="category"
                                                    id="category"
                                                    label={lang.publishProduct.lblCategory}
                                                    rules={{ required: true }}
                                                    multiple={false}
                                                    options={{
                                                        classes: "",
                                                        dropdownOptions: {
                                                            closeOnClick: true,
                                                            constrainWidth: false,
                                                            coverTrigger: false,
                                                        },
                                                }}>
                                                    <option value="">{lang.publishProduct.chooseOption}</option>
                                                    <option value="AGROQUIMICOS">Agroquímicos</option>
                                                    <option value="ANIMAIS_DE_CRIACAO">Animais de Criação</option>
                                                    <option value="CARNES_E_DERIVADOS">Carnes e Derivados</option>
                                                    <option value="PEIXE">Peixe</option>
                                                    <option value="PRODUTOS_VETERINARIOS">Produtos Veterinários</option>
                                                    <option value="LEGUMES_E_HORTICULAS">Legumes & Hortícolas</option>
                                                    <option value="CEMENTES_E_MATERIAL_DE_PLANTACAO">Cementes e Material de Plantação</option>
                                                    <option value="EQUIPAMENTO_AGRICOLA">Equipamento Agrícola</option>
                                                    <option value="CEREAIS">Cereias</option>
                                                    <option value="FEIJAO">Feijão</option>
                                                    <option value="FERTILIZANTES">Fertilizantes</option>
                                                    <option value="FRUTOS">Frutos</option>
                                                </Controller>
                                                <span className="message-error">{errors.category && lang.publishProduct.errorCategory}</span>
                                            </Col>
                                            <Col m={6}>
                                                <Controller
                                                    as={TextInput}
                                                    className="input100"
                                                    control={control}
                                                    defaultValue=""
                                                    name="certification"
                                                    id="certification"
                                                    label={lang.publishProduct.lblCertification}
                                                    rules={{ required: true }}
                                                    validate
                                                />
                                                <span className="message-error">{errors.certification && lang.publishProduct.errorCertification}</span>
                                            </Col>
                                        </Row>

                                        <span className="txt4">Stock Specification</span>
                                        <Row className="row">
                                            <Col m={6}>
                                                <Controller
                                                    as={TextInput}
                                                    className="input100"
                                                    control={control}
                                                    defaultValue=""
                                                    name="weight"
                                                    id="weight"
                                                    type="number"
                                                    label={lang.publishProduct.lblQuantity}
                                                    rules={{ required: true }}
                                                    validate
                                                />
                                                <span className="message-error">{errors.weight && lang.publishProduct.errorQuantity}</span>
                                            </Col>
                                            <Col m={6}>
                                                <Controller
                                                    as={TextInput}
                                                    className="input100"
                                                    control={control}
                                                    defaultValue=""
                                                    name="unitPrice"
                                                    id="unitPrice"
                                                    type="number"
                                                    label={lang.publishProduct.lblPrice}
                                                    rules={{ required: true }}
                                                    validate
                                                />
                                                <span className="message-error">{errors.unitPrice && lang.publishProduct.errorPrice}</span>
                                            </Col>
                                        </Row>
                                        <Row className="row">
                                            <Col m={6}>
                                                <Controller
                                                    as={DatePicker}
                                                    control={control}
                                                    defaultValue=""
                                                    name="dateProduced"
                                                    id="dateProduced"
                                                    label={lang.publishProduct.lblDateProduced}
                                                    rules={{ required: true }}
                                                    validate
                                                />
                                                <span className="message-error">{errors.dateProduced && lang.publishProduct.errorDateProduced}</span>
                                            </Col>
                                            <Col m={6}>
                                                <Controller
                                                    as={DatePicker}
                                                    control={control}
                                                    defaultValue=""
                                                    name="dateExpired"
                                                    id="dateExpired"
                                                    label={lang.publishProduct.lblDateExpires}
                                                    rules={{ required: true }}
                                                    validate
                                                />
                                                <span className="message-error">{errors.dateExpired && lang.publishProduct.errorDateExpires}</span>
                                            </Col>
                                        </Row>

                                        <span className="txt4">Location & Availability</span>
                                        <Row className="row">
                                            <Col m={6}>
                                                <Controller
                                                    as={TextInput}
                                                    className="input100"
                                                    control={control}
                                                    defaultValue=""
                                                    name="origin"
                                                    id="origin"
                                                    label={lang.publishProduct.lblOrigin}
                                                    rules={{ required: true }}
                                                    validate
                                                />
                                                <span className="message-error">{errors.origin && lang.publishProduct.errorOrigin}</span>
                                            </Col>
                                            <Col m={6}>
                                                <Controller
                                                    as={DatePicker}
                                                    control={control}
                                                    defaultValue=""
                                                    name="dateAvailable"
                                                    id="dateAvailable"
                                                    label={lang.publishProduct.lblDateAvailable}
                                                    rules={{ required: true }}
                                                    validate
                                                />
                                                <span className="message-error">{errors.dateAvailable && lang.publishProduct.errorDateAvailable}</span>
                                            </Col>
                                        </Row>
                                        <Row className="row">
                                            <div className="container-main100-btn">
                                                <Button className="main100-btn" type="submit">
                                                    Publish
                                                </Button>
                                            </div>
                                        </Row>
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

function mapState(state) {
    return state;
}

const actionCreators = {
    register: productActions.registerProduct,
};

const connectedPublishProductPage = connect(
    mapState,
    actionCreators
)(PublishProductPage);

export { connectedPublishProductPage as PublishProductPage };
