import {
  Avatar,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  makeStyles,
  Typography,
  List,
  IconButton,
  CardMedia,
  Container,
} from "@material-ui/core";
import Button from "../../components/basic/Button";
import React, { useState, useEffect } from "react";
import { PreLoader } from "../../components/basic/PreLoader";
import Controls from "../../components/Controls";
import { getReportedPosts } from "../../services/adminPosts";
import { BlockOutlined } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
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
    marginTop: 5,
  },
  media: {
      width:"100%"
     // 16:9
  },
}));

const ReportedPost=(props)=>{
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [reportedPosts, setReportedPosts] = useState([]);

    const getRepotedDetails = async () => {
      let data = await getReportedPosts();
      if (data) {
        setReportedPosts(data);
        console.log(data);
        // setListLoading(false);
      }
    };

    const handleExpandClick = () => {
      setExpanded(!expanded);
      getRepotedDetails();
    };
    return (
      <Grid
        container
        xs={12}
        sm={12}
        md={12}
        style={{ position: "relative", width: "100%" }}
      >
        <Controls.Card className={classes.productListcard} variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                D
              </Avatar>
            }
            action={
              <IconButton aria-label="delete" className={classes.margin}>
                <BlockOutlined fontSize="large" color="secondary" />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />

          {/* <CardMedia
            className={classes.media}
            image="https://lifemobile.lk/wp-content/uploads/2021/04/OnePlus-9.jpg"
            title="Paella dish"
          /> */}
          <CardContent>
            <div className={classes.media}>
              <img
                style={{ width: "100%", height: "100%" }}
                src="https://lifemobile.lk/wp-content/uploads/2021/04/OnePlus-9.jpg"
              ></img>
            </div>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: "5%",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              Show report details
            </Button>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <List style={{ maxHeight: "70vh", overflow: "auto" }}>
                {reportedPosts.map((post, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={12}
                    justifyContent="center"
                    style={{ width: "100%" }}
                  >
                    <ReportCardDetail post={post} ls={1} />
                  </Grid>
                ))}
              </List>
            </CardContent>
          </Collapse>
        </Controls.Card>
      </Grid>
    );
}

const ReportCardDetail = (props) => {
  const classes = useStyles();
  const { post, ls } = props;

  return (
    <Grid container xs={12} style={{ position: "relative", width: "100%" }}>
      <Controls.Card className={classes.productListcard} variant="outlined">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {post.reportedBy[0]}
            </Avatar>
          }
          action={
            // <IconButton aria-label="settings" color="default"></IconButton>
            <Typography style={{ justifyContent: "center" }}>
              POST ID:{post.subjectId} {ls}
            </Typography>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography style={{ marginRight: 20 }}>Reported By :</Typography>
            {post.reportedBy}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography style={{ marginRight: 20 }}>Reason :</Typography>
            {post.reason}
          </Typography>
        </CardContent>
    </Controls.Card>
    </Grid>
  );
};

const ReportCard = (props) => {
  const classes = useStyles();
  const { post, ls , loadPost } = props;

  return (
    <Grid container xs={12} style={{ position: "relative", width: "100%" }}>
      <Controls.Card className={classes.productListcard} variant="outlined">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {post.reportedBy[0]}
            </Avatar>
          }
          action={
            // <IconButton aria-label="settings" color="default"></IconButton>
            <Typography style={{ justifyContent: "center" }}>
              POST ID:{post.subjectId} {ls}
            </Typography>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography style={{ marginRight: 20 }}>Reported By :</Typography>
            {post.reportedBy}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography style={{ marginRight: 20 }}>Reason :</Typography>
            {post.reason}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="blue"
            style={{ backgroundColor: "#152840", color: "white" }}
            onClick={props.loadPost}
          >
            See More
          </Button>
          <Typography>Here report ID: {post.id}</Typography>
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
  const [reportedPosts, setReportedPosts] = useState([]);
  const [loadPost, setLoadPost] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setListLoading(true);
    let data = await getReportedPosts();
    if (data) {
      setReportedPosts(data);
      console.log(data);
      setListLoading(false);
    }
  }, []);

  const loadThePost =()=>{
      console.log("hello");
      setLoadPost(!loadPost);
  }

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

            <Grid
              item
              xs={12}
              md={12}
              style={{ marginLeft: 5, marginRight: 5, position: "relative" }}
            >
              <PreLoader loading={listLoading} />
              <List style={{ maxHeight: "70vh", overflow: "auto" }}>
                {reportedPosts.map((post, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={12}
                    justifyContent="center"
                    style={{ width: "100%" }}
                  >
                    {selected === 1 ? (
                      <ReportCard post={post} ls={1} loadPost={loadThePost} />
                    ) : (
                      <ReportCard post={post} ls={0} loadPost={loadThePost} />
                    )}
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
            <Grid container alignContent="center" sm={12} xs={12} md={12} style={{width:"100%"}}>
              {loadPost ? <ReportedPost></ReportedPost> : <Typography>still not</Typography>}
            </Grid>
          </Grid>
        </Controls.Paper>
      </Grid>
    </Grid>
  );
}
