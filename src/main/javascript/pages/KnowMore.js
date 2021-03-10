import React, {Component} from "react";
import {Col, Row, TextInput, Button} from "react-materialize";
import {connect} from "react-redux";
import {productActions} from "../_actions";
import {Loader} from "../_components/Loader";
import TopBaner from "../_components/TopBanner";
import { Interest } from "../_components/ProductInterest";
import {LangContext} from "../language";

class KnowMore extends Component {
    handleSubmit
    render() {
        if (this.props.loading) {
            let {productId} = this.props.match.params;
            this.props.getOneDetail(productId);
            return <Loader/>;
        } else {
            <Loader />
            const {product, key} = this.props;

            return (<LangContext.Consumer>
                {({lang}) => (
                    <div>
                        <TopBaner title={lang.productPage.bannerTitle} subtitle={lang.productPage.bannerSubtitle}/>
                        <div>
                            <Row className="body">
                                <div className="container">
                                    <Col m={12}>
                                        <h4 className="page-title">product</h4>
                                        <form>
                                            <span className="txt4">Product specification</span>
                                            <Row className="row">
                                                <Col m={6}>
                                                    <TextInput
                                                        id="name"
                                                        label={lang.productPage.lblName}
                                                        disabled
                                                    />
                                                </Col>
                                                <Col m={6}>
                                                    <TextInput
                                                        id="description"
                                                        label={lang.productPage.lblDescription}
                                                        disabled
                                                    />
                                                </Col>
                                            </Row>

                                            <Row className="row">
                                                <Col m={6}>
                                                    <TextInput
                                                        id="category"
                                                        label={lang.productPage.lblCategory}
                                                        disabled
                                                    />
                                                </Col>
                                                <Col m={6}>
                                                    <TextInput
                                                        id="certification"
                                                        label={lang.productPage.lblCertification}
                                                        disabled
                                                    />
                                                </Col>
                                            </Row>

                                            <span className="txt4">Stock specification</span>
                                            <Row className="row">
                                                <Col m={6}>
                                                    <TextInput
                                                        id="weight"
                                                        label={lang.productPage.lblQuantity}
                                                        disabled
                                                    />
                                                </Col>
                                                <Col m={6}>
                                                    <TextInput
                                                        id="unitPrice"
                                                        label={lang.productPage.lblPrice}
                                                        disabled
                                                    />
                                                </Col>
                                            </Row>

                                            <Row className="row">
                                                <Col m={6}>
                                                    <TextInput
                                                        id="dataProduced"
                                                        label={lang.productPage.lblDateProduced}
                                                        disabled
                                                    />
                                                </Col>
                                                <Col m={6}>
                                                    <TextInput
                                                        id="dateExpired"
                                                        label={lang.productPage.lblDateExpires}
                                                        disabled
                                                    />
                                                </Col>
                                            </Row>

                                            <span className="txt4">Location specification</span>
                                            <Row className="row">
                                                <Col m={6}>
                                                    <TextInput
                                                        id="origin"
                                                        label={lang.productPage.lblQuantity}
                                                        disabled
                                                    />
                                                </Col>
                                                <Col m={6}>
                                                    <TextInput
                                                        id="dateAvailable"
                                                        label={lang.productPage.lblDateAvailable}
                                                        disabled
                                                    />
                                                </Col>
                                            </Row>
                                        </form>
                                        <Row className="row">
                                            <Col m = {10}></Col>
                                            <Col m = {2}>
                                                <Interest key={key} product={product} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </div>
                            </Row>
                        </div>
                    </div>)}
                </LangContext.Consumer>
            );
        }
    }
}

function mapState(state) {
    const {product, loading} = state.products;
    return {product, loading};
}

const actionCreators = {
    getOneDetail: productActions.getOneDetail,
};

const connectedKnowMore = connect(mapState, actionCreators)(KnowMore);
export {connectedKnowMore as KnowMore};