import React, {Component} from "react";
import {Icon, Pagination, Row} from "react-materialize";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {leadActions} from "../_actions";
import {Loader} from "../_components/Loader";
import TopBaner from "../_components/TopBanner";
import {LangContext} from "../language";

class ManageOrders extends Component {
    constructor() {
        super();
        this.state = {
            pageNumber: 0,
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        pageNumber--;
        this.setState({pageNumber});

        this.props.getAll(pageNumber);
    }

    componentDidMount() {
        this.props.getAll(this.state.pageNumber);
    }

    render() {
        if (this.props.loading) {
            return <Loader/>;
        } else {
            const {leads} = this.props;

            let leadList = leads.content.map((lead, key) => (
                <tr key={key}>
                    <td>{lead.clientName}</td>
                    <td>{lead.productName}</td>
                    <td>{lead.qty}</td>
                    <td>{lead.requestDate}</td>
                    <td>
                        <Link to={"/orders/" + lead.leadId}>
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
                                title={lang.manageOrders.bannerTitle}
                                subtitle={lang.manageOrders.bannerSubtitle}
                                button={false}
                            />
                            <Row className="body">
                                <div className="container">
                                    <table className="responsive striped">
                                        <thead>
                                        <tr>
                                            <th>{lang.manageOrders.headerClientName}</th>
                                            <th>{lang.manageOrders.headerProduct}</th>
                                            <th>{lang.manageOrders.headerQuantity}</th>
                                            <th>{lang.manageOrders.headerRequestDate}</th>
                                            <th>{lang.manageOrders.headerDetails}</th>
                                        </tr>
                                        </thead>

                                        <tbody>{leadList}</tbody>
                                    </table>
                                </div>
                            </Row>
                            <Row>
                                <Pagination
                                    activePage={this.state.pageNumber + 1}
                                    items={leads.totalPages}
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
    const {leads, loading} = state.leads;
    return {leads, loading};
}

const actionCreators = {
    getAll: leadActions.getAll,
};

const connectedManageOrders = connect(mapState, actionCreators)(ManageOrders);
export {connectedManageOrders as ManageOrders};
