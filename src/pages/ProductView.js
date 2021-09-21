import {
  Grid,
  makeStyles,
  Typography,
  Button,
  IconButton,
  Tooltip,
  FormLabel,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Review from "../components/Review";
import FavoriteBorderSharp from "@material-ui/icons/FavoriteBorderSharp";
import CompareSharp from "@material-ui/icons/CompareSharp";
import Rating from "@material-ui/lab/Rating";
import { Link, useHistory, useParams } from "react-router-dom";
import { useForm, Form } from "../components/useForm";
import { requiredField, ratingFieldRequired } from "../components/Validators";
import { UserContext } from "../context/UserContext";
import {
  FavContext,
  addToFavContext,
  removeFromFavContext,
} from "../context/FavoriteList";
import { getPostById, deletePostPermanantly } from "../services/posts";
import { getReviewsByPostId, addReview } from "../services/reviews";
import {
  addToFavouriteList,
  removeFromFavouriteList,
} from "../services/favouritelist";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ImageCarousel from "../components/ImageCarousel";
import MultipleSelect from "../components/basic/MultipleSelect";
import {
  createInstantGroup,
  getAllInstantGroup,
} from "../services/instantGroups";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import GroupSharpIcon from "@material-ui/icons/GroupSharp";
import "../App.css";
import { reportPostOrReview } from "../services/report";
import ReportIcon from "@material-ui/icons/Report";
import { checkDateTimeIsExpired, getTimeRemains } from "../utils/dateTime";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { PreLoader } from "../components/basic/PreLoader";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: `${theme.spacing(5)}px 0px ${theme.spacing(5)}px 0px`,
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(5),
    },
    [theme.breakpoints.up("md")]: {
      margin: `${theme.spacing(5)}px ${theme.spacing(1)}px ${theme.spacing(
        5
      )}px ${theme.spacing(1)}px`,
    },
  },
  reviewContainer: {
    // margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  rhs: {
    marginTop: 50,
    [theme.breakpoints.up("md")]: {
      margin: 0,
    },
  },
  ReviewsHeader: {
    color: theme.palette.primary.main,
  },
  productContainer: {
    textAlign: "start",
  },

  writeReviewForm: {
    width: 500,
  },

  reportPopup: {
    width: 500,
  },
}));

