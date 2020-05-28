import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/styles';

import Loading from '../../components/Loading';

import { fixDate, formatDate, roundNumber } from '../../tools';
import { currencies } from '../../reducers/currency';
import doFetch from '../../doFetch';

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    currency: state.currency,
    pizzas: state.pizzas
  }
}

const styles = (theme) => ({
  root: {
    textAlign: 'left',
  },
  date: {
    display: 'flex',
    padding: 0
  },
  main: {
    padding: '10px'
  },
  orders: {
    padding: '5px 15px',
    margin: '10px',
  },
  ordersItem: {
    display: 'flex',
    padding: '5px 15px',
    margin: '10px'
  },
});

class Orders extends Component {
  constructor(props){
    super(props)
    this.state = {
      orders: []
    }
  }
  componentDidMount(){
    doFetch('/orders', 'GET')
      .then(res => {
        const orders = res.map(o => Object.assign({}, o, { date: fixDate(o.date) }));
        this.setState({
          orders
        })
      });
  }

  render(){
    const { classes, pizzas } = this.props;
    const { orders } = this.state;

    const loading = orders.length === 0 ? <Loading /> : undefined;

    const getPizzaNameById = id => {
      const item = pizzas.filter(o => o.id === parseInt(id))[0]
      return item ? item.name : 'not-found';
    }
    
    const calculatePriceByAmount = ( base, code, price ) => {
      const currency = currencies[code];
      const symbol = currency ? currency.symbol : 'not-found';
      return `${roundNumber( base * price)} ${symbol}`;
    }

    return (
      <Container maxWidth="sm" className={classes.root}>
          <Paper elevation={3} className={classes.main}>
            <Typography variant="h4" component="h2">
              Orders
            </Typography>
            {loading}
            {orders.map((order, i) => 
              <Paper key={i} elevation={1} className={classes.orders}>
                <Container className={classes.date}>
                  <Typography style={{ flexGrow: 1 }}>
                    Date:
                  </Typography>
                  <Typography>
                    {formatDate(order.date)}
                  </Typography>
                </Container>
                <Typography>
                  Items:
                </Typography>
                {order.items.map((item, l) => {
                  const name = getPizzaNameById(item.id);
                  const isPizza = item.id > 2;
                  return (
                    <Paper key={l} elevation={1} className={classes.ordersItem}>
                      <Typography style={{ flexGrow: 1 }}>
                        {name}{isPizza ? ` (${item.amount})` : ''}
                      </Typography>
                      <Typography>
                        {calculatePriceByAmount(order.currencyBase, order.currencyCode, item.price)}
                      </Typography>
                    </Paper>
                  )}
                )}
              </Paper>
            )}
          </Paper>
      </Container>
    );
  }
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { })( withStyles(styles)( Orders ) );