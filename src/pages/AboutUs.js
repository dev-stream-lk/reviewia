import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Controls from "../components/Controls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "./../assets/1.png";
import {UserContext} from '../context/UserContext';

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: theme.spacing(7),
  },
}));

const AboutUs = (props ) => {
  const classes = useStyles();

  return (
    <UserContext.Consumer>
      { ({userData, setUserData}) => (
        <>
          <Header userData={userData} setUserData={setUserData} />
          <Grid container>
            <Grid item xs={12}>
              <Controls.Paper>
                <Grid container>
                  <Grid item xs={12}>
                    <div>
                      <img
                        alt="complex"
                        src={Image}
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      style={{ textAlign: "center" }}
                      alignItems="flex-start"
                    >
                      <Grid item xs={12}>
                        <Typography variant="h4" style={{ marginBottom:20 }}>
                          About Us
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography align="left" variant="body1" gutterBottom>
                          body1. Lorem ipsum dolor sit amet, consectetur
                          adipisicing elit. Quos blanditiis tenetur unde suscipit,
                          quam beatae rerum inventore consectetur, neque
                          doloribus, cupiditate numquam dignissimos laborum fugiat
                          deleniti? Eum quasi quidem quibusdam. body1. Lorem ipsum
                          dolor sit amet, consectetur adipisicing elit. Quos
                          blanditiis tenetur unde suscipit, quam beatae rerum
                          inventore consectetur, neque doloribus, cupiditate
                          numquam dignissimos laborum fugiat deleniti? Eum quasi
                          quidem quibusdam.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Controls.Paper>
            </Grid>
          </Grid>
          <Footer />
        </>
      ) }
    </UserContext.Consumer>
  );
};

export default AboutUs;
