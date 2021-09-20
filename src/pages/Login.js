import { Checkbox, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import { useForm, Form } from "../components/useForm";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import {
  validateUserName,
  validatePassword,
  validateEmail,
  validateName,
  requiredField,
} from "../components/Validators";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { user_login, user_register } from "../services/auth";
import MainImage from "../static/img/login_img.svg";
import {
  getCookie,
  getCookies,
  setCookie,
  setCookies,
} from "../services/cookies";
import { UserContext } from "../context/UserContext";
import { PreLoader } from "../components/basic/PreLoader";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5),
    },
  },

  paper: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(8),
    }
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
    textDecoration: "none",
  },
  leftSection:{
    marginTop:20,
    [theme.breakpoints.up("md")]: {
      marginTop:80,
    }
  }
}));

const SignIN = (props) => {
  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);
  const [disableSubmit, setDisabledSubmit] = useState(true);
  const history = useHistory();
  const [visibility, setVisibility] = useState(false);
  const [showError, setShowError] = useState("");
  const { commonMsg, setCommonMsg, setLoading } = props;

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const validate = (fieldValues = values) => {
    let temp = {};

    if ("email" in fieldValues) temp.email = validateEmail(fieldValues.email);
    if ("password" in fieldValues)
      temp.password = requiredField(fieldValues.password);

    setErrors({
      ...errors,
      ...temp,
    });
    let isValid = Object.values({ ...errors, ...temp }).every((x) => x == "");
    let len = Object.getOwnPropertyNames(fieldValues).length;
    if (len != 1) {
      if (isValid) {
        setDisabledSubmit(false);
      } else {
        setDisabledSubmit(true);
      }
    } else {
      if (!("rememberMe" in fieldValues)) {
        const temp2 = {};
        if (!"email" in fieldValues)
          temp2.email = validateEmail(fieldValues.email);
        if (!"password" in fieldValues)
          temp2.password = requiredField(fieldValues.password);

        let isValidAll = Object.values(temp2).every((x) => x == "");
        if (isValid && isValidAll) {
          setDisabledSubmit(false);
        } else {
          setDisabledSubmit(true);
        }
      }
    }

    return isValid;
  };
  const { values, setValues, handleInputChange, errors, setErrors } = useForm(
    initialValues,
    true,
    validate
  );

  const handleOnSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    setCommonMsg({});
    if (values.rememberMe) {
      setCookie("password", values.password, 30);
    }

    const token = await user_login({
      email: values.email,
      password: values.password,
    });
    if (token) {
      setUserData({
        userData: { ...userData, token: token, isLoggedIn: true },
        setUserData,
      });
      setShowError("");
      history.push("/");
      window.location.reload();
    } else {
      setShowError("Invalid email or password");
    }
    setLoading(false);
  };

  useEffect(() => {
    let email = getCookie("email");
    let password = getCookie("password");
    if (email) {
      setValues({ ...values, email, password });
      validate({ email, password });
    }
  }, []);

  return (
    <Form onSubmit={handleOnSubmit}>
      {showError ? (
        <Grid container>
          <Typography
            align="left"
            variant="caption"
            style={{
              color: "red",
              fontSize: 16,
              fontWeight: "bold",
              paddingLeft: 40,
            }}
          >
            {showError}
          </Typography>
        </Grid>
      ) : null}
      {
        (commonMsg.for =
          "signin" && commonMsg.isError == false ? (
            <Grid container>
              <Typography
                align="left"
                variant="caption"
                style={{
                  color: "green",
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingLeft: 40,
                }}
              >
                {commonMsg.msg}
              </Typography>
            </Grid>
          ) : null)
      }

      <Grid container>
        <Controls.Input
          name="email"
          placeholder="Email Address"
          startAdornment={<EmailIcon />}
          fullWidth={true}
          size="medium"
          value={values.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Controls.Input
          name="password"
          placeholder="Password"
          startAdornment={<LockIcon />}
          endAdornment={
            visibility ? (
              <VisibilityIcon
                style={{ cursor: "pointer" }}
                onClick={() => setVisibility(false)}
              />
            ) : (
              <VisibilityOffIcon
                style={{ cursor: "pointer" }}
                onClick={() => setVisibility(true)}
              />
            )
          }
          fullWidth={true}
          size="medium"
          type={visibility ? "text" : "password"}
          onChange={handleInputChange}
          value={values.password}
          error={errors.password}
        />
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6}>
          <Controls.Checkbox
            name="rememberMe"
            label="Remember Me"
            color="primary"
            checked={values.rememberMe}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link
            to={{ pathname: "/passwordRecovery" }}
            underline="none"
            style={{ textDecoration: "none" }}
          >
            Forgot Password?
          </Link>
        </Grid>
        <Grid container justifyContent="center" style={{ marginTop: 20 }}>
          <Controls.Button
            type="submit"
            text="Sign In"
            className={
              disableSubmit ? classes.disabledSubmit : classes.activeSubmit
            }
            {...(disableSubmit ? { disabled: true } : {})}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

const SignUp = (props) => {
  const classes = useStyles();
  const [disableSubmit, setDisabledSubmit] = useState(true);
  const { userData, setUserData } = useContext(UserContext);
  const { setSelected, commonMsg, setCommonMsg, setLoading } = props;
  const [visibility, setVisibility] = useState(false);
  const history = useHistory();
  const [error, setError] = useState("");

  const callback = (res) => {
    if (res.status == 201) {
      setSelected(0);
    } else {
      setError("Error..");
    }
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
    termsAgree: false,
  };

  const validate = (fieldValues = values) => {
    let temp = {};
    if ("firstName" in fieldValues)
      temp.firstName = validateName(fieldValues.firstName);
    if ("lastName" in fieldValues)
      temp.lastName = validateName(fieldValues.lastName);
    if ("email" in fieldValues) temp.email = validateEmail(fieldValues.email);
    if ("password" in fieldValues)
      temp.password = validatePassword(fieldValues.password);
    if ("cpassword" in fieldValues)
      temp.cpassword = validatePassword(fieldValues.cpassword, values.password);
    if ("termsAgree" in fieldValues) {
      temp.termsAgree =
        fieldValues.termsAgree == true
          ? ""
          : "You must agree to term and conditions.";
    }

    setErrors({
      ...errors,
      ...temp,
    });
    let isValid = Object.values({ ...errors, ...temp }).every((x) => x == "");
    let len = Object.getOwnPropertyNames(fieldValues).length;
    if (len === 1 && "termsAgree" in fieldValues) {
      let customdata = { ...values };
      delete customdata.termsAgree;
      if (isValid && validate(customdata)) {
        setDisabledSubmit(false);
      } else {
        setDisabledSubmit(true);
      }
    } else {
      if (isValid && values.termsAgree) {
        setDisabledSubmit(false);
      } else {
        setDisabledSubmit(true);
      }
    }

    return isValid;
  };
  const { values, setValues, handleInputChange, errors, setErrors } = useForm(
    initialValues,
    true,
    validate
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      let res = await user_register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      if (res === true) {
        setSelected(0);
        setCommonMsg({
          for: "signin",
          isError: false,
          msg: "Please verify your email",
        });
      } else {
        setError(res);
      }
    } else {
      console.log("invalid");
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      {error.length ? (
        <Typography
          align="left"
          variant="caption"
          style={{
            color: "red",
            fontSize: 16,
            fontWeight: "bold",
            paddingLeft: 40,
          }}
        >
          {error}
        </Typography>
      ) : null}
      <Grid container>
        <Controls.Input
          name="firstName"
          placeholder="First Name"
          startAdornment={<PersonIcon />}
          fullWidth={true}
          size="medium"
          value={values.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
        />
        <Controls.Input
          name="lastName"
          placeholder="Last Name"
          startAdornment={<PersonIcon />}
          fullWidth={true}
          size="medium"
          value={values.lastName}
          onChange={handleInputChange}
          error={errors.lastName}
        />
        <Controls.Input
          name="email"
          placeholder="Email"
          startAdornment={<EmailIcon />}
          fullWidth={true}
          size="medium"
          value={values.email}
          onChange={handleInputChange}
          error={errors.email}
        />
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
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Controls.Checkbox
              name="termsAgree"
              color="primary"
              checked={values.termsAgree}
              onChange={handleInputChange}
              label={
                <Typography variant="subtitle1">
                  I read and agree to{" "}
                  <Link to={{ pathname: "/termsOfService" }}>
                    {" "}
                    terms & conditions
                  </Link>
                </Typography>
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
        <Grid container justifyContent="center" style={{ marginTop: 20 }}>
          <Controls.Button
            type="submit"
            text="Sign Up"
            className={
              disableSubmit ? classes.disabledSubmit : classes.activeSubmit
            }
            {...(disableSubmit ? { disabled: true } : {})}
          />
        </Grid>
      </Grid>
    </Form>
  );
};

export default function Login(props) {
  const history = useHistory();
  const location = useLocation();
  const { userData, setUserData } = useContext(UserContext);
  const [commonMsg, setCommonMsg] = useState({
    for: "",
    isError: false,
    msg: "",
  });
  const [loading, setLoading] = useState(false);
  var register = 0;
  if (location.state) {
    register = location.state.register;
  }

  useEffect(() => {
    if (userData) {
      if (userData.isLoggedIn == true) {
        history.push("/");
      }
    }
  }, [userData]);

  const [selected, setSelected] = useState(register);
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} className={classes.leftSection}  md={5}>
        <Grid
          container
          justifyContent="center"
          style={{ flexDirection: "column" }}
        >
          <Typography
            variant="h3"
            align="center"
            className={classes.title}
            component={Link}
            to="/"
          >
            Reviewia
          </Typography>
          {/* <Grid item xs={12} > */}
          <img src={MainImage} className={classes.loginImage} />
          {/* </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} md={7} className={classes.wrapper}>
        <Controls.Paper
          className={classes.paper}
          divClassName={classes.paperDiv}
          style={{ position: "relative" }}
        >
          <PreLoader loading={loading} />
          <Grid container alignItems="center">
            <Grid
              item
              xs={6}
              style={
                selected === 0
                  ? { backgroundColor: "#236CC7" }
                  : { boxShadow: "0px 2px 2px 1px rgba(0,0,0,0.21)" }
              }
            >
              <Controls.ActionButton
                onClick={() => setSelected(0)}
                style={{
                  width: "100%",
                  height: "100%",
                  ...(selected === 0 ? { color: "white" } : { color: "black" }),
                }}
              >
                Sign In
              </Controls.ActionButton>
            </Grid>
            <Grid
              item
              xs={6}
              style={
                selected === 1
                  ? { backgroundColor: "#236CC7" }
                  : { boxShadow: "0px 2px 2px 1px rgba(0,0,0,0.21)" }
              }
            >
              <Controls.ActionButton
                onClick={() => setSelected(1)}
                style={{
                  width: "100%",
                  height: "100%",
                  ...(selected === 1 ? { color: "white" } : { color: "black" }),
                }}
              >
                Register
              </Controls.ActionButton>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                align="left"
                style={{ marginTop: "20px", marginLeft: 40, fontWeight: 600 }}
                component="div"
              >
                We are happy to have you here
              </Typography>
            </Grid>
          </Grid>
          {selected === 0 ? (
            <SignIN
              setLoading={setLoading}
              commonMsg={commonMsg}
              setCommonMsg={setCommonMsg}
            />
          ) : (
            <SignUp
              setLoading={setLoading}
              commonMsg={commonMsg}
              setCommonMsg={setCommonMsg}
              setSelected={setSelected}
            />
          )}

          {/* <Grid container justifyContent="center" style={{ marginTop:"10px"}}>
                        <span>------- Or register with --------</span>
                    </Grid>
                    <Grid container justifyContent="center" style={{ marginTop:"10px"}}>
                        <FacebookIcon/>
                        <TwitterIcon/>
                        <LinkedInIcon/>
                    </Grid> */}
        </Controls.Paper>
      </Grid>
    </Grid>
  );
}
