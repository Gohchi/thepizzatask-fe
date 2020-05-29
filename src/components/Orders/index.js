import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { withStyles } from '@material-ui/styles';

import Loading from '../../components/Loading';

import { fixDate, formatDate, formatMoney } from '../../tools';
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
    padding: '10px',
    margin: '10px 0'
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
  
  rootNew: {
    width: '100%',
  },
  heading: {
    fontSize: '16px',
    flexBasis: '45%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: '16px',
  },
  panelDetails: {
    flexDirection: 'column'
  }
});

const Order = ({ total, order, classes, getPizzaNameById, calculatePriceByAmount}) => {
  const [expanded, setExpanded] = React.useState(false);
  
  const handleClick = () => {
    setExpanded(!expanded);
  }

  return (
    <ExpansionPanel expanded={expanded} onChange={handleClick}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography className={classes.heading}>Total: {calculatePriceByAmount(order.currencyBase, order.currencyCode, total.price)}</Typography>
        <Typography className={classes.secondaryHeading}>{formatDate(order.date)}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelDetails}>
        {order.items.map((item, l) => {
          if(item.id === 1) return undefined; // skip total
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
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

class Orders extends Component {
  constructor(props){
    super(props)
    this.state = {
      orders: [],
      loading: true
    }
  }
  componentDidMount(){
    doFetch('/orders', 'GET')
      .then(res => {
        const orders = res.map(o => Object.assign({}, o, { date: fixDate(o.date) }));
        this.setState({
          orders, loading: false
        })
      }, () => this.setState({ loading: false }));
  }

  render(){
    const { classes, pizzas } = this.props;
    const { orders, loading } = this.state;

    const getPizzaNameById = id => {
      const item = pizzas.filter(o => o.id === parseInt(id))[0]
      return item ? item.name : 'not-found';
    }
    
    const calculatePriceByAmount = ( base, code, price ) => {
      const currency = currencies[code];
      const symbol = currency ? currency.symbol : 'not-found';
      return `${formatMoney( base * price)} ${symbol}`;
    }
    if (loading) return <Loading />;

    return (
      <Container maxWidth="sm" className={classes.root}>
         <Paper elevation={3} className={classes.main}>
            <Typography variant="h4" component="h2">
              Orders
            </Typography>
          </Paper>,
          <div className={classes.rootNew}>
            {orders.map((order, i) => <Order
                key={i} order={order}
                total={order.items.filter(o => o.id === 1)[0]} 
                classes={classes}
                getPizzaNameById={getPizzaNameById}
                calculatePriceByAmount={calculatePriceByAmount}
              />
            )}
          </div>
        <div className="mobile-bottom-fix"></div>
      </Container>
    );
  }
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { })( withStyles(styles)( Orders ) );