import React, {Component} from "react";
import {Icon, Pagination, Row} from "react-materialize";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {productActions} from "../_actions";
import {Loader} from "../_components/Loader";
import TopBaner from "../_components/TopBanner";
import {LangContext} from "../language";

class ManageProducts extends Component {
    constructor() {
        super();
        this.state = {
            pageNumber: 0,
            sort: "requestDate,desc",
        };
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSort = this.handlePageSort.bind(this);
    }

    handlePageChange(pageNumber) {
        pageNumber--;
        this.setState({pageNumber});

        this.props.getAll();
    }

    handlePageSort(sort) {
        this.setState({sort});
    }

    render() {
        if (!this.props.loading) {
            this.props.getFullList(this.state.pageNumber, this.state.sort);
            return <Loader/>;
        } else {
            const {productList} = this.props;
            const {page} = this.props.productList;

            let products = productList._embedded.products.map((product, key) => (
                <tr key={key}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>
                        {product.unitPrice}
                    </td>
                    <td>{product.approved ? "Approved" : "Pending"}</td>
                    <td>
                        <Link to={"/products/" + product.id}>
                            <Icon>chevron_right</Icon>
                        </Link>
                    </td>
                </tr>
            ));

            return (
                <LangContext.Consumer>
                    {({lang}) => (
                        <div>
                            <TopBaner
                                title={lang.manageProducts.bannerTitle}
                                subtitle={lang.manageProducts.bannerSubtitle}
                                button={false}
                            />
                            <Row className="body">
                                <div className="container">
                                    <table className="responsive striped">
                                        <thead>
                                        <tr>
                                            <th>{lang.manageProducts.headerProductName}</th>
                                            <th>{lang.manageProducts.headerCategory}</th>
                                            <th>{lang.manageProducts.headerPriceUnit}</th>
                                            <th>{lang.manageProducts.headerStatus}</th>
                                            <th>{lang.manageProducts.headerDetails}</th>
                                        </tr>
                                        </thead>

                                        <tbody>{products}</tbody>
                                    </table>
                                </div>
                            </Row>
                            <Row>
                                <Pagination
                                    activePage={this.state.pageNumber + 1}
                                    items={page.totalPages}
                                    leftBtn={<Icon>chevron_left</Icon>}
                                    rightBtn={<Icon>chevron_right</Icon>}
                                    onSelect={this.handlePageChange}
                                />
                            </Row>
                        </div>
                    )}
                </LangContext.Consumer>
            );
        }
    }
}

function mapState(state) {
    const {productList, loading} = state.products;
    return {productList, loading};
}

const actionCreators = {
    getFullList: productActions.getFullList,
};

const connectedManageProducts = connect(
    mapState,
    actionCreators
)(ManageProducts);
export {connectedManageProducts as ManageProducts};