const ReportReview = (props) => {
  const classes = useStyles();
  const {
    openReport,
    setOpenReport,
    userData,
    reportReviewId,
    handleReportClose,
  } = props;
  const [customFeedback, setCustomFeedback] = useState("");
  const defaultReasonId = 4;
  const [reason, setReason] = useState(defaultReasonId);
  const [error, setError] = useState("");

  const reasons = [
    { id: 1, title: "Inappropriate Review" },
    { id: 2, title: "Abusive Content" },
    { id: 3, title: "It's a spam" },
    { id: 4, title: "Other" },
  ];

  const handleReport = async (e) => {
    // Todo : api call to backend
    var reasonStr = "";
    if (reason === defaultReasonId) {
      reasonStr = customFeedback;
    } else {
      let reasonObj = reasons.filter((r) => {
        if (r.id === reason) {
          return true;
        } else {
          return false;
        }
      });
      reasonStr = reasonObj[0].title;
    }

    let res = await reportPostOrReview(
      userData.email,
      reportReviewId,
      "r",
      reasonStr
    );

    if (res) {
      setReason(defaultReasonId);
      setError("");
      setCustomFeedback("");
      setOpenReport(false);
    } else {
      setError("Report Failed. Please try again.");
    }
  };

  const Actions = () => {
    return (
      <>
        <Controls.Button onClick={() => setOpenReport(false)} color="secondary">
          Cancel
        </Controls.Button>

        <Controls.Button
          disabled={
            reason === defaultReasonId && customFeedback === "" ? true : false
          }
          onClick={handleReport}
        >
          Report
        </Controls.Button>
      </>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Report Review"
        openPopup={openReport}
        setOpenPopup={setOpenReport}
        actions={<Actions />}
      >
        <Grid container className={classes.reportPopup}>
          {error !== "" && (
            <Grid
              container
              justifyContent="center"
              style={{
                color: "red",
                background: "#ffaaaa",
                paddingTop: 5,
                paddingBottom: 5,
                marginBottom: 10,
              }}
            >
              <Typography variant="subtitle2">{error} </Typography>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Controls.RadioGroup
              label="Select Reason"
              block={true}
              name="reason"
              value={reason}
              items={reasons}
              onChange={(e, val) => setReason(parseInt(val))}
            ></Controls.RadioGroup>
          </Grid>
        </Grid>
        {reason === defaultReasonId && (
          <Controls.Input
            multiline
            maxRows={5}
            value={customFeedback}
            label="Write Your report"
            onChange={(e) => setCustomFeedback(e.target.value)}
          ></Controls.Input>
        )}
      </Controls.Popup>
    </>
  );
};

const ReportPost = (props) => {
  const classes = useStyles();
  const { openReport, setOpenReport, userData, reportPostId } = props;
  const [customFeedback, setCustomFeedback] = useState("");
  const defaultReasonId = 4;
  const [reason, setReason] = useState(defaultReasonId);
  const [error, setError] = useState("");

  const reasons = [
    { id: 1, title: "Inappropriate Post" },
    { id: 2, title: "Abusive Content" },
    { id: 3, title: "It's a spam" },
    { id: 4, title: "Other" },
  ];

  const handleReport = async (e) => {
    // Todo : api call to backend
    var reasonStr = "";
    if (reason === defaultReasonId) {
      reasonStr = customFeedback;
    } else {
      let reasonObj = reasons.filter((r) => {
        if (r.id === reason) {
          return true;
        } else {
          return false;
        }
      });
      reasonStr = reasonObj[0].title;
    }

    let res = await reportPostOrReview(
      userData.email,
      reportPostId,
      "p",
      reasonStr
    );

    if (res) {
      setReason(defaultReasonId);
      setError("");
      setCustomFeedback("");
      setOpenReport(false);
    } else {
      setError("Report Failed. Please try again.");
    }
  };

  const Actions = () => {
    return (
      <>
        <Controls.Button onClick={() => setOpenReport(false)} color="secondary">
          Cancel
        </Controls.Button>

        <Controls.Button
          disabled={
            reason === defaultReasonId && customFeedback === "" ? true : false
          }
          onClick={handleReport}
        >
          Report
        </Controls.Button>
      </>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Report Post"
        openPopup={openReport}
        setOpenPopup={setOpenReport}
        actions={<Actions />}
      >
        <Grid container className={classes.reportPopup}>
          {error !== "" && (
            <Grid
              container
              justifyContent="center"
              style={{
                color: "red",
                background: "#ffaaaa",
                paddingTop: 5,
                paddingBottom: 5,
                marginBottom: 10,
              }}
            >
              <Typography variant="subtitle2">{error} </Typography>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Controls.RadioGroup
              label="Select Reason"
              block={true}
              name="reason"
              value={reason}
              items={reasons}
              onChange={(e, val) => setReason(parseInt(val))}
            ></Controls.RadioGroup>
          </Grid>
        </Grid>
        {reason === defaultReasonId && (
          <Controls.Input
            multiline
            maxRows={5}
            value={customFeedback}
            label="Write Your report"
            onChange={(e) => setCustomFeedback(e.target.value)}
          ></Controls.Input>
        )}
      </Controls.Popup>
    </>
  );
};

const WriteReview = (props) => {
  const classes = useStyles();
  const { open, setOpen, writeReview } = props;
  const [enableSave, setEnableSave] = useState(false);
  const initialValues = {
    description: "",
    rating: 0,
  };
  const [error, setError] = useState("");

  const validate = (fieldValue = values) => {
    const temp = {};
    if ("description" in fieldValue)
      temp.description = requiredField(fieldValue.description);
    if ("rating" in fieldValue)
      temp.rating = ratingFieldRequired(fieldValue.rating);

    setErrors({
      ...errors,
      ...temp,
    });

    const isValid = Object.values(temp).every((x) => x == "");
    const all_valid = Object.values({ ...errors, ...temp }).every(
      (x) => x == ""
    );
    if (all_valid) setEnableSave(true);
    else setEnableSave(false);

    return isValid;
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialValues,
    true,
    validate
  );

  const handleClose = () => {
    setError("");
    setValues(initialValues);
    setOpen(false);
  }

  const onSubmit = async () => {
    if (validate()) {
      let res = await writeReview(values.description, values.rating);
      if(res){
        setValues(initialValues);
        setOpen(false);
        setError("");
      }else{
        setError("Review and star rating not maching.");
      }
    }
  };

  const Actions = () => {
    return (
      <Grid container justifyContent="flex-end">
        <Controls.Button
          color="secondary"
          style={{ marginRight: 10 }}
          onClick={handleClose}
        >
          Cancel
        </Controls.Button>
        <Controls.Button
          disabled={enableSave ? false : true}
          onClick={() => onSubmit()}
        >
          Save
        </Controls.Button>
      </Grid>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Write Review"
        openPopup={open}
        setOpenPopup={handleClose}
        actions={<Actions />}
      >
        {
          error !== "" && (
            <Grid container style={{marginTop:8, padding:8, marginBottom:24, color:"red", background:"#ffaaaa"}} justifyContent="center" >
              <Typography variant="subtitle2">
                {error}
              </Typography>
            </Grid>
          )
        }
        <Form className={classes.writeReviewForm}>
          <Controls.Input
            name="description"
            label="Review"
            value={values.description}
            error={errors.description}
            onChange={handleInputChange}
            multiline
            maxRows={6}
            required={true}
          />
          <Grid container alignItems="center" style={{ marginTop: 20 }}>
            <FormLabel style={{ paddingRight: 50 }}>Rating</FormLabel>
            <Rating
              value={values.rating}
              onChange={(e, value) =>
                handleInputChange({
                  target: { name: e.target.name, value: value },
                })
              }
              name="rating"
              precision={1}
            />
            <span style={{ paddingLeft: 10 }}>({values.rating})</span>
          </Grid>
        </Form>
      </Controls.Popup>
    </>
  );
};

const CreateInstantGroup = (props) => {
  const classes = useStyles();
  const { open, setOpen, userData, postData } = props;
  const [dataList, setDataList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(async () => {
    if (postData["reviews"]) {
      let dataList = postData["reviews"].map((review, i) => {
        return { title: review.reviewedBy, email: review.email };
      });

      // filter unique users
      dataList = dataList.filter((item, i, self) => {
        if (userData.email === item.email) {
          return false;
        }
        return i === self.findIndex((t) => t.email === item.email);
      });
      setDataList(dataList);
    }
  }, [postData]);

  const handleCreate = async (e) => {
    let emails = selectedUsers.map((user, i) => {
      return user.email;
    });

    let data = {
      email: userData.email,
      post: postData.postId,
      emails,
    };

    let res = await createInstantGroup(data);
    if (res === 200) {
      setError("");
      window.location.reload();
    }else if(res === 412){
      setError("You can't create group.You already have active group.")
    }else{
      setError("Group create failed.")
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
  }

  const Actions = () => {
    return (
      <>
        <Controls.Button onClick={handleClose} color="secondary">
          Cancel
        </Controls.Button>

        <Controls.Button onClick={handleCreate}>Create</Controls.Button>
      </>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Create Instant Group"
        openPopup={open}
        setOpenPopup={setOpen}
        actions={<Actions />}
      >
        {
          error !== "" && (
            <Grid container style={{padding:5, marginBottom:20, background:"#ffaaaa", color:"red"}}  justifyContent="center">
              <Typography variant="caption">
                {error}
              </Typography>
            </Grid>
          )
        }
        <Grid container className={classes.reportPopup}>
          <Grid item xs={12}>
            <MultipleSelect
              setSelectedUsers={setSelectedUsers}
              dataList={dataList}
              wrapperStyles={{ marginBottom: 150 }}
            />
          </Grid>
        </Grid>
      </Controls.Popup>
    </>
  );
};

const DeletePost = (props) => {
  const classes = useStyles();
  const { open, setOpen, userData, postId } = props;
  const history = useHistory();
  const [error, setError] = useState("");

  const deletePost = async () => {
    let res = await deletePostPermanantly(postId);
    if (res) {
      history.replace(`/products`);
    } else {
      setError("Post deletion failed...");
    }
  };

  const Actions = () => {
    return (
      <>
        <Controls.Button onClick={() => setOpen(false)}>Cancel</Controls.Button>

        <Controls.Button onClick={deletePost} color="secondary">
          Delete Post
        </Controls.Button>
      </>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Delete Your Post"
        openPopup={open}
        setOpenPopup={setOpen}
        actions={<Actions />}
      >
        {error !== "" && (
          <Grid
            container
            style={{
              marginTop: 10,
              marginBottom: 10,
              color: "red",
              background: "#ffaaaa",
            }}
          >
            <Typography variant="subtitle2">{error}</Typography>
          </Grid>
        )}
        <Grid
          container
          style={{ width: "500" }}
          className={classes.reportPopup}
        >
          <Grid item xs={12}>
            <Typography>Are you sure?</Typography>
          </Grid>
        </Grid>
      </Controls.Popup>
    </>
  );
};

const ProductView = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openReportPost, setOpenReportPost] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);
  const [reportReviewId, setReportReviewId] = useState(null);
  const { userData, setUserData } = useContext(UserContext);
  const [postData, setPostData] = useState({});
  const [postId, setPostId] = useState(useParams().id);
  const [reviews, setReviews] = useState([]);
  const [inFavList, setInFavList] = useState(false);
  const [favButtonLock, setFavButtonLock] = useState(false);
  const history = useHistory();
  const [openCreateInstant, setOpenCreateInstant] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(0);
  const [postDataLoading, setPostDataLoading] = useState(true);
  const [reviewDataLoading, setReviewDataLoading] = useState(true);

  // get post data from db
  const getPostInfo = async () => {
    setPostDataLoading(true);
    if (postId) {
      let data = await getPostById(postId);
      if (data) {
        if(data.blocked){
          history.replace("/")
        }
        setPostData(data);
        setPostDataLoading(false);
      } else {
        history.replace("/pagenotfound");
      }
    }
  };

  // get instant groups from db
  const getInstantGroup = async () => {
    setPostDataLoading(true);
    let res = await getAllInstantGroup(userData.email);
    if (res) {
      for (let i in res) {
        if (res[i]["postId"] == postId) {
          if (res[i]["active"]) {
            setActiveGroupId(res[i]["id"]);
            break;
          }
        }
      }
    }
    setPostDataLoading(false);
  };

  // check if user already add to favourite list
  var favList = useContext(FavContext);

  useEffect(() => {
    if (favList) {
      favList.forEach((post) => {
        if (post.postId == postId) setInFavList(true);
      });
    }
  }, [favList]);

  useEffect(async () => {
    getPostInfo();
    getInstantGroup();
  }, [postId]);

  const getPostReviews = async () => {
    setReviewDataLoading(true);
    if (userData && postId) {
      let data = await getReviewsByPostId(postId);

      if (data) {
        setReviewDataLoading(false);
        setReviews(data);
      }
    }
  };
  useEffect(async () => {
    await getPostReviews();
  }, [userData, postId]);

  useEffect(() => {
    if (reportReviewId != null) {
      setOpenReport(true);
    }
  }, [reportReviewId]);

  useEffect(() => {
    if (openReport === false) {
      setReportReviewId(null);
    }
  }, [openReport]);

  const writeReview = async (description, userRate) => {
    let data = await addReview(
      userData.email,
      userData.name,
      parseInt(postId),
      description,
      userRate
    );
    if(data){
      setReviews([...reviews, data ])
      getPostInfo()
      return true;
    }
    return false;
  };

  const firstLetterCapital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // add to favourite list
  const addToFavList = async () => {
    setInFavList(true);
    let headerHeartIcon = document.getElementById("headerHeartIcon");
    setFavButtonLock(true);
    if (userData.email) {
      let res = await addToFavouriteList({ email: userData.email, id: postId });
      if (!res) {
        setInFavList(false);
      } else {
        headerHeartIcon.style.animation = "favIconAnimation 3s";
        addToFavContext(postData);
      }
    } else {
      headerHeartIcon.style.animation = "favIconAnimation 3s";
      addToFavContext(postData);
    }
    setFavButtonLock(false);
  };

  // remove from favourite list
  const removeFromFavList = async () => {
    setInFavList(false);
    setFavButtonLock(true);
    let headerHeartIcon = document.getElementById("headerHeartIcon");
    headerHeartIcon.style.animation = "";
    if (userData.email) {
      let res = await removeFromFavouriteList({
        email: userData.email,
        id: postId,
      });
      if (!res) {
        setInFavList(true);
      } else {
        removeFromFavContext(postId);
      }
    } else {
      removeFromFavContext(postId);
    }
    setFavButtonLock(false);
  };

  // get post remaining delete time
  const getRemainingDeleteTime = (datetime) => {
    let res = getTimeRemains(postData.createdAt, 0, 0, 30);

    return `${res.m} mins ${res.s} sec`;
  };

  return (
    <div>
      <Header userData={userData} setUserData={setUserData} />
      <div className={classes.mainDiv}>
        <Grid container className={classes.productContainer}>
          <CreateInstantGroup
            postData={postData}
            userData={userData}
            open={openCreateInstant}
            setOpen={setOpenCreateInstant}
          />
          <WriteReview
            open={open}
            setOpen={setOpen}
            writeReview={writeReview}
          />
          <ReportReview
            userData={userData}
            reportReviewId={reportReviewId}
            openReport={openReport}
            setOpenReport={setOpenReport}
          />
          <ReportPost
            userData={userData}
            reportPostId={postId}
            openReport={openReportPost}
            setOpenReport={setOpenReportPost}
          />
          <DeletePost
            userData={userData}
            postId={postId}
            open={openDeletePost}
            setOpen={setOpenDeletePost}
          />
          {/* LHS */}
          <Grid item xs={12} md={5} style={{ position: "relative" }}>
            <PreLoader loading={postDataLoading} />
            <Grid container justify="center">
              <div style={{ width: 250, height: 230 }}>
                <ImageCarousel images={postData.imgURL} />
              </div>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Rating
                  value={parseFloat(
                    Object.keys(postData).length !== 0 ? postData.rate : "0"
                  )}
                  name="byRating"
                  precision={0.25}
                  readOnly
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography variant="h5">
                  {Object.keys(postData).length !== 0 ? postData.rate : ""}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Tooltip title="Add to Favourites" aria-label="add" arrow>
                  {inFavList ? (
                    <IconButton
                      color="secondary"
                      component="span"
                      onClick={!favButtonLock ? removeFromFavList : () => {}}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="primary"
                      component="span"
                      onClick={!favButtonLock ? addToFavList : () => {}}
                    >
                      <FavoriteBorderSharp />
                    </IconButton>
                  )}
                </Tooltip>
                <Tooltip title="Compare" aria-label="add" arrow>
                  <Link to={{ pathname: `/product/compare/${postId}` }}>
                    <IconButton
                      color="primary"
                      aria-label="Product Compare"
                      component="span"
                    >
                      <CompareSharp />
                    </IconButton>
                  </Link>
                </Tooltip>
                {
                  userData.isLoggedIn ? (
                    <>
                      {activeGroupId !== 0 ? (
                        <Tooltip title="Goto Group Chat" aria-label="add" arrow>
                          <Link
                            to={{
                              pathname: `/product/instantGroup/${postId}/${activeGroupId}`,
                            }}
                          >
                            <IconButton
                              color="primary"
                              aria-label="Goto Group Chat"
                              component="span"
                            >
                              <GroupSharpIcon />
                            </IconButton>
                          </Link>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Create Instant Group" aria-label="add" arrow>
                          <IconButton
                            color="primary"
                            aria-label="Create instant group"
                            component="span"
                            onClick={() => {
                              setOpenCreateInstant(true);
                            }}
                          >
                            <GroupAddOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {postData && postData.email !== userData.email ? (
                        <Tooltip title="Report Post" aria-label="add" arrow>
                          <IconButton
                            onClick={() => setOpenReportPost(true)}
                            color="primary"
                            aria-label="Add to favourite"
                            component="span"
                          >
                            <ReportIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        checkDateTimeIsExpired(postData.createdAt, 30) && (
                          <Tooltip
                            title={`Delete Post Permanently( ${getRemainingDeleteTime(
                              postData.createdAt
                            )} ) `}
                            aria-label="add"
                            arrow
                          >
                            <IconButton
                              onClick={() => setOpenDeletePost(true)}
                              color="secondary"
                              aria-label="Delete Group"
                              component="span"
                            >
                              <DeleteForeverOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      )}
                    </>
                  ):null
                }
              </Grid>
              <Grid item xs={12} sm={11} md={9} direction="column">
                <Controls.Paper>
                  Title:{" "}
                  {Object.keys(postData).length !== 0 ? postData.title : ""}
                </Controls.Paper>
                <Controls.Paper>
                  Category:{" "}
                  {Object.keys(postData).length !== 0
                    ? firstLetterCapital(postData.category)
                    : ""}
                </Controls.Paper>
                <Controls.Paper>
                  Subcategory:{" "}
                  {Object.keys(postData).length !== 0
                    ? firstLetterCapital(postData.subCategory)
                    : ""}
                </Controls.Paper>
                <Controls.Paper>
                  Brand:{" "}
                  {Object.keys(postData).length !== 0
                    ? firstLetterCapital(postData.brand.name)
                    : ""}
                </Controls.Paper>
                <Controls.Paper>
                  Posted By:{" "}
                  {Object.keys(postData).length !== 0
                    ? postData.createdBy
                    : ""}
                </Controls.Paper>
                <Controls.Paper>
                  Review count:{" "}
                  {Object.keys(postData).length !== 0
                    ? postData.reviewCount
                    : ""}
                </Controls.Paper>
                <Controls.Paper>
                  Description:{" "}
                  {Object.keys(postData).length !== 0
                    ? postData.description
                    : ""}
                </Controls.Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* RHS */}
          <Grid
            item
            xs={12}
            md={7}
            className={classes.rhs}
            style={{ position: "relative" }}
          >
            <PreLoader loading={reviewDataLoading} />
            <Grid container style={{ textAlign: "center" }}>
              <Grid item xs={6}>
                <Typography variant="h5">
                  {Object.keys(postData).length !== 0 ? postData.title : ""}
                </Typography>
              </Grid>
              {
                userData.isLoggedIn && (
                  <Grid item xs={6}>
                    <Controls.Button
                      onClick={() => setOpen(true)}
                      variant="outlined"
                    >
                      Write a review
                    </Controls.Button>
                  </Grid>
                )
              }
              <Grid item xs={12}>
                <Controls.Paper className={useStyles.paper}>
                  <Grid container className={classes.reviewContainer}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h5"
                        className={classes.ReviewsHeader}
                      >
                        Reviews
                      </Typography>
                      <hr />
                    </Grid>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        style={{
                          // maxHeight: "100vh",
                          height: "75vh",
                          overflow: "auto",
                          paddingTop: "10px",
                        }}
                      >
                        {reviews.length !== 0
                          ? reviews.map((review, i) => (
                              <Review
                                setReportReviewId={setReportReviewId}
                                key={i}
                                review={review}
                              />
                            ))
                          : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </Controls.Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default ProductView;
