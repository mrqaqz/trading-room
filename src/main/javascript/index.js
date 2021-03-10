import "materialize-css";
import React, { Suspense, Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/*------------CSS-----------------*/
import "./index.css";
/*-----------context -------*/
import { LangContext, language } from "./language";


/*------------Pages----------------*/
import {
  AdminDashboard,
  HomePage,
  KnowMore,
  LoginPage,
  ManageOrders,
  ManageProducts,
  ManageUsers,
  MyDetails,
  MyOrders,
  OrderPage,
  ProductPage,
  PublishProductPage,
  RegisterPage,
  UserDashboard,
  UserPage,
} from "./pages";
// import * as serviceWorker from "./serviceWorker";
/*-----------Custom components-----*/
import ErrorBoundary from "./_components/ErrorBoundary";
import { Loader } from "./_components/Loader";
import { store } from "./_helpers";

export default class App extends Component {
  constructor() {
    super();

    this.toggleLang = () => {
      this.setState((state) => ({
        lang: state.lang === language.pt ? language.en : language.pt,
      }));
    };

    this.state = {
      lang: language.pt,
      toggleLang: this.toggleLang,
    };
  }

  render() {
    return (
      <LangContext.Provider value={this.state}>
        <Provider store={store}>
          <Router>
            <ErrorBoundary>
              <Suspense fallback={Loader()}>
                <Switch>
                  <Route exact path="/" component={HomePage}/>
                  <Route exact path="/admindashboard" component={AdminDashboard}/>
                  <Route exact path="/login" component={LoginPage}/>
                  <Route exact path="/manageOrders" component={ManageOrders}/>
                  <Route exact path="/manageProducts" component={ManageProducts}/>
                  <Route exact path="/manageUsers" component={ManageUsers}/>
                  <Route exact path="/myOrders" component={MyOrders}/>
                  <Route exact path="/myDetails" component={MyDetails}/>
                  <Route exact path="/orders/:orderId" component={OrderPage}/>
                  <Route exact path="/products/:productId" component={ProductPage}/>
                  <Route exact path="/products/details/:productId" component={KnowMore}/>
                  <Route exact path="/publish" component={PublishProductPage} />
                  <Route exact path="/register" component={RegisterPage} />
                  <Route exact path="/userdashboard" component={UserDashboard}/>
                  <Route exact path="/users/:userId" component={UserPage} />
                </Switch>
              </Suspense>
            </ErrorBoundary>
          </Router>
        </Provider>
      </LangContext.Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// serviceWorker.register();
