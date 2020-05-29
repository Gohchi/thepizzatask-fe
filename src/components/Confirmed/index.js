import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
  },
  item: {
    margin: '10px 0',
    padding: '5px 15px'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.root}>
        <Paper elevation={3} className={classes.item}>
          <Typography variant="h4" component="h2">
            You order is ready!
          </Typography>
          <Typography>
            We will contact you soon. Prepare your table!
          </Typography>
        
        </Paper>
        <Link to="/products" className="no-link">
          <Button
            variant="contained" color="secondary" size="large" className={classes.margin}
          >
            Go back to products
          </Button>
        </Link>
        <Link to="/orders" className="no-link">
          <Button
            variant="contained" color="secondary" size="large" className={classes.margin}
          >
            Or check your orders
          </Button>
        </Link>
    </Container>
  );
};