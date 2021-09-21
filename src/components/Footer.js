import {
  Button,
  Grid,
  Link as MuiLink,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Controls from "./Controls";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    minHeight: 80,
    zIndex: theme.zIndex.drawer + 1,
  },
  footerContactDetails: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: theme.spacing(2),
    },
  },
  footerLinkSection: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: theme.spacing(2),
    },
  },
  footerLink: {
    color: "white",
    cursor: "pointer",
    display: "block",
  },
  socialLinks: {
    marginRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginRight: theme.spacing(0),
      width: "100%",
      marginTop: theme.spacing(2),
    },
  },
  footerItemSection: {
    [theme.breakpoints.down("sm")]: {
      order: 5,
    },
  },
}));

export default function Footer() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid container alignItems="center" id="footer" className={classes.footer}>
      <Grid item xs={12} md={4} className={classes.footerItemSection}>
        <p>Copyrights all Reserved by Reviewia</p>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container alignItems="center">
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            className={classes.footerContactDetails}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <PhoneAndroidIcon />
              <span>+94 772345678</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <EmailIcon />
              <span>info@reviewia.com</span>
            </div>
          </Grid>
          <Grid item xs={true}></Grid>
          <Grid
            item
            className={classes.footerLinkSection}
            xs={12}
            sm={6}
            md={4}
            align="left"
          >
            <MuiLink
              className={classes.footerLink}
              component={Link}
              to="/about"
            >
              About Us
            </MuiLink>
            <MuiLink className={classes.footerLink}>Contact Us</MuiLink>
          </Grid>
          <Grid item className={classes.socialLinks}>
            <FacebookIcon />
            <TwitterIcon />
            <LinkedInIcon />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
