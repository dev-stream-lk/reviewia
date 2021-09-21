import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ThumbUp from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDown from "@material-ui/icons/ThumbDownAltOutlined";
import { Rating, Skeleton } from "@material-ui/lab";
import { Avatar, IconButton } from "@material-ui/core";
import ReportIcon from "@material-ui/icons/Report";
import { getDateTime } from "../utils/dateTime";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { addOrRemoveReviewReact } from "../services/reviews";
import { UserContext } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "10px 0px",
  },
  typography: {
    textAlign: "start",
  },
  paper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "2px solid #eee",
    // padding:10,
    margin: 0,
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
  reviewHeader: {
    background: theme.palette.grey[200],
    padding: "0px 10px",
  },
  reviewFooter: {
    background: theme.palette.grey[100],
    padding: "0px 10px 8px 0px",
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const { setReportReviewId } = props;
  const [review, setReview] = useState(props.review);
  const { userData } = useContext(UserContext);
  var disabled = false;
  var likeString = "";
  var dislikeString = "";
  const initialDislikeCount = review.dislikeCount;
  const initialLikeCount = review.likeCount;
  const [likeDislike, setLikeDislike] = useState({
    like: false,
    dislike: false,
  });

  useEffect(() => {
    if (userData) {
      review.likedList.forEach((user) => {
        if (userData["email"] === user.email) {
          setLikeDislike({ like: true, dislike: false });
        }
      });

      if (!likeDislike.like) {
        review.dislikedList.forEach((user) => {
          if (userData["email"] === user.email) {
            setLikeDislike({ like: false, dislike: true });
          }
        });
      }
    }
  }, [userData]);

  const getRoundedString = (num) => {
    let numSufix = "";
    if (num > 1000) {
      num = (num / 1000).toFixed(1);
      numSufix = "K";
    }

    if (num > 1000) {
      num = (num / 1000).toFixed(1);
      numSufix = "M";
    }

    if (num > 1000) {
      num = (num / 1000).toFixed(1);
      numSufix = "B";
    }

    return num + numSufix;
  };

  const processReviewCounts = () => {
    likeString = getRoundedString(review["likeCount"]);
    dislikeString = getRoundedString(review["dislikeCount"]);
  };

  processReviewCounts();

  const handleReviewReact = async (like, remove) => {
    let data = {
      id: review.reviewId,
      email: userData["email"],
      like,
      remove,
    };

    return addOrRemoveReviewReact(data);
  };

  const addLike = async (e) => {
    disabled = true;
    if (likeDislike.dislike) {
      review["dislikeCount"] = initialDislikeCount - 1;
    }
    review["likeCount"] = initialLikeCount + 1;
    processReviewCounts();
    let res = await handleReviewReact(true, false);
    if (res) {
      setLikeDislike({
        like: true,
        dislike: false,
      });
    }
    disabled = false;
  };

  const addDislike = async (e) => {
    disabled = true;
    if (likeDislike.like) {
      review["likeCount"] = initialLikeCount - 1;
    }
    review["dislikeCount"] = initialDislikeCount + 1;
    processReviewCounts();
    let res = await handleReviewReact(false, false);
    if (res) {
      setLikeDislike({
        like: false,
        dislike: true,
      });
    }
    disabled = false;
  };

  const removeLike = async (e) => {
    disabled = true;
    review["likeCount"] = initialLikeCount - 1;
    processReviewCounts();
    let res = await handleReviewReact(true, true);
    if (res) {
      setLikeDislike({
        like: false,
        dislike: false,
      });
    }
    disabled = false;
  };

  const removeDislike = async (e) => {
    disabled = true;
    review["dislikeCount"] = initialDislikeCount - 1;
    processReviewCounts();
    let res = await handleReviewReact(false, true);
    if (res) {
      setLikeDislike({
        like: false,
        dislike: false,
      });
    }
    disabled = false;
  };

  const getAvatar = (name) => {
    let n = name.split(" ");
    return `${n[0][0]}${n[1][0]}`
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    className={classes.reviewHeader}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar style={{width:40, height:40}} title={`${review.reviewedBy}`}  aria-label="recipe">
                        {getAvatar(review.reviewedBy)}
                      </Avatar>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          paddingLeft: 10,
                        }}
                      >
                        <Typography
                          variant="h6"
                          style={{ fontSize: 17, textAlign: "left" }}
                        >
                          {review.reviewedBy}
                        </Typography>
                        <Typography variant="caption">
                          {getDateTime(review.createdAt)}
                        </Typography>
                      </div>
                    </div>
                    <Rating
                      value={review.userRate}
                      name="byRating"
                      precision={0.25}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} style={{ padding: "10px 20px" }}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      className={classes.typography}
                    >
                      {review.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {userData.isLoggedIn && (
                      <>
                        <Grid
                          container
                          justifyContent="flex-end"
                          className={classes.reviewFooter}
                        >
                          {
                            review.email !== userData.email && (
                              <IconButton
                                color="secondary"
                                aria-label="report"
                                component="span"
                                onClick={() => setReportReviewId(review.reviewId)}
                                title="Report Review"
                              >
                                <ReportIcon />
                              </IconButton>
                            )
                          }
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              position: "relative",
                            }}
                          >
                            {likeDislike.like ? (
                              <IconButton
                                color="primary"
                                aria-label="Like"
                                component="span"
                                title="Remove Like"
                                onClick={disabled ? () => {} : removeLike}
                              >
                                <ThumbUpIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                color="primary"
                                aria-label="Like"
                                component="span"
                                title="Like"
                                onClick={disabled ? () => {} : addLike}
                              >
                                <ThumbUp />
                              </IconButton>
                            )}
                            <span
                              style={{
                                position: "absolute",
                                bottom: -5,
                                fontSize: 14,
                                width: "100%",
                                textAlign: "center",
                              }}
                            >
                              {likeString}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              position: "relative",
                            }}
                          >
                            {likeDislike.dislike ? (
                              <IconButton
                                color="primary"
                                aria-label="Dislike"
                                component="span"
                                title="Remove Dislike"
                                onClick={disabled ? () => {} : removeDislike}
                              >
                                <ThumbDownIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                color="primary"
                                aria-label="Dislike"
                                component="span"
                                title="Dislike"
                                onClick={disabled ? () => {} : addDislike}
                              >
                                <ThumbDown />
                              </IconButton>
                            )}
                            <span
                              style={{
                                position: "absolute",
                                bottom: -5,
                                fontSize: 14,
                                width: "100%",
                                textAlign: "center",
                              }}
                            >
                              {dislikeString}
                            </span>
                          </div>
                        </Grid>
                      </>
                    )}
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
