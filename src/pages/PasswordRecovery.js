import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import Controls from "../components/Controls";
import { useForm, Form } from "../components/useForm";
import EmailIcon from "@material-ui/icons/Email";
import { Typography } from "@material-ui/core";
import {
  validateUserName,
  validatePassword,
  validateEmail,
} from "../components/Validators";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5),
    },
  },

  paper: {
    marginTop: theme.spacing(10),
  },
  paperDiv: {
    padding: `${theme.spacing(0)}px ${theme.spacing(0)}px ${theme.spacing(
      4
    )}px ${theme.spacing(0)}px !important`,
  },
  disabledSubmit: {
    backgroundColor: `${theme.palette.grey[300]} !important`,
    width: 250,
    minHeight: 50,
  },
  activeSubmit: {
    backgroundColor: "#236CC7 !important",
    width: 250,
    minHeight: 50,
  },
}));

const SignIN = () => {
  const classes = useStyles();


  return (
    <Form>
      <Grid container>
        <Controls.Input
          name="username"
          placeholder="Username"
          startAdornment={<EmailIcon />}
          fullWidth={true}
          size="medium"
        />
      </Grid>
      <Grid container alignItems="center">
        <Grid container justify="center" style={{ marginTop: 20 }}>
          <Controls.Button
            type="submit"
            text="SEND RESET LINK"
            style={{ backgroundColor: "#236CC7" }}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

export default function PasswordRecovery() {
  const [selected, setSelected] = useState(0);
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={1} sm></Grid>
      <Grid item xs={0} md={5}></Grid>
      <Grid item xs={12} sm={10} md={7} className={classes.wrapper}>
        <Controls.Paper
          className={classes.paper}
          divClassName={classes.paperDiv}
        >
          <Grid container alignItems="center">
            <Grid
              item
              xs={12}
              style={{
                backgroundColor: "#236CC7",
                boxShadow: "0px 2px 2px 1px rgba(0,0,0,0.21)",
                minHeight: 50,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                style={{
                  marginTop: "10px",
                  fontWeight: 600,
                  color:"white"
                }}
              >
                Forgot Password?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h7"
                align="left"
                style={{
                  marginTop: "20px",
                  marginLeft: 40,
                  marginRight: 40,
                  fontWeight: 600,
                }}
                component="div"
              >
                Enter the email address associated with your account and we will
                send you a link to reset your password.
              </Typography>
            </Grid>
          </Grid>
          <SignIN />

          <Grid container justify="center" style={{ marginTop: "10px" }}>
            <span>Back to Sign In</span>
          </Grid>
        </Controls.Paper>
      </Grid>
      <Grid item xs={1} sm></Grid>
    </Grid>
  );
}
