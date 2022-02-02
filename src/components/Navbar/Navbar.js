import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import memories from "../../images/memories.png";
import jwtDecode from "jwt-decode";

// react-router-dom;
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  },
  heading: {
    color: "black",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    // jwt...
    if(token) {
      const decodedToken = jwtDecode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()){
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Typography className={classes.heading} variant="h3" align="center">
              Memories
            </Typography>
          </Link>
          <img
            className={classes.image}
            src={memories}
            alt="memories"
            height="60"
          />
        </div>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button variant="contained" color="secondary" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="contained" color="primary">
              <Link
                to="/auth"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign In
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
