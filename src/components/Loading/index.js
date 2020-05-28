import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default () => {
  return (
    <Container maxWidth="sm" >
      <Paper elevation={3}>
        <Typography variant="h4" component="h2">
          LOADING
        </Typography>
      </Paper>
    </Container>
  );
};