import {
  Grid,
  makeStyles,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CardMedia,
  CardHeader,
  Avatar,
  CardContent,
  ListItemText,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {Link} from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import {getUserGroups} from '../services/group';
import NotFoundImage from '../assets/not-found.svg';

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: theme.spacing(5),
  },
  reviewContainer: {
    padding: theme.spacing(2),
  },
  productContainer: {
    textAlign: "start",
  },
  productListcard: {
    width: "100%",
    backgroundColor: "#CCDEF5",
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
  Button_grid: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  avatar: {
    color: "red[900]",
  },
  notFoundImage:{
    width:"100%",
    maxWidth:"150px"
  }
}));

const GroupCard = (props) => {
  const classes = useStyles();

  return (
    <Grid container style={{position:"relative"}}>
      <Link to="/product/view/1" style={{textDecoration:"none", width:"100%"}}>
        <Controls.Card className={classes.productListcard}>
          <Grid container>
            <Grid container item xs={12}>
              <Grid container>
                <CardHeader
                  className={classes.productListItemHeader}
                  avatar={
                    <Avatar aria-label="recipe">
                      S
                    </Avatar>
                  }
                  title="Saman Kumara"
                  subheader="Creator"
                />
              </Grid>
              <CardContent>
                <Grid item xs={12}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Create Date:2012/08/09
                  </Typography>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Controls.Card>
      </Link>
      <IconButton style={{position:"absolute", right:20}} aria-label="options">
        <MoreVertIcon />
      </IconButton>
    </Grid>
  );
};

export default function GroupListContainer() {
  const classes = useStyles();
  const [myGroups, setMyGroups] = useState([]);
  const {userData, setUserData} = useContext(UserContext);

  useEffect( async ()=> {
    let data = await getUserGroups(userData.email)
    if(data){
      setMyGroups(data)
    }
  },[])

  return (
    <Grid
      item
      xs={12}
      style={{
        // maxHeight: "100vh",
        height: "75vh",
        overflow: "auto",
        paddingTop: "10px",
      }}
      container
      spacing={3}
    >
      { myGroups.length !== 0 ? myGroups.map((group, index) => 
        (
          <Grid key={index} item xs={12} md={12}>
            <GroupCard />
          </Grid>
        )):
        (
          <Grid item xs={12} alignItems="center" justifyContent="center" style={{height:"100%",display:"flex", flexDirection:"column"}}>
              <Typography variant="subtitle2" style={{marginBottom:20}}>
                You are not member in any group.
              </Typography>
              <img src={NotFoundImage} className={classes.notFoundImage} />
            </Grid>
        )
      }
    </Grid>
  );
}
