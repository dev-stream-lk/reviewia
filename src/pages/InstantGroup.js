import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  FormLabel,
  Grid,
  makeStyles,
  Typography,
  Card,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SendIcon from "@material-ui/icons/Send";
import { useHistory, useParams } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {UserContext} from '../context/UserContext';
import {getGroupData, sendMessage} from '../services/instantGroups';
import {getPostById} from '../services/posts';
import {getDateTime} from '../utils/dateTime';

const useStyles = makeStyles((theme) => ({
  titleLabel: {
    width: 150,
    wordWrap: "wrap",
    textAlign: "left",
  },
  titleValueLabel: {
    width: "calc(100% - 150px)",
    textAlign: "left",
  },
  productInfoSection: {
    overflowX: "scroll",
    paddingTop:20,
    [theme.breakpoints.up("md")]: {
      overflowX: "hidden",
    },
  },
  productDetails: {
    // marginTop: theme.spacing(10),
    [theme.breakpoints.up("md")]: {
      marginTop: 0,
    },
  },
  productImage: {
    maxWidth: 100,
    maxHeight: 100,
    [theme.breakpoints.up("md")]: {
      maxWidth: 200,
      maxHeight: 200,
    },
  },
  chatOuterPaper: {
    height: "70vh",
    overflowY: "scroll",
    marginBottom: theme.spacing(0),
  },
  paperBoxStyles: {
    marginBottom: 0,
  },
  userImage: {
    width: 35,
    height: 35,
    margin: `${theme.spacing(0)}px ${theme.spacing(2)}px`,
    borderRadius: "50%",
  },
  messageContainer: {},
  messageBox: {
    width: "90%"
  },
  messageDiv:{
    padding:8
  }
}));

const ProductCard = (props) => {
  const classes = useStyles();
  let { value=4,postData } = props;

  return (
    <Controls.Card className={classes.productInfoSection}>
      <Grid container alignItems="center">
        <Grid item xs={4} lg={12}>
          <CardMedia title={postData['title']}>
            <img src={`${postData['imgURL'] && postData['imgURL'][0].url}`} className={classes.productImage} />
          </CardMedia>
          <CardContent>
            <Rating
              name="phone"
              value={ parseFloat(postData['rate']) }
              precision={0.25}
              getLabelText={(val) => `${val} Heart${val !== 1 ? "s" : ""}`}
              readOnly
            />
            <Box>({postData['rate']})</Box>
          </CardContent>
        </Grid>

        <Grid
          item
          xs={8}
          lg={12}
          className={classes.productDetails}
          style={{ paddingBottom: 20 }}
        >
          <Grid container style={{ paddingLeft: 10 }}>
            <Grid container style={{marginBottom:5}} alignItems="center">
              <FormLabel className={classes.titleLabel}>Title</FormLabel>
              <FormLabel className={classes.titleValueLabel}>
                {postData['title']}
              </FormLabel>
            </Grid>
            <Grid container style={{marginBottom:5}} alignItems="center">
              <FormLabel className={classes.titleLabel}>Type</FormLabel>
              <FormLabel className={classes.titleValueLabel}>{postData['type'] && postData['type'] =="p" ? "Product":"Service" }</FormLabel>
            </Grid>

            <Grid container style={{marginBottom:5}} alignItems="center">
              <FormLabel className={classes.titleLabel}>Category</FormLabel>
              <FormLabel className={classes.titleValueLabel}>
                { postData['category'] && postData['category'].charAt(0).toUpperCase() + postData['category'].slice(1)}
              </FormLabel>
            </Grid>
            <Grid container style={{marginBottom:5}} alignItems="center">
              <FormLabel className={classes.titleLabel}>Sub Category</FormLabel>
              <FormLabel className={classes.titleValueLabel}>
                {postData['subCategory'] && postData['subCategory'].charAt(0).toUpperCase() + postData['subCategory'].slice(1)}
              </FormLabel>
            </Grid>
            {/* <Grid container alignItems="center">
              <FormLabel className={classes.titleLabel}>Product Year</FormLabel>
              <FormLabel className={classes.titleValueLabel}>2017</FormLabel>
            </Grid> */}
            <Grid container style={{marginBottom:5}} alignItems="center">
              <FormLabel className={classes.titleLabel}>Brand</FormLabel>
              <FormLabel className={classes.titleValueLabel}>
                {postData['brand'] && postData['brand']['name'].charAt(0).toUpperCase() + postData['brand']['name'].slice(1)}
              </FormLabel>
            </Grid>
            <Grid container style={{marginBottom:5}} alignItems="center">
              <FormLabel className={classes.titleLabel}>Post CreatedAt</FormLabel>
              <FormLabel className={classes.titleValueLabel}>
                {postData['createdAt'] && getDateTime(postData['createdAt'])}
              </FormLabel>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Controls.Card>
  );
};

