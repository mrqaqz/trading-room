import React, {Component} from "react";
import {Col, Row, TextInput} from "react-materialize";
import {connect} from "react-redux";
import {productActions} from "../_actions";
import {Loader} from "../_components/Loader";
import TopBaner from "../_components/TopBanner";
import {LangContext} from "../language";

class ProductPage extends Component {
    render() {
        if (this.props.loading) {
            let {productId} = this.props.match.params;
            this.props.getOne(productId);
            return <Loader/>;
        } else {
            const {product} = this.props;
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
                                            <Row className="row">
                                                <Col m={12}>
                                                    <TextInput
                                                        id="id"
                                                        label={lang.productPage.lblId}
                                                        disabled
                                                        value={product.id}
                                                    />
                                                </Col>
                                            </Row>

                                            <span className="txt4">Product specification</span>
                                            <Row className="row">
                                                <Col m={6}>
                                                    <TextInput
                                                        id="name"
                                                        label={lang.productPage.lblName}
                                                        value={product.name}
                                                    />
                                                </Col>
                                                <Col m={6}>
                                                    <TextInput
                                                        id="description"
                                                        label={lang.productPage.lblDescription}
                                                        value={product.description}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row className="row">
                                                <Col m={6}>
                                                    <TextInput
                                                        id="category"
                                                        label={lang.productPage.lblCategory}
                                                        value={product.category}
                                                    />
                                                </Col>
                                                <Col m={6}>
                                                    <TextInput
                                                        id="certification"
                                                        label={lang.productPage.lblCertification}
                                                        value={product.certification}
                                                    />
                                                </Col>
                                            </Row>

                                            <span className="txt4">Stock specification</span>
                                            <Row className="row">
                                                <Col m={6}>
                                                    <TextInput
                                                        id="weight"
                                                        label={lang.productPage.lblQuantity}
                                                        value={product.weight}
                                                    />
                                                </Col>
                                                <Col m={6}>
                                                    <TextInput
                                                        id="unitPrice"
                                                        label={lang.productPage.lblPrice}
                                                        value={product.unitPrice}
                                                    />
                                                </Col>
                                            </Row>

                                            <Row className="row">
                                                <Col m={6}>
                                                    <TextInput
                                                        id="dataProduced"
                                                        label={lang.productPage.lblDateProduced}
                                                        value={product.produced}
                                                    />
                                                </Col>
                                                <Col m={6}>
                                                    <TextInput
                                                        id="dateExpired"
                                                        label={lang.productPage.lblDateExpires}
                                                        value={product.dateExpired}
                                                    />
                                                </Col>
                                            </Row>

                                            <span className="txt4">Location specification</span>
                                            <Row className="row">
                                                <Col m={6}>
                                                    <TextInput
                                                        id="origin"
                                                        label={lang.productPage.lblOrigin}
                                                        value={product.origin}
                                                    />
                                                </Col>
                                                <Col m={6}>
                                                    <TextInput
                                                        id="dateAvailable"
                                                        label={lang.productPage.lblDateAvailable}
                                                        value={product.lblDateAvailable}
                                                    />
                                                </Col>
                                            </Row>
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
}

function mapState(state) {
    const {product, loading} = state.products;
    return {product, loading};
}

const actionCreators = {
    getOne: productActions.getOne,
};

const connectedProductPage = connect(mapState, actionCreators)(ProductPage);
export {connectedProductPage as ProductPage};
