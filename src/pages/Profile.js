import { Grid, makeStyles, Button, ButtonGroup } from "@material-ui/core";
import { React, useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductListContainer from "../components/comp_productList";
import GroupListContainer from "../components/comp_groupList";
import ProfilePic from "../static/img/Profile.png";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { get_user_basic_info } from "../services/auth";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { PreLoader } from "../components/basic/PreLoader";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: theme.spacing(5),
  },
  reviewContainer: {
    padding: theme.spacing(2),
    paddingRight: 0,
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
  profileCameraButton: {
    width: 30,
    height: 30,
    position: "absolute",
    bottom: 0,
    borderRadius: "50%",
    opacity: 0.6,
    "&:hover": {
      opacity: 1,
    },
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
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    favouriteList: [],
  };

  const classes = useStyles();
  const [active, setActive] = useState("ProductList");
  const { userData, setUserData } = useContext(UserContext);
  const [profileData, setProfileData] = useState({});
  const history = useHistory();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(async () => {
    if (userData) {
      let data = await get_user_basic_info(userData.token, userData.email);
      if (data) {
        setProfileData(data);
      }
      setPageLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      if (userData.token == "") {
        history.push("/login");
      }
    }
  }, [userData]);

  return (
    <div>
      <Header />
      <div className={classes.mainDiv}>
        <Grid
          container
          className={classes.productContainer}
          style={{ position: "relative" }}
        >
          <PreLoader loading={pageLoading} opacity={1} />
          {/* LHS */}
          <Grid item xs={12} md={5}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className="PicDiv"
            >
              <Grid
                item
                xs={12}
                sm={5}
                md={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Grid
                  container
                  style={{ position: "relative" }}
                  justify="center"
                  className="pictureContainer"
                >
                  <Controls.ActionButton
                    className={classes.profileCameraButton}
                  >
                    <PhotoCameraIcon />
                  </Controls.ActionButton>
                  <img src={ProfilePic} className={classes.profilePicture} />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={7} md={12} direction="column">
                <Controls.Paper>
                  Id: {profileData.id && profileData.id}
                </Controls.Paper>
                <Controls.Paper>
                  Name:{" "}
                  {profileData.firstName &&
                    `${profileData.firstName} ${profileData.lastName}`}
                </Controls.Paper>
                <Controls.Paper>
                  Email: {profileData.email && profileData.email}
                </Controls.Paper>
                <Grid container justifyContent="flex-end">
                  <Controls.Button
                    style={{ marginRight: 40 }}
                    color="secondary"
                    variant="outlined"
                  >
                    Change Password
                  </Controls.Button>
                </Grid>
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