const Message = (props) => {
  const classes = useStyles();
  const { appUserEmail , message, creatorEmail } = props;
  return (
    <React.Fragment>
      {appUserEmail == message['createdBy'] ? (
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end">
            <Controls.Paper
              style={{ backgroundColor: "#ffefF6" }}
              divClassName={classes.messageDiv}
              boxClassName={classes.messageBox}
            >
              <Grid container alignItems="center">
                <img src={`${message['avatar']}`} className={classes.userImage} />
                <div style={{flexGrow:1, display:"flex",justifyContent:"space-between", alignItems:"center"}}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontSize: 16, fontWeight: "bold" }}
                  >
                    Me : 
                  </Typography>
                  <Typography style={{float:"right"}} variant="caption">
                    {getDateTime(message['createdAt'])}
                  </Typography>
                </div>
                
              </Grid>
              <Grid container style={{ marginTop: 5, paddingLeft: 50 }}>
                <Typography variant="content" align="left">
                  {message['content']}
                </Typography>
              </Grid>
            </Controls.Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Grid container justifyContent="flex-start">
            <Controls.Paper
              style={{ backgroundColor: "#ddefF6" }}
              divClassName={classes.messageDiv}
              boxClassName={classes.messageBox}
            >
              <Grid container alignItems="center">
                <img src={`${message['avatar']}`} className={classes.userImage} />
                <Typography
                  variant="subtitle1"
                  style={{ fontSize: 16, fontWeight: "bold" }}
                >
                  {message['fullName']}
                  { message['createdBy'] == creatorEmail && " ( creator )" }
                </Typography>
                <Typography variant="caption">
                  {getDateTime(message['createdAt'])}
                </Typography>
              </Grid>
              <Grid container style={{ marginTop: 5, paddingLeft: 50 }}>
                <Typography variant="content" align="left">
                  {message["content"]}
                </Typography>
              </Grid>
            </Controls.Paper>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};


const NewMessage = (props) => {

  const {sendNewMessage} = props;
  const [messageInput, setMessageInput] = useState("");

  const handleMessage = async () => {
    let msg = messageInput;
    setMessageInput("")
    let res = await sendNewMessage(messageInput);
    if(!res){
      setMessageInput(msg);
    }
  }

  return (
    <Controls.Input
      style={{ margin: 20, marginTop: 0 }}
      multiline
      rows={2}
      endAdornment={<Controls.ActionButton disabled={ messageInput ? false : true } onClick={handleMessage}>
          <SendIcon color={ messageInput ? "primary" : "default" } />
        </Controls.ActionButton>
      }
      placeholder="Type a message"
      value={messageInput}
      onChange={(e) => setMessageInput(e.target.value)}
    ></Controls.Input>
  )
}

export default function InstantGroup(props) {
  const params = useParams();
  console.log(params)
  const groupId = params['groupId'];
  const postId = params['postId'];
  const history = useHistory();
  if(groupId == undefined){
    history.push("/pageNotFound")
  }
  const classes = useStyles();
  const {userData, setUserData} = useContext(UserContext);
  const [postData, setPostData] = useState({});
  const [groupData, setGroupData] = useState({});

  const scrollToBottom =  () => {
    let endOfChat = document.getElementById("endOfChat");
    if(endOfChat){
      endOfChat.scrollIntoView();
    }
  }

  // check user is login
  useEffect(() => {
    if (userData) {
      if(userData.isLoggedIn == false){
          history.push("/login")
      }
    }
  }, [userData]);

  // get post info
  useEffect( async () => {
    if(postId){
      let data = await getPostById(postId)
      if(data){
        setPostData(data)
      }else{
        history.replace("/pagenotfound")
      }
    }
  },[postId])

  // get chat group info
  useEffect( async ()=>{
    let res = await getGroupData(groupId,userData.email);
    console.log(res);
    if(res){
      setGroupData(res);
    }else{
      history.replace("/product/view/"+postId);
    }
  }, [groupId]);

  useEffect ( () => {
    scrollToBottom()
  },[groupData.messages])

  // send new message
  const sendNewMessage = async (message) => {
    let data = {
      email: userData.email,
      group: groupId,
      content: message
    }
    let res = await sendMessage(data);
    if(res){
      setGroupData({
        ...groupData,
        messages: [
          ...groupData.messages,
          res
        ]
      });
      scrollToBottom();
      return true;
    }
    return false;
  }

  return (
    <>
      <Header/>
      <Grid container className={"content"}>
        <Grid item xs={12} style={{ marginTop: 50 }}>
          <Typography variant="h4">Instant Group(Remaining: 2 days)</Typography>
        </Grid>
        <Grid container style={{ marginTop: 30 }}>
          <Grid item xs={12} md={6} lg={4} style={{ padding: 20, paddingTop:0 }}>
            <ProductCard  postData={postData} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <Grid>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <IconButton aria-label="addMembers">
                      <PersonAddIcon />
                    </IconButton>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Controls.Paper
                    boxClassName={classes.paperBoxStyles}
                    className={classes.chatOuterPaper}
                  >
                    <Grid container id="msgContainer"   className={classes.messageContainer}>
                      {
                        groupData && groupData.messages && groupData.messages.length !==0 ? 
                        (
                          groupData.messages.map((msg,i)=> (
                            <Message key={i} message={msg} appUserEmail={userData.email} creatorEmail={groupData["createdBy"]['email']} />
                          ))
                        ):(
                          <span>Messages not found</span>
                        )
                      }
                      {
                        groupData && groupData.messages && groupData.messages.length !==0 && (
                          <div id="endOfChat"></div>
                        )
                      }
                    </Grid>
                  </Controls.Paper>
                </CardContent>
              </Card>
            </Grid>

            <Grid container>
                <NewMessage sendNewMessage={sendNewMessage} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
