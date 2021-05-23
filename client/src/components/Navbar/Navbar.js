import React from "react";
import { AppBar, Typography ,Toolbar,Avatar,Button} from "@material-ui/core";
import {Link} from 'react-router-dom';
import Moments from "../../images/Moments.png";
import makeStyles from "./styles";

function Navbar() {
  const classes = makeStyles();
  const user=null;
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
          Moments
        </Typography>
        <img
          className={classes.image}
          src={Moments}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?(
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
            </div>
        ):(
            <Button component={Link} to='/auth' variant="contianed" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
