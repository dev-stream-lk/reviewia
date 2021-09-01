import {
  Grid,
  makeStyles,
  Typography,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  CardMedia,
  CardHeader,
  Avatar,
  CardContent,
} from "@material-ui/core";
import { React, useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductListContainer from "../components/comp_productList";
import GroupListContainer from "../components/comp_groupList";
import ProfilePic from "../static/img/Profile.png";
import { useHistory } from "react-router-dom";
import {UserContext} from '../context/UserContext';
import {get_user_basic_info} from '../services/auth';

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: theme.spacing(5),
  },
  reviewContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  productContainer: {
    textAlign: "start",
  },
  productListcard: {
    width: "100%",
  },
  productListItemImage: {
    minHeight: 80,
    maxHeight: 150,
  },
  profilePicture: {
    minHeight: 80,
    maxHeight: 150,
  },
  productListItemHeader: {
    width: "100%",
    textAlign: "left",
  },
  paper: {
    padding: theme.spacing(1), //grid padding
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  Button_grid: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));



const Profile = (props) => {

  const initialProfileData = {
    id: 31,
    firstName: "Chamith",
    lastName: "Nimmitha",
    email: "chamith123.cn@gmail.com",
    role: "USER",
    favouriteList: []
  }

  const classes = useStyles();
  const [active, setActive] = useState("GroupList");
  const {userData, setUserData} = useContext(UserContext);
  const [profileData, setProfileData] = useState({});
  const history = useHistory();

  useEffect( async ()=>{
    if(userData){
      let data = await get_user_basic_info(userData.token, userData.email)
      if (data){
        setProfileData(data);
      }
    }
  }, [userData])

  useEffect( ()=>{
    if(userData){
        if(userData.isLoggedIn == false){
            history.push("/login")
        }
    }
  },[userData])

  return (
    <div>
      <Header />
      <div className={classes.mainDiv}>
        <Grid container className={classes.productContainer}>
          {/* LHS */}
          <Grid item xs={12} md={5}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className = "PicDiv"
            >
              <Grid
                item
                xs={12}
                sm={5}
                md={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Grid container justify="center" className="pictureContainer">
                  <img src={ProfilePic} className={classes.profilePicture} />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={7} md={12} direction="column">
                <Controls.Paper>Id:{profileData.id}</Controls.Paper>
                <Controls.Paper>Name:{`${profileData.firstName} ${profileData.lastName}`}</Controls.Paper>
                <Controls.Paper>Email:{profileData.email}</Controls.Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* RHS */}
          <Grid item xs={12} md={7}>
            <Grid container style={{ textAlign: "center" }}>
              <Grid item xs={6} className="Button_grid">
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  aria-label="contained primary button group"
                >
                  <Button onClick={() => setActive("ProductList")}>
                    My Posts
                  </Button>
                  <Button onClick={() => setActive("GroupList")}>
                    My Groups
                  </Button>
                </ButtonGroup>
              </Grid>
              {/* <Grid item xs={6}>
                <Button variant="outlined">Write a review</Button>
              </Grid> */}
              <Grid item xs={12}>
                <Controls.Paper className={useStyles.paper}>
                  <Grid container className={classes.reviewContainer}>
                    <Grid item xs={1}></Grid>
                    <Grid container>
                      {active === "ProductList" && <ProductListContainer />}
                      {active === "GroupList" && <GroupListContainer />}
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

export default Profile;
