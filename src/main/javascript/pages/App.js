import React, { Component } from "react";
import { Col, Icon, Pagination, Row } from "react-materialize";
import { connect } from "react-redux";
import { LangContext } from "../language";
import { productActions, userActions } from "../_actions";
import { ItemCard } from "../_components/Card";
import { Loader } from "../_components/Loader";
import SelectList from "../_components/SelectList";
import TabBar from "../_components/TabBar";
import TopBaner from "../_components/TopBanner";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      pageNumber: 0,
      sort: "datePublished,asc",
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSort = this.handlePageSort.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getAllProducts(this.state.pageNumber, this.state.sort);
  }

  handlePageChange(pageNumber) {
    pageNumber--;
    this.setState({ pageNumber });

    this.props.getAllProducts(pageNumber, this.state.sort);
  }

  handlePageSort(sort) {
    this.setState({ sort });
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    } else {
      const { products } = this.props;

      const { page } = this.props.products;

      const listItems = products._embedded.products.map((product, key) => (
        <ItemCard key={key} product={product} />
      ));

      return (
        <LangContext.Consumer>
          {({ lang }) => (
            <div>
              <TopBaner
                title={lang.homepage.title}
                subtitle={lang.homepage.subtitle}
                button={lang.homepage.button}
              />
              <Row className="body">
                <Row />
                <div className="container">
                  {/*<Col m={3}>
                    <SelectList
                      title={lang.homepage.filters.category}
                      listType="category"
                    />
                    <SelectList
                      title={lang.homepage.filters.location}
                      listType="location"
                    />
                  </Col>*/}
                  <Col m={12}>
                    {/*<TabBar
                      date={lang.homepage.sortingTab.date}
                      price={lang.homepage.sortingTab.price}
                      az={lang.homepage.sortingTab.az}
                    />*/}
                    <Row>{listItems}</Row>
                  </Col>
                  <Col m={3}></Col>
                </div>
              </Row>
              <Row>
                <Col m={4} />
                <Col m={4}>
                  <Pagination
                    activePage={this.state.pageNumber + 1}
                    items={page.totalPages}
                    leftBtn={<Icon>chevron_left</Icon>}
                    rightBtn={<Icon>chevron_right</Icon>}
                    onSelect={this.handlePageChange}
                  />
                </Col>
                <Col m={4} />
              </Row>
            </div>
          )}
        </LangContext.Consumer>
      );
    }
  }
}

function mapState(state) {
  const { products, loading } = state.products;
  const { user } = state.authentication;
  return { products, loading, user };
}

const actionCreators = {
  getAllProducts: productActions.getAll,
  getUser: userActions.getUserInfo,
};

const connectedApp = connect(mapState, actionCreators)(HomePage);
export { connectedApp as HomePage };
