import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Products from './components/Products';
import Confirm from './components/Confirm';
import ContactInfo from './components/ContactInfo';
import Orders from './components/Orders';
import Confirmed from './components/Confirmed';
import Loading from './components/Loading';
import BottomNav from './components/BottomNav';

import Toolbar from './components/Toolbar';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

// import { calculateTotalCount } from './tools';
import doFetch from './doFetch';
import { savePizzas } from './actions';

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    // cartTotal: calculateTotalCount(state.cart),
    currency: state.currency,
    pizzas: state.pizzas
  }
}


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      productsLoadingError: false
    }
  }
  componentDidMount(){
    this.getProducts();
  }
  getProducts(){
    doFetch('/products', 'GET')
      .then(res => {
        this.props.savePizzas(res.pizzas);
      }, () => this.setState({ productsLoadingError: true }));
    this.setState({ productsLoadingError: false })
  }
  render(){
    const { pizzas, /*cartTotal,*/ cart } = this.props;
    const { productsLoadingError } = this.state;
    return (
      <Router>
        <div className="main">
          <Toolbar />
          <div className="box">
            <Switch>
              <Route path="/confirmed">
                <Confirmed />
              </Route>
              <Route path="/orders">
                <Orders />
              </Route>
              <Route path="/contactinfo">
                <ContactInfo />
              </Route>
              <Route path="/confirm">
                <Confirm />
              </Route>
              <Route path="/products">
                {productsLoadingError
                ? <Button
                    onClick={this.getProducts.bind(this)}
                    color="secondary"
                    style={{backgroundColor: 'white', fontSize: '18px'}}
                  > Something went wrong.<br />Try load again...</Button>
                :
                  pizzas.length === 0
                  ? <Loading />
                  : pizzas.filter(o => o.id > 2).map((o, i) =>
                      <Products key={i} {...o} amount={cart[o.id]} />
                    )
                }
                <div className="mobile-bottom-fix"></div>
              </Route>
              <Route path="/">
                <Container maxWidth="sm">
                  <Button
                    variant="contained" color="secondary" size="large"
                    id="order-now"
                  >
                    <Link to="/products" className="no-link">Order now</Link>
                  </Button>
                </Container>
              </Route>
            </Switch>
          </div>
          {/* <a href="http://www.freepik.com" id="bg-owner-info">Background designed by Freepik</a> */}
          <BottomNav />
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, { savePizzas })(App);
