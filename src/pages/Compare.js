import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Phone from "../static/img/j7.jpg";
import SearchIcon from "@material-ui/icons/Search";
import Skeleton from "@material-ui/lab/Skeleton";
import { UserContext } from "../context/UserContext";
import { getPostById, getPostBySearch } from "../services/posts";
import ImageCarousel from "../components/ImageCarousel";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    overflowX: "scroll",
    [theme.breakpoints.up("md")]: {
      overflowX: "hidden",
    },
  },

  container: {
    width: 900,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: "1px solid lightgray",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    // marginBottom: 50
  },

  productCard: {
    margin: theme.spacing(1),
  },
  topics: {
    width: 250,
  },
  cardSection: {
    width: `calc(100% - 250px)`,
  },
}));

const SimillarProductCard = (props) => {
  const classes = useStyles();
  let { value = 4.75 } = props;

  return (
    <Controls.Card style={{ marginTop: 16 }}>
      <CardHeader title="Samsung J7 nxt" subheader="34 Aug, 2021"></CardHeader>
      <CardMedia title="Samsung Galaxy j7 Nxt">
        <img src={Phone} />
      </CardMedia>
      <CardContent>
        <Rating
          name="phone"
          value={value}
          precision={0.25}
          getLabelText={(val) => `${val} Heart${val !== 1 ? "s" : ""}`}
          readOnly
        />
        <Box>{value}</Box>
      </CardContent>
      <CardActions></CardActions>
    </Controls.Card>
  );
};

const CompareSearch = (props) => {
  const classes = useStyles();
  const {setPostData} = props;
  const [search, setSearch] = useState("");
  const [dataSet, setDataSet] = useState([]);

  useEffect(async () => {
    if (search) {
      let res = await getPostBySearch({ title: search });
      console.log(res);
      if (res) {
        setDataSet(res["posts"]);
      }
    } else {
      if (dataSet !== []) {
        setDataSet([]);
      }
    }
  }, [search]);

  const handleSelect = (option) => {
    setPostData(option);
    console.log(option)
  }

  return (
    <>
      <Autocomplete
        className={classes.homeSearch}
        id="free-solo-2-demo"
        disableClearable
        getOptionLabel={(option) => option.title}
        options={dataSet && dataSet}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Grid
              onClick={() => handleSelect(option)}
              style={{
                display: "flex",
                alignItems: "center",
                color: "black",
                textDecoration: "none",
              }}
            >
              <div style={{ height: 30 }}>
                <img
                  src={`${option.imgURL[0].url}`}
                  style={{ maxWidth: 30, maxHeight: 30, marginRight: 16 }}
                />
              </div>
              <span>{option.title}</span>
            </Grid>
          </React.Fragment>
        )}
        ListboxProps={{
          style: {
            overflowY: "scroll",
            maxHeight: 300,
          },
        }}
        renderInput={(params) => (
          <Controls.Input
            {...params}
            endAdornment={<SearchIcon />}
            fullWidth={true}
            size="medium"
            className={classes.headSearchInput}
            placeholder="What are you looking for..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></Controls.Input>
        )}
      />
    </>
  );
};

// show last 5 reviews
const ShowReviews = (props) => {

  const {reviews} = props;
  const [viewReviews, setViewReviews] = useState([]);
  
  useEffect ( () => {
    if(reviews){
      let len = reviews.length;
      let start = 0;
      if(len > 3){
        start = len - 4;
      }
      console.log(start)
      setViewReviews(reviews.splice(start));
    }
  }, [reviews])

  return (
    <>
      {
        viewReviews.map( (review,i) => (
          <Grid container style={{marginBottom:5, padding:"5px 10px 5px 0", background:"#eee"}}>
            <Typography variant="caption">
              * {review.description}
            </Typography>
          </Grid>
        ))
      }
    </>
  )

}


