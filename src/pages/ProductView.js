import { Container, Grid, makeStyles, Typography, Paper, Box } from "@material-ui/core";
import React from "react";
import Button from "../components/basic/Button";
import Controls from "../components/Controls";
import Review from "../components/Review";

const useStyles = makeStyles( theme => ({
  root: {
    flexGrow: 1,
    spacing:0,
    direction:"row",
    alignContent:"center",
    justify:"center",
  },
  wrapper:{
      marginTop: theme.spacing(5),
      marginLeft: 0,
      marginRight: 0,
      alignContent: "space-between"
  },
  container: {
      margin: theme.spacing(0),
      padding: theme.spacing(4),
  },
  paper: {
      marginTop: theme.spacing(10),
      // borderRadius:"10px",
      // overflow:"hidden",
      // boxShadow:"0px 0px 5px 2px rgba(0,0,0,0.21)",
  },
}))

const ProductView = () => {

  const classes = useStyles();

  return (
  <Container className={classes.root}>
  <Grid container className={classes.wrapper} spacing="5">
   <Grid item xs={12} sm={4}>
   
      <Grid container justify="center">
      <Grid item xs={12}>
        <Paper alig>s</Paper>
      </Grid>
      <Grid item xs={12}>
        <Controls.Paper>s</Controls.Paper>
      </Grid>
      </Grid>

   </Grid>
    
   <Grid item xs={12} sm={8}>
     <Grid container   >
       <Grid item xs={6}><Typography variant="h5">Product Name</Typography></Grid>
       <Grid item xs={6}><Button></Button></Grid>
       <Grid item xs={12}>
         <Paper className={useStyles.paper}>
           <Grid container className={classes.container}>
             <Grid item xs={1}><Typography variant="h5">Reviews</Typography></Grid>
             <Grid item xs={12} style={{maxHeight: 'auto', height: '70vh', overflow: 'auto', paddingTop: '10px'}}>
                <Review/>
               <Review/>
               <Review/>
               <Review/>
             </Grid>
           </Grid>
         </Paper>
       </Grid>
     </Grid>
   </Grid>
 </Grid>
 </Container>
 )
};

export default ProductView;
