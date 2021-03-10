import React, {Component} from "react";
import {Icon, Row, Button, Col} from "react-materialize";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {userActions} from "../_actions";
import {Loader} from "../_components/Loader";
import TopBaner from "../_components/TopBanner";
import {LangContext} from "../language";

export default class ManageUsers extends Component {
    constructor() {
        super();
        this.state = {
            pageNumber: 0,
            sort: "requestDate,desc",
            loading: true,
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

    componentDidMount() {
        this.props.getAll(this.state.pageNumber, this.state.sort);
    }

    render() {
        if (this.props.loading) {
            return <Loader/>;
        } else {
            const {userList} = this.props;
            // let userList = this.props.userList._embedded;
            // let page;
            console.log(userList);
            let users;
            if (userList) {
                // page = userList.page;
                users = userList._embedded.applicationUsers.map((user, key) => (
                    <tr key={key}>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.username}</td>
                        <td>{user.userRole}</td>
                        <td>
                            <Link to={"/users/" + user.id}>
                                <Icon>chevron_right</Icon>
                            </Link>
                        </td>
                    </tr>
                ));
                // page = userList.page;
            }
            return (
                <LangContext.Consumer>
                    {({lang}) => (
                        <div>
                            <TopBaner
                                title={lang.manageUsers.bannerTitle}
                                subtitle={lang.manageUsers.bannerSubtitle}
                                button={false}
                            />
                            <Row className="body">

                                <div className="container">
                                    <Row className="row">
                                        <Col m = {9}></Col>
                                        <Col m = {3} className="">
                                            <Button className="main100-btn">
                                                Registar Fornecedor
                                            </Button>
                                        </Col>
                                    </Row>
                                    <table className="responsive striped">
                                        <thead>
                                        <tr>
                                            <th>{lang.manageUsers.headerClientName}</th>
                                            <th>{lang.manageUsers.headerClientSurname}</th>
                                            <th>{lang.manageUsers.headerEmail}</th>
                                            <th>{lang.manageUsers.headerRole}</th>
                                            <th>{lang.manageUsers.headerDetails}</th>
                                        </tr>
                                        </thead>
                                        <tbody>{users}</tbody>
                                    </table>
                                </div>
                            </Row>
                        </div>
                    )}
                </LangContext.Consumer>
            );
        }
    }
}

function mapState(state) {
    const {userList, loading} = state.users;
    return {userList, loading};
    //   return state;
}

const actionCreators = {
    getAll: userActions.getAll,
};

const connectedManageUsers = connect(mapState, actionCreators)(ManageUsers);
export {connectedManageUsers as ManageUsers};
