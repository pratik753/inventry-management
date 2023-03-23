import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import m3 from "../../images/m3.jpg";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import decode from "jwt-decode";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CreateProfile from "./CreateProfile";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const NavBar = () => {
  const [opend, setOpend] = React.useState(false);
  const handleOpend = () => setOpend(true);
  const handleClosed = () => setOpend(false);
  const classes = useStyles();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  // console.log(user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    // JWT
    setUser(JSON.parse(localStorage.getItem("profile")));
    return ()=> console.log("hi")
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "CLEAR" });
    history.push("/");
    // setUser(null);
  };
  const allRequest = () => {
    // dispatch({ type: "LOGOUT" });
    // dispatch({ type: "CLEAR" });
    history.push("/allRequest");
    // setUser(null);
  };
  const dashboard = () => {
    history.push("/");
    // setUser(null);
  };
  const AddProduct = () => {
    history.push("/addProduct");
    // setUser(null);
  };
  const signInHandler = () => {
    history.push("/auth");
    // setUser(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h4"
          align="center"
        >
          Laundry Service
        </Typography>
        <img className={classes.image} src={m3} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <>
            <div className={classes.profile}>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={dashboard}
              >
                Dashboard
              </Button>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={allRequest}
              >
                Invoice
              </Button>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={AddProduct}
              >
                Add Product
              </Button>
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                src={user?.result.imageUrl}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
              <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleOpend}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem  onClick={logout}>Logout</MenuItem>
            </Menu>
              
            </div>
          </>
        ) : (
          <button
            
            
           
            onClick={signInHandler}
          >
            Sign In
          </button>
        )}
      </Toolbar>
    </AppBar>
    <Modal
    open={opend}
    onClose={handleClosed}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <CreateProfile/>
    </Box>
  </Modal>
    </>
  );
};
export default NavBar;
