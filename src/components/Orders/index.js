import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';

import { formatDate, roundNumber } from '../../tools';
import { currencies } from '../../reducers/currency';

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    currency: state.currency,
    pizzas: state.pizzas
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
  },
  date: {
    display: 'flex',
    padding: 0
  },
  main: {
    padding: theme.spacing(1)
  },
  orders: {
    padding: '5px 15px',
    margin: theme.spacing(1),
  },
  ordersItem: {
    display: 'flex',
    padding: '5px 15px',
    margin: theme.spacing(1)
  },
}));

export default connect(mapStateToProps, { })(( props ) => {
  const classes = useStyles();

  const getPizzaNameByKey = key => {
    switch (key){
      case 'd':
        return 'Shipping fee';
      case 't':
        return 'Total';
      default:
        return 'Pizza: ' + props.pizzas.filter(o => o.id === parseInt(key))[0].name;
    }
  }
  
  const calculatePriceByAmount = ( base, code, price ) => {
    const symbol = currencies[code].symbol;
    return `${roundNumber( base * price)} ${symbol}`;
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
        <Paper elevation={3} className={classes.main}>
          <Typography variant="h4" component="h2">
            Orders
          </Typography>
          {props.orders.map((order, i) => 
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
                const name = getPizzaNameByKey(item.key);
                const isPizza = item.key !== 't' && item.key !== 'd';
                return (
                  <Paper key={l} elevation={1} className={classes.ordersItem}>
                    <Typography style={{ flexGrow: 1 }}>
                      {name}{isPizza ? ` (${item.amount})` : ''}
                    </Typography>
                    <Typography>
                      {calculatePriceByAmount(order.currency.base, order.currency.code, item.price)}
                    </Typography>
                  </Paper>
                )}
              )}
            </Paper>
          )}
        </Paper>
    </Container>
  );
});