import React from 'react';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MoreVert from '@material-ui/icons/MoreVert';
import Euro from '@material-ui/icons/Euro';
import Money from '@material-ui/icons/Money';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import ButtonGroup from '@material-ui/core/ButtonGroup';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import { setCurrency } from '../../actions';
import { calculateTotalCount } from '../../tools';
import { MenuItem } from '@material-ui/core';

const mapStateToProps = (state) => {
  return {
    cartTotal: calculateTotalCount(state.cart),
    currency: state.currency
  }
}

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  items: {
    display: 'contents'
  }
}));

export default connect( mapStateToProps, { setCurrency })(( props ) => {
  const matches = useMediaQuery('(min-width:600px)');
  // console.log(matches);
  const classes = useStyles();
  let history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleCurrency = code => {
    return () => {
      props.setCurrency(code);
    }
  }
  const handleRedirect = to => {
    return () => {
      history.push(to);
    }
  }
  const getVariant = code => {
    return code===props.currency.code ? undefined : "outlined";
  }
  
  return (
    <AppBar>
      <Toolbar>
          <Typography className={classes.title} variant="h6">
            <Link to="/" className="no-link">
              The Pizza Task
            </Link>
          </Typography>
        {matches
        ? <div className={classes.items}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" id="currency">
              <Button variant={getVariant('EUR')} onClick={handleCurrency('EUR')}> EURO </Button>
              <Button variant={getVariant('USD')} onClick={handleCurrency('USD')}> USD </Button>
            </ButtonGroup>
            <Tooltip title="Cart" aria-label="cart">
              <Link to="/confirm" className="no-link">
                <IconButton color="inherit" aria-label="cart">
                  <Badge badgeContent={props.cartTotal} color="secondary">
                      <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Orders" aria-label="orders">
              <Link to="/orders" className="no-link">
                <IconButton color="inherit" aria-label="orders">
                  <ListAltIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
        :  <IconButton
              color="inherit" aria-label="items" aria-controls="menu-items"
              onClick={handleClick}
            >
            <MoreVert />
          </IconButton>}
          <Menu
            id="menu-items"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleCurrency('EUR')}>
              <Euro />
            </MenuItem>
            <MenuItem onClick={handleCurrency('USD')}>
              <Money />
            </MenuItem>
            <MenuItem onClick={handleRedirect('/confirm')}>
              <Badge badgeContent={props.cartTotal} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </MenuItem>
            <MenuItem onClick={handleRedirect('/orders')}>
              <ListAltIcon />
            </MenuItem>
          </Menu>
      </Toolbar>
    </AppBar>
  );
});