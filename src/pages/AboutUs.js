import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Controls from "../components/Controls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "./../assets/1.png";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: theme.spacing(7),
  },
}));

const AboutUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainDiv}>
      <Header/>

      <Container>
    <Grid container >
      <Grid item xs={12} >
        <Controls.Paper>
          <Grid container >
            <Grid item xs={12}>
            <div >
              <img alt="complex" src={Image} style={{maxHeight:"100%", maxWidth:"100%"}}/>
            </div>
              
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{textAlign:'center'}} alignItems="flex-start">
                <Grid item xs={12}>
                  <Typography variant="h5" style={{fontWeight:"bold"}}>About Us</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                  Behind every review is an experience that matters.
                  Read reviews. Write reviews. Share experiences.
                  Receive the best recommendations.
                  Get the product or service you desire with feedback you need from people like you.
                  Choose confidently with Reviewia.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Controls.Paper>
      </Grid>
    </Grid>
  </Container>
      <div style={{position:"fixed",bottom:0, left:0, right:0, marginBottom:10}}>
        <Footer/>
      </div>
      
    </div>
  )
};

export default AboutUs;
