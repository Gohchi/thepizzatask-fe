import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { RHFInput } from 'react-hook-form-input';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
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
  const { register, handleSubmit, setValue, errors } = useForm();
  let history = useHistory();
  let { fullName, phone, address, apartment } = props.contact;

  const onSubmit = data => {
    props.setContact(data.fullName, data.phone, data.address, data.apartment);
    history.push('/confirm');
  };
  
  return (
    <Container maxWidth="sm" className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Paper elevation={3} className={classes.item}>
          <Typography variant="h4" component="h2">
            Contact Info
          </Typography>
          <RHFInput
            name="fullName"
            as={
              <TextField
                className={classes.margin}
                label="Full name"
                defaultValue={fullName}  
                error={!!errors.fullName}
                helperText={errors.fullName ? "This field is required." : undefined}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            }
            rules={{ required: true }}
            register={register} setValue={setValue}
          />
          <RHFInput
            name="phone"
            as={
              <TextField
                className={classes.margin}
                label="Phone number"
                defaultValue={phone}  
                error={!!errors.phone}
                helperText={errors.phone ? "This field is required." : undefined}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            }
            rules={{ required: true }}
            register={register} setValue={setValue}
          />
          <RHFInput
            name="address"
            as={
              <TextField
                className={classes.margin}
                label="Address"
                defaultValue={address}  
                error={!!errors.address}
                helperText={errors.address ? "This field is required." : undefined}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home />
                    </InputAdornment>
                  ),
                }}
              />
            }
            rules={{ required: true }}
            register={register} setValue={setValue}
          />
          <RHFInput
            name="apartment"
            as={
              <TextField
                className={classes.margin}
                label="Apartment"
                defaultValue={apartment}  
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business />
                    </InputAdornment>
                  ),
                }}
              />
            }
            rules={{ }}
            register={register} setValue={setValue}
          />
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