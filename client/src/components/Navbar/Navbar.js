import React,{useState,useEffect} from "react";
import { AppBar, Typography ,Toolbar,Avatar,Button} from "@material-ui/core";
import {Link,useHistory,useLocation} from 'react-router-dom';
import Moments from "../../images/Moments.png";
import makeStyles from "./styles";
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import { errorToast, successToast } from "../Toastify/Tostify";


function Navbar() {
  const classes = makeStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch=useDispatch();
  const history=useHistory();
  const location=useLocation();

  useEffect(() => {
    const token =user?.token;
    if(token){
      const decodedToken=decode(token);
      if(decodedToken.exp*1000<new Date().getTime()) handleLogout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])

  const handleLogout=()=>{
      dispatch({type:'LOGOUT'})
      history.push('/');
      setUser(null);
      errorToast('Logged out Successfully');
      
  }
  
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
              <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.result?.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
            </div>
        ):(
            <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
