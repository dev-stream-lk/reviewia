import {  Grid, makeStyles, Typography, Button, IconButton, Tooltip, FormLabel, } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Controls from "../components/Controls";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Review from "../components/Review";
import FavoriteBorderSharp from "@material-ui/icons/FavoriteBorderSharp";
import CompareSharp from "@material-ui/icons/CompareSharp";
import GroupAddSharp from "@material-ui/icons/GroupAddSharp";
import Rating from "@material-ui/lab/Rating";
import { Skeleton } from "@material-ui/lab";
import { Link } from "react-router-dom";
import Phone from '../static/img/j7.jpg';
import {useForm, Form} from '../components/useForm';
import {requiredField} from '../components/Validators';
import {UserContext} from '../context/UserContext';

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: `${theme.spacing(5)}px 0px ${theme.spacing(5)}px 0px`,
    [theme.breakpoints.up('sm')]:{
      margin: theme.spacing(5)
    },
    [theme.breakpoints.up('md')]:{
      margin: `${theme.spacing(5)}px ${theme.spacing(1)}px ${theme.spacing(5)}px ${theme.spacing(1)}px`,
    }
  },
  reviewContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  rhs:{
    marginTop:50,
    [theme.breakpoints.up("md")]:{
      margin:0
    }
  },
  productContainer: {
    textAlign: "start",
  },

  writeReviewForm:{
    width:500
  },

  reportPopup:{
    width:500
  },
}));

const ReportReview = (props) => {

  const classes = useStyles();
  const {openReport, setOpenReport, handleReportClose} = props;
  const [customFeedback, setCustomFeedback] = useState("");
  const [ fakeReview, setFakeReview ] = useState(false);
  const [ notRelavent, setNotRelavent] = useState(false);
  
  const handleReport = (e) => {
    // Todo : api call to backend 
    setOpenReport(false);
  }

  const Actions = () => {

    return (
      <>
        <Controls.Button
          onClick={()=> setOpenReport(false)}
          color="secondary"
        >
          Cancel
        </Controls.Button>

        <Controls.Button
          onClick={handleReport}
          >
          Report
        </Controls.Button>
      </>
    )
  }

  return (
    <>
      <Controls.Popup title="Report Review" openPopup={openReport} setOpenPopup={setOpenReport} actions={<Actions/>} >

        <Grid container className={classes.reportPopup}>
          <Grid item xs={12} sm={6}>
            <Controls.Checkbox
              label="Fake Review"
              checked={fakeReview}
              onChange={ () => setFakeReview(!fakeReview) }
            >
            </Controls.Checkbox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controls.Checkbox
              label="Not relavent"
              checked={notRelavent}
              onChange={ () => setNotRelavent(!notRelavent) }
            ></Controls.Checkbox>
          </Grid>
        </Grid>
          <Controls.Input
            multiline
            maxRows={5}
            value={customFeedback}
            label="Write Your report"
            onChange={ e => setCustomFeedback(e.target.value) }
          >

          </Controls.Input>
      </Controls.Popup>
    </>
  )
}

const WriteReview = (props) => {

  const classes = useStyles();
  const {open, setOpen} = props;

  const initialValues = {
    review:"",
    rating:2.5
  };

  const validate = (fieldValue= values) => {
    const temp = {};
    if('review' in fieldValue)
      temp.review = requiredField(fieldValue.review);

    setErrors({
      ...errors,
      ...temp
    })
    
    const isValid = Object.values(temp).every(x => x=="");

    return isValid;
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialValues,false,validate);

  const onSubmit = () => {
    // if(validate){

    // }
    console.log("sddsd")
  }

  const Actions= () => {

    return (
      <Grid container justifyContent="flex-end">
        <Controls.Button
          color="secondary"
          style={{marginRight:10}}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Controls.Button>
        <Controls.Button
          onClick={()=>onSubmit()}
        >
          Save
        </Controls.Button>
      </Grid>
    )
  }

  return (
      <>
          <Controls.Popup title="Write Review" openPopup={open} setOpenPopup={setOpen} actions={<Actions/>}>
            <Form className={classes.writeReviewForm} >
              <Controls.Input
                name="review"
                label="Review"
                value={values.review}
                error={errors.review}
                onChange={handleInputChange}
                multiline
                maxRows={6}
                required={true}
              />
              <Grid container  alignItems="center" style={{marginTop:20}}>
                <FormLabel style={{paddingRight:50}} >Rating</FormLabel>
                <Rating 
                  value={values.rating}
                  onChange={(e,value) => handleInputChange({target:{name:e.target.name,value: value}})}
                  name="rating"
                  precision={0.25}
                />
                <span style={{paddingLeft:10}}>
                  ({values.rating})
                </span>
              </Grid>
              
            </Form>
          </Controls.Popup>
      </>
  )
}


