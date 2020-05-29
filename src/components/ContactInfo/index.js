import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Phone from '@material-ui/icons/Phone';
import Home from '@material-ui/icons/Home';
import Business from '@material-ui/icons/Business';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { setContact } from '../../actions';

const mapStateToProps = (state) => {
  return {
    contact: state.contact
  }
}

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
  saveButton: {
    fontSize: '32px'
  }
}));

export default connect(mapStateToProps, { setContact })(( props ) => {
  const classes = useStyles();
  let history = useHistory();
  let { fullName, phone, address, apartment } = props.contact;

  const [newFullName, setNewFullName] = useState(fullName);
  const [newPhone, setNewPhone] = useState(phone);
  const [newAddress, setNewAddress] = useState(address);
  const [newApartment, setNewApartment] = useState(apartment);

  const handleSubmit = e => {
    e.preventDefault();
    props.setContact(newFullName, newPhone, newAddress, newApartment);
    history.push('/confirm');
  };

  // const validate = values => {
  //   const errors = {};
  //   if (!values.firstName) {
  //     errors.newFullName = 'Required';
  //   }
  //   if (!values.lastName) {
  //     errors.newPhone = 'Required';
  //   }
  //   if (!values.newAddress) {
  //     errors.email = 'Required';
  //   }
  //   return errors;
  // };
  
  return (
    <Container maxWidth="sm" className={classes.root}>
      <form onSubmit={handleSubmit} noValidate>
        <Paper elevation={3} className={classes.item}>
          <Typography variant="h4" component="h2">
            Contact Info
          </Typography>
          <FormControl className={classes.margin} required>
            <InputLabel htmlFor="input-with-icon-adornment">Full name</InputLabel>
            <Input
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              defaultValue={newFullName}  
              onInput={ e=> setNewFullName(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.margin} required>
            <InputLabel htmlFor="input-with-icon-adornment">Phone number</InputLabel>
            <Input
              startAdornment={
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              }
              defaultValue={newPhone}
              onInput={ e=> setNewPhone(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.margin} required>
            <InputLabel htmlFor="input-with-icon-adornment">Address</InputLabel>
            <Input
              startAdornment={
                <InputAdornment position="start">
                  <Home />
                </InputAdornment>
              }
              defaultValue={newAddress}
              onInput={ e=> setNewAddress(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">Apartment</InputLabel>
            <Input
              startAdornment={
                <InputAdornment position="start">
                  <Business />
                </InputAdornment>
              }
              defaultValue={newApartment}
              onInput={ e=> setNewApartment(e.target.value)}
            />
          </FormControl>
        </Paper>
        <Button
          type="submit"
          variant="contained" color="secondary" size="large"
          className={classes.saveButton}
        >
          Save
        </Button>
      </form>
    </Container>
  );
});