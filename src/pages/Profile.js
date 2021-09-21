import { Grid, makeStyles, Button, ButtonGroup, Typography } from "@material-ui/core";
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
import EditIcon from '@material-ui/icons/Edit';
import { ratingFieldRequired, requiredField } from "../components/Validators";
import { Form, useForm } from "../components/useForm";
import { updateProfile } from "../services/user";

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
    width:200,
    height:200,
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

const EditProfile = (props) => {
  const classes = useStyles();
  const { open, setOpen, editProfile, userData } = props;
  const [enableSave, setEnableSave] = useState(false);
  const names = userData.name.split(" ");
  const initialValues = {
    firstName: names[0] || "",
    lastName: names[1] || ""
  };
  const [error, setError] = useState("");

  const validate = (fieldValue = values) => {
    const temp = {};
    if ("firstName" in fieldValue)
      temp.firstName = requiredField(fieldValue.firstName);
    if ("lastName" in fieldValue)
      temp.lastName = requiredField(fieldValue.lastName);

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
    setErrors({});
    setOpen(false);
  }

  const onSubmit = async () => {
    if (validate()) {
      let res = await editProfile(values.firstName, values.lastName);
      if(res){
        setValues(initialValues);
        setOpen(false);
        setError("");
      }else{
        setError("Unable to edit profile");
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
        title="Edit Profile"
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
          <Grid container>
            <Controls.Input
              name="firstName"
              label="First Name"
              value={values.firstName}
              error={errors.firstName}
              onChange={handleInputChange}
              required={true}
            />
          </Grid>
          <Grid container style={{marginTop:20}}>
            <Controls.Input
              name="lastName"
              label="Last Name"
              value={values.lastName}
              error={errors.lastName}
              onChange={handleInputChange}
              required={true}
            />
          </Grid>
        </Form>
      </Controls.Popup>
    </>
  );
};


const Profile = (props) => {
  const initialProfileData = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    favouriteList: [],
  };

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  // check user is login
  useEffect(() => {
    if (userData) {
      if (userData.isLoggedIn == false) {
        history.push("/login");
      }
    }
  }, [userData]);

  const classes = useStyles();
  const [active, setActive] = useState("ProductList");
  const [profileData, setProfileData] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    if (userData) {
      if (userData.token == "") {
        history.push("/login");
      }
    }
  }, [userData]);

  useEffect(async () => {
    if (userData) {
      let data = await get_user_basic_info(userData.token, userData.email);
      console.log(data)
      if (data) {
        setProfileData(data);
      }
      setPageLoading(false);
    }
  }, [userData]);

  const editProfile = async (firstName, lastName) => {
      let res = await updateProfile(userData.email,firstName, lastName);
      if(res){
        window.location.reload()
      }
      return res;
  }

  return (
    <div>
      <Header />
      <div className={classes.mainDiv}>
        <EditProfile open={openEdit} setOpen={setOpenEdit} userData={userData} editProfile={editProfile}  />
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
                  <div className={classes.profilePicture}>
                    <img src={ profileData.avatar} style={{width:"100%",borderRadius:"50%"}}  />
                  </div>
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
                    onClick={()=>setOpenEdit(true)}
                  >
                    Edit profile <EditIcon style={{marginLeft:10, padding:2}} />
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
