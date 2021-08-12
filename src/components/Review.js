import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ThumbUp from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDown from "@material-ui/icons/ThumbDownAltOutlined";
import { Rating, Skeleton } from "@material-ui/lab";
import { IconButton } from "@material-ui/core";
import ReportIcon from '@material-ui/icons/Report';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typography: {
    textAlign: "start",
  },
  paper: {
    height: 250,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
}));

export default function Review({ description }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={40}
                      height={40}
                      style={{ margin: 10 }}
                    />
                    <span variant="h6">Review - 1</span>
                  </div>
                  <Rating
                    value={3.6}
                    name="byRating"
                    precision={0.25}
                    readOnly
                  />
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      className={classes.typography}
                    >
                      {description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justifyContent="flex-end">
                    <Grid item xs={2}>
                        <IconButton
                          color="secondary"
                          aria-label="report"
                          component="span"
                        >
                          <ReportIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          color="primary"
                          aria-label="Like"
                          component="span"
                        >
                          <ThumbUp />
                        </IconButton>
                      </Grid>

                      <Grid item xs={2}>
                        <IconButton
                          color="primary"
                          aria-label="Dislike"
                          component="span"
                        >
                          <ThumbDown />
                        </IconButton>
                      </Grid>
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
