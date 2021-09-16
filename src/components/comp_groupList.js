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
import NotFoundImage from '../assets/not-found.svg';
import { getAllInstantGroup } from "../services/instantGroups";
import { getDateTime } from "../utils/dateTime";

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
    marginBottom:0
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
  },
  groupListItemImage: {
    height: 50,
    width: 50,
  },
}));


const GroupCard = (props) => {
  const classes = useStyles();
  const {groupData, userData} = props;
  console.log(groupData)

  return (
    <Grid container style={{position:"relative"}}>
      <Link to={`/product/instantGroup/${groupData.postId}/${groupData.id}`} style={{textDecoration:"none", width:"100%"}}>
        <Controls.Card className={classes.productListcard}>
          <Grid container>
            <Grid container item xs={12}>
              <Grid container>
                <CardHeader
                  className={classes.productListItemHeader}
                  avatar={
                    <img
                      src={`${groupData.createdBy.avatar}`}
                      className={classes.groupListItemImage}
                    />
                  }
                  title={`${groupData.createdBy.firstName} ${groupData.createdBy.lastName}`}
                  subheader={ groupData.createdBy.email === userData.email ? "Creator":"Member"}
                />
              </Grid>
              <CardContent>
                <Grid item xs={12}  >
                  <Typography  variant="caption" display="block" gutterBottom>
                    Created At : 
                    {getDateTime(groupData.createdAt)}
                  </Typography>
                  <Typography style={{textAlign:"left"}}  variant="caption" display="block" gutterBottom>
                    Message Count : 
                    {groupData.messages.length}
                  </Typography>
                  <Typography style={{textAlign:"left"}}  variant="caption" display="block" gutterBottom>
                    State : 
                    {groupData.active ? (
                        <span style={{color:"green", fontWeight:"bold"}}>Active</span>
                      ):
                      (
                        <span style={{color:"red"}}>Expired</span>
                      )
                    }
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


  useEffect( async () => {
    let res = await getAllInstantGroup(userData.email);
    if(res){
      setMyGroups(res);
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
            <GroupCard groupData={group} userData={userData} />
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
