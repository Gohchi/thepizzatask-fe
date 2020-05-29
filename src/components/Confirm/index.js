import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { calculateTotalCount, formatMoney } from '../../tools';
import { addOrder, clearCart } from '../../actions';
import doFetch from '../../doFetch';

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    cartTotal: calculateTotalCount(state.cart),
    currency: state.currency,
    pizzas: state.pizzas,
    contact: state.contact
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
  },
  item: {
    display: 'flex',
    margin: '10px 0',
    padding: '5px 15px'
  },
  itemAdded: {
    display: 'flex',
    margin: '10px 0',
    padding: '15px'
  },
  itemTotal: {
    fontSize: '28px'
  },
  contactInfo: {
    margin: '10px 0',
    padding: '15px'
  },
  contactInfoItem: {
    display: 'flex',
    margin: '10px 0',
    padding: '5px 15px'
  },
  confirmButton: {
    fontSize: '32px'
  }
}));

export default connect(mapStateToProps, { addOrder, clearCart })(( props ) => {
  const classes = useStyles();
  let history = useHistory();

  const { base, symbol } = props.currency;
  const { contact } = props;

  const [disabledButton, setDisabledButton] = React.useState(false);
  const handleConfirm = () => {
    setDisabledButton( true );
    doFetch('/order', 'POST', { items, currency: props.currency })
      .then(() => {
        setDisabledButton( false );
        props.clearCart();
        history.push('/confirmed');
      }, () => setDisabledButton( false ));
  }
  
  const calculatePriceByAmount = ( price, amount ) => {
    return `${formatMoney(base * price * amount)} ${symbol}`;
  }

  const items = Object.keys(props.cart).map(id => {
    const amount = props.cart[id];
    const pizza = props.pizzas.filter(o => o.id === parseInt(id))[0];
    if(!pizza) return { name: 'not-found', price: 0, amount: 1 }; // temp fix - test cart with items but load products from server
    return Object.assign({ id, amount }, pizza, { name: 'Pizza: ' + pizza.name });
  })

  items.push({ id: 2, name: 'Shipping fee', amount: 1, price: 3 });
  const total = items.reduce((t, item) => t + item.price * item.amount, 0);
  items.push({ id: 1, name: 'Total', amount: 1, price: total });

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Paper elevation={3} className={classes.item}>
        <Typography>
          Check all the info and confirm (at the bottom)
        </Typography>
      </Paper>
      {items.map(item => {
        const isPizza = item.id > 2;
        return (
          <Paper elevation={3} className={isPizza ? classes.item : classes.itemAdded} key={item.id}>
            <Typography style={{ flexGrow: 1 }} className={item.id === 1 ? classes.itemTotal : undefined}>
              {item.name}{isPizza ? ` (${item.amount})` : ''}
            </Typography>
            <Typography className={item.id === 1 ? classes.itemTotal : undefined}>
              {calculatePriceByAmount(item.price, item.amount)}
            </Typography>
          </Paper>
        ) 
      })}
      {props.contact.valid
        ? <Paper elevation={3} className={classes.contactInfo}>
        <Typography variant="h5" component="h5">
          Contact Info
        </Typography>
        <Paper elevation={1} className={classes.contactInfoItem}>
          <Typography style={{ flexGrow: 1 }}>
            Full name:
          </Typography>
          <Typography>
            {contact.fullName}
          </Typography>
        </Paper>
        <Paper elevation={1} className={classes.contactInfoItem}>
          <Typography style={{ flexGrow: 1 }}>
            Phone number:
          </Typography>
          <Typography>
            {contact.phone}
          </Typography>
        </Paper>
        <Paper elevation={1} className={classes.contactInfoItem}>
          <Typography style={{ flexGrow: 1 }}>
            Address:
          </Typography>
          <Typography>
            {contact.address}
          </Typography>
        </Paper>
        <Paper elevation={1} className={classes.contactInfoItem}>
          <Typography style={{ flexGrow: 1 }}>
            Apartment:
          </Typography>
          <Typography>
            {contact.apartment}
          </Typography>
        </Paper>
      </Paper>
        : undefined}
        <Button
          variant="contained" color="secondary" size="large"
          className={classes.confirmButton}
          style={{backgroundColor: disabledButton ? 'white' : undefined}}
          onClick={contact.valid ? handleConfirm : undefined}
          disabled={disabledButton}
        >
          {contact.valid
          ? disabledButton ? 'Confirming...' : 'Confirm'
          : <Link to="/contactinfo" className="no-link">Go to complete contact info</Link>}
        </Button>

      <div className="mobile-bottom-fix"></div>
    </Container>
  );
});