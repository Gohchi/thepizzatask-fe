import React from 'react';
import { connect } from 'react-redux';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import LocalPizzaOutlinedIcon from '@material-ui/icons/LocalPizzaOutlined';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Badge from '@material-ui/core/Badge';

import { useHistory } from 'react-router-dom';
import { calculateTotalCount } from '../../tools';

const mapStateToProps = (state) => {
  return {
    cartTotal: calculateTotalCount(state.cart)
  }
}
export default connect(mapStateToProps)(props => {
  const matches = useMediaQuery('(max-width:600px)');
  let history = useHistory();

  const handleRedirect = to => {
    return () => {
      history.push(to);
    }
  }
  if(!matches) return <div></div>;
  const cartIcon = 
    <Badge badgeContent={props.cartTotal} color="secondary">
      {props.cartTotal > 0 ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
    </Badge>
  ;
  return (
    <BottomNavigation className="bottom-nav" color="secondary">
        <BottomNavigationAction label="Cart" value="cart" icon={cartIcon} onClick={handleRedirect('/confirm')} disabled={props.cartTotal === 0} />
        <BottomNavigationAction label="Pizzas" value="pizzas" icon={<LocalPizzaOutlinedIcon />} onClick={handleRedirect('/products')} />
        <BottomNavigationAction label="Orders" value="orders" icon={<ListAltIcon />} onClick={handleRedirect('/orders')} />
    </BottomNavigation>
  )
});