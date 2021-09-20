import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import Controls from "../components/Controls";
import { useForm, Form } from "../components/useForm";
import EmailIcon from "@material-ui/icons/Email";
import { Typography } from "@material-ui/core";
import Footer from "../components/Footer";
import { validateEmail, validatePassword } from "../components/Validators";
import MainImage from "../static/img/login_img.svg";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import { passwordRecovery } from "../services/auth";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

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
  loginImage: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inherit",
    },
  },
  title: {
    color: `${theme.palette.primary.main} !important`,
  },
}));

const RecoveryForm = (props) => {
  const classes = useStyles();
  const { userData, setUserData } = props;
  const [visibility, setVisibility] = useState(false);
  const [disableSubmit, setDisabledSubmit] = useState(true);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const initialState = {
    email: "",
    password: "",
    cpassword: ""
  };

  const validate = (fieldValues = values) => {
    let temp = {};

    if ("email" in fieldValues) temp.email = validateEmail(fieldValues.email);
    if ("password" in fieldValues)
    temp.password = validatePassword(fieldValues.password);
  if ("cpassword" in fieldValues)
    temp.cpassword = validatePassword(fieldValues.cpassword, values.password);

    setErrors({
      ...errors,
      ...temp,
    });
    let isValid = Object.values({
      ...errors,
      ...temp,
    }).every((x) => x == "");
    if (isValid){
      setDisabledSubmit(false)
    }else{
      setDisabledSubmit(true);
    }
    return isValid;
  };

  const { values, setValues, handleInputChange, errors, setErrors } = useForm(
    initialState,
    true,
    validate
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validate()){
      const result = await passwordRecovery(values.email,values.password);
      if (result) {
        setValues(initialState);
        setMsg("Password reset email sent. Please check your emails.")
        setError("");
      }else{
        setError("Password reset failed. Try again later.")
        setMsg("");
      }
    }
  };

  return (
    <Form>
      {
        msg !== "" && (
          <Grid container justifyContent="center" style={{padding:8, marginBottom:20, background:"#aaffaa", color:"green"}}>
            <Typography variant="subtitle1" style={{fontWeight:600}}>
              {msg}
            </Typography>
          </Grid>
        )
      }

      {
        error !== "" && (
          <Grid container justifyContent="center" style={{padding:8, marginBottom:20, background:"#ffaaaa", color:"red"}}>
            <Typography variant="subtitle1" style={{fontWeight:600}}>
              {error}
            </Typography>
          </Grid>
        )
      }
      <Grid container>
        <Controls.Input
          name="email"
          placeholder="Email"
          startAdornment={<EmailIcon />}
          fullWidth={true}
          size="medium"
          value={values.email}
          error={errors.email}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid container>
        <Controls.Input
          name="password"
          placeholder="Password"
          startAdornment={<LockIcon />}
          endAdornment={
            visibility ? (
              <VisibilityIcon
                onClick={() => setVisibility(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => setVisibility(true)}
                style={{ cursor: "pointer" }}
              />
            )
          }
          fullWidth={true}
          size="medium"
          type={visibility ? "text" : "password"}
          value={values.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        <Controls.Input
          name="cpassword"
          placeholder="Confirm Password"
          startAdornment={<LockIcon />}
          endAdornment={
            visibility ? (
              <VisibilityIcon
                onClick={() => setVisibility(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => setVisibility(true)}
                style={{ cursor: "pointer" }}
              />
            )
          }
          fullWidth={true}
          size="medium"
          type={visibility ? "text" : "password"}
          value={values.cpassword}
          onChange={handleInputChange}
          error={errors.cpassword}
        />
      </Grid>
      <Grid container alignItems="center">
        <Grid container justify="center" style={{ marginTop: 20 }}>
          <Controls.Button
            disabled={disableSubmit}
            type="submit"
            text="Reset Password"
            onClick={handleSubmit}
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
    <>
      <Grid container style={{ marginBottom: 40 }}>
        <Grid item xs={1} sm></Grid>
        <Grid
          item
          xs={false}
          className={classes.loginImage}
          style={{ marginTop: 50 }}
          md={5}
        >
          <Grid
            container
            justifyContent="center"
            style={{ flexDirection: "column" }}
          >
            <Typography variant="h3" align="center" className={classes.title}>
              Reviewia
            </Typography>
            <img src={MainImage} />
          </Grid>
        </Grid>
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
                    color: "white",
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
                  Enter the email address associated with your account and we
                  will send you a link to reset your password.
                </Typography>
              </Grid>
            </Grid>
            <RecoveryForm />

            <Grid container justify="center" style={{ marginTop: "10px" }}>
              <span>
                Back to{" "}
                <Link
                  component={RouterLink}
                  to={{ pathname: "/login" }}
                  underline="hover"
                >
                  {" "}
                  Sign In
                </Link>
              </span>
            </Grid>
          </Controls.Paper>
        </Grid>
        <Grid item xs={1} sm></Grid>
      </Grid>
      <Footer />
    </>
  );
}
