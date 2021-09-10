import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ThumbUp from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDown from "@material-ui/icons/ThumbDownAltOutlined";
import { Rating, Skeleton } from "@material-ui/lab";
import { IconButton } from "@material-ui/core";
import ReportIcon from '@material-ui/icons/Report';
import Controls from './Controls';
import {getDateTime} from '../utils/dateTime';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding:0
  },
  typography: {
    textAlign: "start",
  },
  paper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border:"2px solid #eee",
    // padding:10,
    margin:0
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  reviewHeaderAndFooter:{
    background:"#eee",
    padding: "0px 10px"
  }
}));

export default function Review(props) {
  const classes = useStyles();
  const { setReportReviewId, review } = props;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <Grid
                  container
                >
                  <Grid container
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.reviewHeaderAndFooter}
                    >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Skeleton
                        animation="wave"
                        variant="circle"
                        width={40}
                        height={40}
                        style={{ margin: 10 }}
                      />
                      <div style={{display:"flex", flexDirection:"column", paddingLeft:10}}>
                        <Typography variant="h6" style={{fontSize:17,textAlign:"left"}}>{review.reviewedBy}</Typography>
                        <Typography variant="caption">{getDateTime(review.createdAt)}</Typography>
                      </div>
                    </div>
                    <Rating
                      value={review.userRate}
                      name="byRating"
                      precision={0.25}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} style={{padding:"10px 20px"}}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      className={classes.typography}
                    >
                      {review.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justifyContent="flex-end" className={classes.reviewHeaderAndFooter}>
                      <IconButton
                        color="secondary"
                        aria-label="report"
                        component="span"
                        onClick={() => setReportReviewId(review.reviewId)}
                        title="Report Review"
                      >
                        <ReportIcon />
                      </IconButton>
                        <IconButton
                          color="primary"
                          aria-label="Like"
                          component="span"
                          title="Like"
                        >
                        <ThumbUp />
                      </IconButton>

                      <IconButton
                        color="primary"
                        aria-label="Dislike"
                        component="span"
                        title="Dislike"
                      >
                        <ThumbDown />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
