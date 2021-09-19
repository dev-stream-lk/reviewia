import {
  Avatar,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  makeStyles,
  Typography,
  IconButton,
  Paper,
  List,
} from "@material-ui/core";
import Button from "../../components/basic/Button";
import React, { useState, useEffect, useContext } from "react";
import { PreLoader } from "../../components/basic/PreLoader";
import Controls from "../../components/Controls";
import { getReportedPosts } from "../../services/adminPosts";
import { ContactlessOutlined } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2),
    },
  },

  paper: {
    marginTop: theme.spacing(0),
  },
  paperDiv: {
    padding: `${theme.spacing(0)}px ${theme.spacing(0)}px ${theme.spacing(
      4
    )}px ${theme.spacing(0)}px !important`,
  },
  productListcard: {
    width: "100%",
    backgroundColor: "#CCDEF5",
    marginBottom: 5,
    marginTop:5,
  },
}));

const ProductCard = () => {
  const classes = useStyles();
//   const { post } = props;

  return (
    <Grid container xs={12} style={{ position: "relative", width: "100%" }}>
      <Controls.Card className={classes.productListcard} variant="outlined">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              DB
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" color="default"></IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal.
          </Typography>
        </CardContent>
        <CardActions style={{justifyContent:'space-between',}}>
          <Button
            variant="contained"
            color="blue"
            style={{ backgroundColor: "#152840", color: "white" }}
            onClick={() => {
              console.log("hello Click the button");
            }}
          >
            See More
          </Button>
          <Typography>
              Here report ID:
          </Typography>
        </CardActions>
      </Controls.Card>
    </Grid>
  );
};

export default function ReportedBannedPost() {
  const classes = useStyles();
  var flag = 0;
  const [selected, setSelected] = useState(flag);
  const [listLoading, setListLoading] = useState(true);
  const [reportedPosts,setReportedPosts] = useState([]);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
      let data = await getReportedPosts();
      if (data) {
        setReportedPosts(data);
        console.log(data);
        setListLoading(false);
      }
  },[]);




  return (
    <Grid container spacing={2} xs={12} sm={12} md={12}>
      <Grid item xs={12} sm={12} md={6} className={classes.wrapper}>
        <Controls.Paper
          className={classes.paper}
          divClassName={classes.paperDiv}
        >
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
                Reported Posts
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
                Banned Posts
              </Controls.ActionButton>
            </Grid>

            <PreLoader loading={listLoading} />

            <Grid
              item
              xs={12}
              md={12}
              style={{ marginLeft: 5, marginRight: 5 }}
            >
                <List style={{maxHeight:'70vh', overflow: 'auto'}}>
                  {reportedPosts.map((post, index) => (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      md={12}
                      justifyContent="center"
                      style={{ width: "100%" }}
                    >
                      <ProductCard></ProductCard>
                    </Grid>
                  ))}
                </List>
            </Grid>

            {/* <Typography
                variant="h6"
                align="left"
                style={{ marginTop: "20px", marginLeft: 40, fontWeight: 600 }}
                component="div"
              > </Typography> */}
          </Grid>
        </Controls.Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={6} className={classes.wrapper}>
        <Controls.Paper
          className={classes.paper}
          divClassName={classes.paperDiv}
        >
          <Grid container alignItems="center">
            <Grid
              item
              xs={12}
              //   style={
              //     selected === 0
              //       ? { backgroundColor: "#236CC7" }
              //       : { boxShadow: "0px 2px 2px 1px rgba(0,0,0,0.21)" }
              //   }
              style={{ backgroundColor: "#236CC7" }}
            >
              <Controls.ActionButton
                onClick={() => setSelected(0)}
                style={{
                  width: "100%",
                  height: "100%",
                  color: "white",
                  //   ...(selected === 0 ? { color: "white" } : { color: "black" }),
                }}
              >
                Reported Post Details
              </Controls.ActionButton>
            </Grid>
            <Grid alignContent="center" xs={12} md={12}>
              <Typography>Hello</Typography>
            </Grid>
            {/* <Typography
                variant="h6"
                align="left"
                style={{ marginTop: "20px", marginLeft: 40, fontWeight: 600 }}
                component="div"
              > </Typography> */}
          </Grid>
        </Controls.Paper>
      </Grid>
    </Grid>
  );
}
