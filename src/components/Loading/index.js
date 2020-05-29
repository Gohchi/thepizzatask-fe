import React from 'react';
import Container from '@material-ui/core/Container';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import LocalPizzaOutlinedIcon from '@material-ui/icons/LocalPizzaOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '22em',
    zIndex: 1,
    margin: 'auto 0'
  }
}));
export default () => {
  const [iconState, setIconState] = React.useState(false);
  const classes = useStyles();
  const respClass = classes.icon;
  React.useEffect(() => {
    const t = setTimeout(() => {
      setIconState(!iconState);
    }, 700);
    return () => clearTimeout(t);
  }, [iconState]);
  return (
    <Container maxWidth="sm" >
      {iconState ? <LocalPizzaOutlinedIcon color="secondary" className={respClass} /> : <LocalPizzaIcon color="secondary" className={respClass} />}
    </Container>
  );
};