const ProductView = (props) => {
  const classes = useStyles();
  const [open,setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [reportReviewId, setReportReviewId] = useState(null);


  useEffect( ()=>{
    if(reportReviewId != null){
      setOpenReport(true);
    }
  }, [reportReviewId])

  useEffect(()=>{
    if(openReport === false){
      setReportReviewId(null);
    }
  },[openReport])

  return (
    <UserContext.Consumer>
      {({userData, setUserData}) => (
        <div>
          <Header  userData={userData} setUserData={setUserData} />
          <div className={classes.mainDiv}>
            <Grid container className={classes.productContainer}>
              <WriteReview open={open} setOpen={setOpen} />
              <ReportReview reportReviewId={reportReviewId} openReport={openReport} setOpenReport={setOpenReport} />
              {/* LHS */}
              <Grid item xs={12} md={5}>
                <Grid container justify="center">
                  <Grid
                    item
                    xs={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                  <img style={{maxWidth:200, maxHeight:200}} src={Phone} />
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Rating 
                      value={4.5}
                      name="byRating"
                      precision={0.25}
                      readOnly
                    />
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h5">4.5</Typography>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Tooltip title="Add to Favourites" aria-label="add" arrow>
                  <IconButton
                      color="primary"
                      aria-label="Add to favourite"
                      component="span"
                    >
                      <FavoriteBorderSharp />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Compare" aria-label="add" arrow>
                  <Link to={{pathname:"/product/compare"}} >
                    <IconButton
                        color="primary"
                        aria-label="Add to favourite"
                        component="span"
                      >
                        <CompareSharp />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Create Instant Group" aria-label="add" arrow>
                  <Link to={{pathname:"/product/instantGroup"}}>
                    <IconButton
                        color="primary"
                        aria-label="Add to favourite"
                        component="span"
                      >
                        <GroupAddSharp />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  </Grid>
                  <Grid item xs={9} direction="column">
                    <Controls.Paper>Brand:</Controls.Paper>
                    <Controls.Paper>Year:</Controls.Paper>
                    <Controls.Paper>Review count:</Controls.Paper>
                  </Grid>
                </Grid>
              </Grid>

              {/* RHS */}
              <Grid item xs={12} md={7} className={classes.rhs} >
                <Grid container style={{ textAlign: "center" }}>
                  <Grid item xs={6}>
                    <Typography variant="h5">Product Name</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.Button onClick={()=>setOpen(true)} variant="outlined">Write a review</Controls.Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Controls.Paper className={useStyles.paper}>
                      <Grid container className={classes.reviewContainer}>
                        <Grid item xs={1}>
                          <Typography variant="h5">Reviews</Typography>
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
                            <Review
                              setReportReviewId={setReportReviewId}
                              reviewId={1}
                              description="body1. Lorem ipsum dolor sit amet, consectetur adipisicing
                                          elit. Quos blanditiis tenetur unde suscipit, quam beatae
                                          rerum inventore consectetur, neque doloribus, cupiditate
                                          numquam dignissimos laborum fugiat deleniti? Eum quasi
                                          quidem quibusdam."
                            />
                            <Review
                              setReportReviewId={setReportReviewId}
                              reviewId={2}
                              description="body1. Lorem ipsum dolor sit amet, consectetur adipisicing
                                          elit. Quos blanditiis tenetur unde suscipit, quam beatae
                                          rerum inventore consectetur, neque doloribus, cupiditate
                                          numquam dignissimos laborum fugiat deleniti? Eum quasi
                                          quidem quibusdam."
                            />
                            <Review
                              setReportReviewId={setReportReviewId}
                              reviewId={3}
                              description="body1. Lorem ipsum dolor sit amet, consectetur adipisicing
                                          elit. Quos blanditiis tenetur unde suscipit, quam beatae
                                          rerum inventore consectetur, neque doloribus, cupiditate
                                          numquam dignissimos laborum fugiat deleniti? Eum quasi
                                          quidem quibusdam."
                            />
                            <Review
                              setReportReviewId={setReportReviewId}
                              reviewId={4}
                              description="body1. Lorem ipsum dolor sit amet, consectetur adipisicing
                                          elit. Quos blanditiis tenetur unde suscipit, quam beatae
                                          rerum inventore consectetur, neque doloribus, cupiditate
                                          numquam dignissimos laborum fugiat deleniti? Eum quasi
                                          quidem quibusdam."
                            />
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
      )}
    </UserContext.Consumer>
  );
};

export default ProductView;
