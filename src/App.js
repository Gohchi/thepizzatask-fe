import React from 'react';
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

import Button from '@material-ui/core/Button';
import Toolbar from './components/Toolbar';

import { calculateTotalCount } from './tools';

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    cartTotal: calculateTotalCount(state.cart),
    currency: state.currency,
    pizzas: state.pizzas
  }
}


function App( props ) {
  const { pizzas } = props;
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
              {props.cartTotal > 0 ? 
                <Link to="/confirm" className="no-link">
                  <Button variant="contained" color="secondary" size="large" id="to-confirm">Proceed</Button>
                </Link>
                : undefined}
              {pizzas.map((o, i) => 
                <Products key={i} {...o} amount={props.cart[o.id]} />
              )}
            </Route>
            <Route path="/">
              <Button
                variant="contained" color="secondary" size="large"
                id="order-now"
              >
                <Link to="/products" className="no-link">Order now</Link>
              </Button>
            </Route>
          </Switch>
        </div>
        {/* <a href="http://www.freepik.com" id="bg-owner-info">Background designed by Freepik</a> */}
      </div>
    </Router>
  );
}

export default connect(mapStateToProps)(App);
