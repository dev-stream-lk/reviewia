import {  Grid, makeStyles, Typography, Button, IconButton, Tooltip, FormLabel, } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Review from "../components/Review";
import FavoriteBorderSharp from "@material-ui/icons/FavoriteBorderSharp";
import CompareSharp from "@material-ui/icons/CompareSharp";
import GroupAddSharp from "@material-ui/icons/GroupAddSharp";
import Rating from "@material-ui/lab/Rating";
import { Link, useHistory, useParams } from "react-router-dom";
import Phone from '../static/img/j7.jpg';
import {useForm, Form} from '../components/useForm';
import {requiredField, ratingFieldRequired} from '../components/Validators';
import {UserContext} from '../context/UserContext';
import {FavContext, addToFavContext, removeFromFavContext} from '../context/FavoriteList';
import {getPostById} from '../services/posts';
import {getReviewsByPostId, addReview} from '../services/reviews';
import {addToFavouriteList, removeFromFavouriteList} from '../services/favouritelist';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ImageCarousel from '../components/ImageCarousel'
import MultipleSelect from '../components/basic/MultipleSelect';
import {createInstantGroup, getAllInstantGroup} from '../services/instantGroups'
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import GroupSharpIcon from '@material-ui/icons/GroupSharp';

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
    // margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  rhs:{
    marginTop:50,
    [theme.breakpoints.up("md")]:{
      margin:0
    }
  },
  ReviewsHeader:{
    color: theme.palette.primary.main
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
  const {open, setOpen, writeReview} = props;
  const [enableSave, setEnableSave] = useState(false);
  const initialValues = {
    description:"",
    rating:0
  };

  const validate = (fieldValue= values) => {
    const temp = {};
    if('description' in fieldValue)
      temp.description = requiredField(fieldValue.description);
    if('rating' in fieldValue)
      temp.rating = ratingFieldRequired(fieldValue.rating);

    setErrors({
      ...errors,
      ...temp
    })
    
    const isValid = Object.values(temp).every(x => x=="");
    const all_valid = Object.values({...errors,...temp}).every(x => x=="");
    if (all_valid)
      setEnableSave(true)
    else
      setEnableSave(false)

    return isValid;
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialValues,true,validate);

  const onSubmit = () => {
    if(validate()){
      writeReview(values.description, values.rating)
      setOpen(false)
      setValues(initialValues)
    }
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
          disabled={enableSave ? false:true}
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
                name="description"
                label="Review"
                value={values.description}
                error={errors.description}
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

const CreateInstantGroup = (props) => {

  const classes = useStyles();
  const {open, setOpen, userData, postData} = props;
  const [dataList, setDataList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect( async () => {
    if(postData['reviews']){
      let dataList = postData['reviews'].map((review, i) => {
        return {title:review.reviewedBy, email:review.email}
      });

      // filter unique users
      dataList = dataList.filter( (item, i, self) => {
        if(userData.email == item.email){
          return false;
        }
        return i === self.findIndex( (t) => (
          t.email === item.email
        ))
      })
      setDataList(dataList)
    }
    
  }, [postData])
  
  const handleCreate = async (e) => {
    
    let emails = selectedUsers.map( (user, i) => {
      return user.email
    })

    let data = {
      email: userData.email,
      post: postData.postId,
      emails
    }

    let res = await createInstantGroup(data);
    if(res){
      window.location.reload()
    }

    setOpen(false);
  }

  const Actions = () => {

    return (
      <>
        <Controls.Button
          onClick={()=> setOpen(false)}
          color="secondary"
        >
          Cancel
        </Controls.Button>

        <Controls.Button
          onClick={handleCreate}
          >
          Create
        </Controls.Button>
      </>
    )
  }

  return (
    <>
      <Controls.Popup title="Report Review" openPopup={open} setOpenPopup={setOpen} actions={<Actions/>} >
        <Grid container className={classes.reportPopup} >
          <Grid item xs={12} >
            <MultipleSelect setSelectedUsers={setSelectedUsers} dataList={dataList} wrapperStyles={{marginBottom:150}} />
          </Grid>
        </Grid>
      </Controls.Popup>
    </>
  )
}

const ProductView = (props) => {
  const classes = useStyles();
  const [open,setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [reportReviewId, setReportReviewId] = useState(null);
  const {userData, setUserData} = useContext(UserContext);
  const [postData, setPostData] = useState({})
  const [postId, setPostId] = useState(useParams().id);
  const [reviews, setReviews] = useState([])
  const [inFavList, setInFavList] = useState(false);
  const [favButtonLock, setFavButtonLock] = useState(false);
  const history = useHistory();
  const [openCreateInstant, setOpenCreateInstant] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(0);

  const getPostInfo = async () =>{
    if(postId){
      let data = await getPostById(postId)
      if(data){
        setPostData(data)
      }else{
        history.replace("/pagenotfound")
      }
    }
  }

  const getInstantGroup = async () => {
    let res = await getAllInstantGroup(userData.email);
    if(res){
      for(let i in res){
        if(res[i]["postId"] == postId){
          if(res[i]['active']){
            setActiveGroupId(res[i]['id'])
          }
          break;
        }
      }
    }
  }

  // check if user already add to favourite list
  var favList = useContext(FavContext);
    
  useEffect(()=>{
    if(favList){
      favList.forEach(post => {
        if(post.postId == postId)
          setInFavList(true)
      });
    }  
  },[favList]);

  useEffect(async () => {
    getPostInfo()
    getInstantGroup()
  },[postId]);

  const getPostReviews = async () => {
    if( userData && postId){
      let data = await getReviewsByPostId(postId)
      
      if(data){
        setReviews(data)
      }
    }
  }
  useEffect(async () => {
    await getPostReviews()
  },[userData,postId]);

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

  const writeReview =async ( description, userRate) => {
    let data = await addReview(userData.email, parseInt(postId), description, userRate);
    await getPostInfo()
    await getPostReviews()

  }

  // add to favourite list
  const addToFavList = async () => {
    setInFavList(true)
    setFavButtonLock(true)
    if(userData.email){
      let res = await addToFavouriteList({email:userData.email,id:postId})
      if(!res){
        setInFavList(false)
      }else{
        addToFavContext(postData)
      }
    }else{
      addToFavContext(postData)
    }
    setFavButtonLock(false)
  }

  // remove from favourite list
  const removeFromFavList = async () => {
    setInFavList(false)
    setFavButtonLock(true)
    if(userData.email){
      let res = await removeFromFavouriteList({email:userData.email,id:postId})
      if(!res){
        setInFavList(true)
      }else{
        removeFromFavContext(postId)
      }
    }else{
      removeFromFavContext(postId)
    }
    setFavButtonLock(false)
  }

  return (

      <div>
        <Header  userData={userData} setUserData={setUserData} />
        <div className={classes.mainDiv}>
          <Grid container className={classes.productContainer}>
            <CreateInstantGroup postData={postData} userData={userData} open={openCreateInstant} setOpen={setOpenCreateInstant} />
            <WriteReview open={open} setOpen={setOpen} writeReview={writeReview} />
            <ReportReview reportReviewId={reportReviewId} openReport={openReport} setOpenReport={setOpenReport} />
            {/* LHS */}
            <Grid item xs={12} md={5}>
              <Grid container justify="center">
                <div style={{width:250, height:230}}>
                  <ImageCarousel images={ postData.imgURL } />
                </div>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Rating
                    value={parseFloat(Object.keys(postData).length !== 0 ? postData.rate:"0")}
                    name="byRating"
                    precision={0.25}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography variant="h5">{Object.keys(postData).length !== 0 ? postData.rate:""}</Typography>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                <Tooltip title="Add to Favourites" aria-label="add" arrow>
                  { inFavList ? 
                    (
                      <IconButton
                        color="secondary"
                        component="span"
                        onClick={ !favButtonLock? removeFromFavList: () => {}}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    ) : 
                    (
                      <IconButton
                        color="primary"
                        component="span"
                        onClick={!favButtonLock? addToFavList: () => {}}
                      >
                        <FavoriteBorderSharp />
                      </IconButton>
                    )
                  }
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
                {/* <Tooltip title="Create Instant Group" aria-label="add" arrow>
                  <Link to={{pathname:"/product/instantGroup"}}>
                    <IconButton
                      color="primary"
                      aria-label="Add to favourite"
                      component="span"
                    >
                      <GroupAddSharp />
                    </IconButton>
                  </Link>
                </Tooltip> */}

                  {
                    activeGroupId !== 0 ?
                    (
                      <Tooltip title="Goto Group Chat" aria-label="add" arrow>
                        <Link to={{pathname:`/product/instantGroup/${postId}/${activeGroupId}`}}>
                          <IconButton
                            color="primary"
                            aria-label="Goto Group Chat"
                            component="span"
                          >
                            <GroupSharpIcon/>
                          </IconButton>
                        </Link>
                      </Tooltip>
                    ):
                    (
                      <Tooltip title="Create Instant Group" aria-label="add" arrow>
                        <IconButton
                          color="primary"
                          aria-label="Create instant group"
                          component="span"
                          onClick={()=>{setOpenCreateInstant(true)}}
                        >
                          <GroupAddOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                </Grid>
                <Grid item xs={12} sm={11} md={9} direction="column">
                  <Controls.Paper>Title: {Object.keys(postData).length !== 0 ? postData.title:""}</Controls.Paper>
                  <Controls.Paper>Categoty: {Object.keys(postData).length !== 0 ? postData.category:""}</Controls.Paper>
                  <Controls.Paper>SubCategoty: {Object.keys(postData).length !== 0 ? postData.subCategory:""}</Controls.Paper>
                  <Controls.Paper>Brand: {Object.keys(postData).length !== 0 ? postData.brand.name:""}</Controls.Paper>
                  <Controls.Paper>Review count: {Object.keys(postData).length !== 0 ? postData.reviewCount:""}</Controls.Paper>
                  <Controls.Paper>Description: {Object.keys(postData).length !== 0 ? postData.description:""}</Controls.Paper>
                </Grid>
              </Grid>
            </Grid>

            {/* RHS */}
            <Grid item xs={12} md={7} className={classes.rhs} >
              <Grid container style={{ textAlign: "center" }}>
                <Grid item xs={6}>
                  <Typography variant="h5">{Object.keys(postData).length !== 0 ? postData.title:""}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Controls.Button onClick={()=>setOpen(true)} variant="outlined">Write a review</Controls.Button>
                </Grid>
                <Grid item xs={12}>
                  <Controls.Paper className={useStyles.paper}>
                    <Grid container className={classes.reviewContainer}>
                      <Grid item xs={12}>
                        <Typography variant="h5" className={classes.ReviewsHeader} >Reviews</Typography>
                        <hr/>
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
                          { reviews.length !== 0 ? reviews.map( (review,i) => (
                            <Review
                              setReportReviewId={setReportReviewId}
                              key={i}
                              review={review}
                            />
                          )) : null }
                          
                          
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
