import React, { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LockOutlined } from "@mui/icons-material";
import Input from "./Input";
import GoogleLogin from "react-google-login";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
}));

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSingUp] = useState(false);
  const navigate = useNavigate();

  const onSwitchMode = () => {
    setForm(initialState);
    setIsSingUp((prev) => !prev);
    setShowPassword(false);
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(form, navigate));
    } else {
      dispatch(signIn(form, navigate));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({
        type: "AUTH",
        data: { result, token },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("gagal login google");
  };

  return (
    <Container component={"main"} maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                  type="text"
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  type="text"
                />
              </>
            )}
            <Input
              name={"email"}
              label={"Email Address"}
              handleChange={handleChange}
              type={"email"}
            />
            <Input
              name={"password"}
              label={"Password"}
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name={"confirmPassword"}
                label={"Repeat Password"}
                handleChange={handleChange}
                type={"password"}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="875299172630-4ga0o6p9018bcba1kasq8ft0sb67amkl.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Button onClick={onSwitchMode}>
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