export default function Compare(props) {
  const classes = useStyles();
  const params = useParams();
  const { userData, setUserData } = useContext(UserContext);
  const [post1Data, setPost1Data] = useState({});
  const [post2Data, setPost2Data] = useState({});
  const [post3Data, setPost3Data] = useState({});

  useEffect( async () => {
    if(params.postId){
      let res = await getPostById(params.postId);
      if(res){
        setPost1Data(res);
      }
    }
  },[params]);

  return (
    <>
      <Header userData={userData} setUserData={setUserData} />

      <Grid container className={"content"}>
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <Controls.Paper className={classes.paper}>
            <Typography variant="h4" style={{ margin: 10 }}>
              Compare Products/Services
            </Typography>
            <Grid container className={classes.container}>
              <div className={classes.topics}></div>
              <div className={classes.cardSection}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <CompareSearch setPostData={setPost1Data} />
                  </Grid>
                  <Grid item xs={4}>
                    <CompareSearch setPostData={setPost2Data} />
                  </Grid>
                  <Grid item xs={4}>
                    <CompareSearch setPostData={setPost3Data} />
                  </Grid>
                </Grid>
              </div>
            </Grid>

            {/* start images */}
            <Grid container className={classes.container}>
              <div className={classes.topics}>Images</div>
              <div className={classes.cardSection}>
                <Grid container spacing={2}>
                  {/* start image set 1 */}
                  <Grid item xs={4}>
                    {
                      post1Data.title ? (
                        <>
                          <Grid style={{ height: 230 }} container justifyContent="center" alignItems="center">
                            <div>
                              <ImageCarousel images={post1Data.imgURL} />
                            </div>
                          </Grid>
                          <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Rating
                              value={parseFloat(
                                Object.keys(post1Data).length !== 0 ? post1Data.rate : "0"
                              )}
                              name="byRating"
                              precision={0.25}
                              readOnly
                            />
                            <Grid container justifyContent="center">
                              <Typography variant="subtitle2">
                                ( {post1Data.rate} )
                              </Typography>
                            </Grid>
                          </Grid>
                        </>
                      ): (
                        <Grid container style={{height:230}} justifyContent="center">
                          <Skeleton variant="rect" animation="wave" style={{height:"85%", width:"80%"}}>

                          </Skeleton>
                          <Skeleton variant="rect" animation="wave" style={{height:30,marginTop:10, width:"80%"}}>

                          </Skeleton>
                        </ Grid>
                      )
                    }
                    
                  </Grid>
                  {/* end image set 1 */}

                  {/* start image set 2 */}
                  <Grid item xs={4}>
                    {
                      post2Data.title ? (
                        <>
                          <Grid style={{ height: 230 }} container justifyContent="center" alignItems="center">
                            <div>
                              <ImageCarousel images={post2Data.imgURL} />
                            </div>
                          </ Grid>
                          <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Rating
                              value={parseFloat(
                                Object.keys(post2Data).length !== 0 ? post2Data.rate : "0"
                              )}
                              name="byRating"
                              precision={0.25}
                              readOnly
                            />
                            <Grid container justifyContent="center">
                              <Typography variant="subtitle2">
                                ( {post2Data.rate} )
                              </Typography>
                            </Grid>
                          </Grid>
                        </>
                      ): (
                        <Grid container style={{height:230}} justifyContent="center">
                          <Skeleton variant="rect" animation="wave" style={{height:"85%", width:"80%"}}>

                          </Skeleton>
                          <Skeleton variant="rect" animation="wave" style={{height:30,marginTop:10, width:"80%"}}>

                          </Skeleton>
                        </ Grid>
                      )
                    }
                    
                  </Grid>
                  {/* end image set 2 */}

                  {/* set image set 3 */}
                  <Grid item xs={4}>
                    {
                      post3Data.title ? (
                        <>
                          <Grid style={{ height: 230 }} container justifyContent="center" alignItems="center">
                            <div>
                              <ImageCarousel images={post3Data.imgURL} />
                            </div>
                          </Grid>
                          <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Rating
                              value={parseFloat(
                                Object.keys(post3Data).length !== 0 ? post3Data.rate : "0"
                              )}
                              name="byRating"
                              precision={0.25}
                              readOnly
                            />
                            <Grid container justifyContent="center">
                              <Typography variant="subtitle2">
                                ( {post3Data.rate} )
                              </Typography>
                            </Grid>
                          </Grid>
                        </>
                      ): (
                        <Grid container style={{height:230}} justifyContent="center">
                          <Skeleton variant="rect" animation="wave" style={{height:"85%", width:"80%"}}>

                          </Skeleton>
                          <Skeleton variant="rect" animation="wave" style={{height:30,marginTop:10, width:"80%"}}>

                          </Skeleton>
                        </ Grid>
                      )
                    }
                    
                  </Grid>
                  {/* end image set 3 */}
                </Grid>
              </div>
            </Grid>
            {/* end images */}

            {/* start ID */}
            <Grid container className={classes.container}>
              <div className={classes.topics}>Post ID</div>
              <div className={classes.cardSection}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {post1Data.postId ? post1Data.postId : "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {post2Data.postId ? post2Data.postId : "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {post3Data.postId ? post3Data.postId : "-"}
                  </Grid>
                </Grid>
              </div>
            </Grid>
            {/* end ID */}

            {/* start title */}
            <Grid container className={classes.container}>
              <div className={classes.topics}>Title</div>
              <div className={classes.cardSection}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {post1Data.brand ? post1Data.title : "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {post2Data.brand ? post2Data.title : "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {post3Data.brand ? post3Data.title : "-"}
                  </Grid>
                </Grid>
              </div>
            </Grid>
            {/* end title */}

            {/* start brand */}
            <Grid container className={classes.container}>
              <div className={classes.topics}>Brand</div>
              <div className={classes.cardSection}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {post1Data.brand ? post1Data.brand.name : "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {post2Data.brand ? post2Data.brand.name : "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {post3Data.brand ? post3Data.brand.name : "-"}
                  </Grid>
                </Grid>
              </div>
            </Grid>
            {/* end brand */}

            {/* start review count */}
            <Grid container className={classes.container}>
              <div className={classes.topics}>Number of reviews</div>
              <div className={classes.cardSection}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {post1Data.reviewCount ? post1Data.reviewCount : 0}
                  </Grid>
                  <Grid item xs={4}>
                    {post2Data.reviewCount ? post2Data.reviewCount : 0}
                  </Grid>
                  <Grid item xs={4}>
                    {post3Data.reviewCount ? post3Data.reviewCount : 0}
                  </Grid>
                </Grid>
              </div>
            </Grid>
            {/* end review count */}

            {/* start view count */}
            <Grid container className={classes.container}>
              <div className={classes.topics}>View Count</div>
              <div className={classes.cardSection}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {post1Data.viewCount ? post1Data.viewCount : 0}
                  </Grid>
                  <Grid item xs={4}>
                    {post2Data.viewCount ? post2Data.viewCount : 0}
                  </Grid>
                  <Grid item xs={4}>
                    {post3Data.viewCount ? post3Data.viewCount : 0}
                  </Grid>
                </Grid>
              </div>
            </Grid>
            {/* end view count */}

            {/* start reviews */}
            <Grid container className={classes.container}>
              <div className={classes.topics}>Recent reviews</div>
              <div className={classes.cardSection}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {post1Data.reviews ?
                      <ShowReviews reviews={post1Data.reviews} />
                      : "No reviews"}
                  </Grid>

                  <Grid item xs={4}>
                    {post2Data.reviews ?
                      <ShowReviews reviews={post2Data.reviews} />
                      : "No reviews"}
                  </Grid>
                  <Grid item xs={4}>
                    {post3Data.reviews ? 
                      <ShowReviews reviews={post3Data.reviews} />
                      : "No reviews"
                    }
                  </Grid>
                </Grid>
              </div>
            </Grid>
            {/* end review */}

            {/* start view count */}
            <Grid container className={classes.container}>
              <div className={classes.topics}>Description</div>
              <div className={classes.cardSection}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    {post1Data.description ? post1Data.description : "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {post2Data.description ? post2Data.description : "-"}
                  </Grid>
                  <Grid item xs={4}>
                    {post3Data.description ? post3Data.description : "-"}
                  </Grid>
                </Grid>
              </div>
            </Grid>
            {/* end view count */}

          </Controls.Paper>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}
