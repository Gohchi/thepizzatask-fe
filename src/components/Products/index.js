import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Chip from '@material-ui/core/Chip';

import { addToCart, removeFromCart, clearFromCart } from '../../actions';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 445,
    margin: '20px',
    display: 'inline-block',
    textAlign: 'left'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));


const mapStateToProps = (state) => {
  return {
    currency: state.currency
  }
}

export default connect( mapStateToProps, { addToCart, removeFromCart, clearFromCart })(function ( props ) {
  const { id, name, price, description, photo, amount } = props;
  const { base, symbol } = props.currency;

  // const url = require(`../../images/${photo}.jpg`);
  const urlSmall = require(`../../images/${photo}-small.jpg`);
  const classes = useStyles();

  const calculatePrice = () => {
    return `${base * price} ${symbol}`;
  }

  const handleAdd = () => {
    props.addToCart(id);
  }
  const handleRemove = () => {
    props.removeFromCart(id);
  }
  const handleClear = () => {
    props.clearFromCart(id);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        title={name}
        subheader={calculatePrice()}
      />
      <CardMedia
        className={classes.media}
        image={urlSmall}
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" color="secondary" onClick={handleAdd}>
          <AddCircle />
        </IconButton>
        <IconButton aria-label="share" onClick={handleRemove}>
          <RemoveCircle />
        </IconButton>
        {amount ? <Chip
          label={amount}
          className={classes.expand}
          onDelete={handleClear}
          color="secondary"
        /> : undefined}
      </CardActions>
    </Card>
  );
});