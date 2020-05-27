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

import Button from '@material-ui/core/Button';
import Toolbar from './components/Toolbar';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { calculateTotalCount } from './tools';
import { savePizzas } from './actions';

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    cartTotal: calculateTotalCount(state.cart),
    currency: state.currency,
    pizzas: state.pizzas
  }
}


class App extends Component {
  // constructor(props){
  //   super(props)
  //https://thepizzatask-be.herokuapp.com/api
  // }
  componentDidMount(){
    // find pizzas
    
    fetch('api/products', { 
      method: 'GET', 
      // headers: new Headers({
      //   Authorization: action.authToken
      // })
    })
    .then(response => response.json())
    .then(res => {
      setTimeout(() => {
        this.props.savePizzas(res.pizzas);
      }, 1000);
      // store.dispatch({
      //   type: ADD_VIEWS,
      //   items: res.menuItems
      // })
    });
  }

  render(){
    const { pizzas, cartTotal, cart } = this.props;

    const loading = pizzas.length === 0 ?
      (
        <Container maxWidth="sm" >
          <Paper elevation={3}>
            <Typography variant="h4" component="h2">
              LOADING
            </Typography>
          </Paper>
        </Container>
      ) : undefined;

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
                {cartTotal > 0 ? 
                  <Link to="/confirm" className="no-link">
                    <Button variant="contained" color="secondary" size="large" id="to-confirm">Proceed</Button>
                  </Link>
                  : undefined}
                {pizzas.map((o, i) => 
                  <Products key={i} {...o} amount={cart[o.id]} />
                )}
                {loading}
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
}

export default connect(mapStateToProps, { savePizzas })(App);
