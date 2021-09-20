import {
  Box,
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import "../App.css";
import { Rating } from "@material-ui/lab";
import React, { useContext, useEffect, useRef, useState } from "react";
import Controls from "../components/Controls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SendIcon from "@material-ui/icons/Send";
import { useHistory, useParams } from "react-router-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { UserContext } from "../context/UserContext";
import {
  getGroupData,
  sendMessage,
  addInstantGroupMemebers,
  removeInstantGroupMemebers,
  deleteInstantGroup,
  leaveFromGroup,
} from "../services/instantGroups";
import { getPostById } from "../services/posts";
import { getDateTime, getTimeRemains } from "../utils/dateTime";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MultipleSelect from "../components/basic/MultipleSelect";
import RefreshIcon from "@material-ui/icons/Refresh";
import ReplayIcon from "@material-ui/icons/Replay";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    paddingTop: 20,
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
    height: "100vh",
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
    width: "90%",
  },
  messageDiv: {
    padding: 8,
  },
  reportPopup: {
    width: 500,
  },
  replyIcon: {
    animation: "replyIconAnimation 4s infinite",
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  let { value = 4, postData } = props;

  return (
    <Controls.Card className={classes.productInfoSection}>
      <Grid container alignItems="center">
        <Grid item xs={4} lg={12}>
          <CardMedia title={postData["title"]}>
            <img
              src={`${postData["imgURL"] && postData["imgURL"][0].url}`}
              className={classes.productImage}
            />
          </CardMedia>
          <CardContent>
            <Rating
              name="phone"
              value={parseFloat(postData["rate"])}
              precision={0.25}
              getLabelText={(val) => `${val} Heart${val !== 1 ? "s" : ""}`}
              readOnly
            />
            <Box>({postData["rate"]})</Box>
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
            <Grid container style={{ marginBottom: 5 }} alignItems="center">
              <FormLabel className={classes.titleLabel}>Title</FormLabel>
              <FormLabel className={classes.titleValueLabel}>
                {postData["title"]}
              </FormLabel>
            </Grid>
            <Grid container style={{ marginBottom: 5 }} alignItems="center">
              <FormLabel className={classes.titleLabel}>Type</FormLabel>
              <FormLabel className={classes.titleValueLabel}>
                {postData["type"] && postData["type"] == "p"
                  ? "Product"
                  : "Service"}
              </FormLabel>
            </Grid>

            <Grid container style={{ marginBottom: 5 }} alignItems="center">
              <FormLabel className={classes.titleLabel}>Category</FormLabel>
              <FormLabel className={classes.titleValueLabel}>
                {postData["category"] &&
                  postData["category"].charAt(0).toUpperCase() +
                    postData["category"].slice(1)}
              </FormLabel>
            </Grid>
            <Grid container style={{ marginBottom: 5 }} alignItems="center">
              <FormLabel className={classes.titleLabel}>Sub Category</FormLabel>
              <FormLabel className={classes.titleValueLabel}>
                {postData["subCategory"] &&
                  postData["subCategory"].charAt(0).toUpperCase() +
                    postData["subCategory"].slice(1)}
              </FormLabel>
            </Grid>
            {/* <Grid container alignItems="center">
              <FormLabel className={classes.titleLabel}>Product Year</FormLabel>
              <FormLabel className={classes.titleValueLabel}>2017</FormLabel>
            </Grid> */}
            <Grid container style={{ marginBottom: 5 }} alignItems="center">
              <FormLabel className={classes.titleLabel}>Brand</FormLabel>
              <FormLabel className={classes.titleValueLabel}>
                {postData["brand"] &&
                  postData["brand"]["name"].charAt(0).toUpperCase() +
                    postData["brand"]["name"].slice(1)}
              </FormLabel>
            </Grid>
            <Grid container style={{ marginBottom: 5 }} alignItems="center">
              <FormLabel className={classes.titleLabel}>
                Post CreatedAt
              </FormLabel>
              <FormLabel className={classes.titleValueLabel}>
                {postData["createdAt"] && getDateTime(postData["createdAt"])}
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
  const { appUserEmail, message, creatorEmail } = props;
  return (
    <React.Fragment>
      {appUserEmail == message["createdBy"] ? (
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end">
            <Controls.Paper
              style={{ backgroundColor: "#ffefF6" }}
              divClassName={classes.messageDiv}
              boxClassName={classes.messageBox}
            >
              <Grid container alignItems="center">
                <img
                  src={`${message["avatar"]}`}
                  className={classes.userImage}
                />
                <div
                  style={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{ fontSize: 16, fontWeight: "bold" }}
                  >
                    Me :
                  </Typography>
                  <Typography style={{ float: "right" }} variant="caption">
                    {getDateTime(message["createdAt"])}
                  </Typography>
                </div>
              </Grid>
              <Grid container style={{ marginTop: 5, paddingLeft: 50 }}>
                <Typography variant="content" align="left">
                  {message["content"]}
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
                <img
                  src={`${message["avatar"]}`}
                  className={classes.userImage}
                />
                <Typography
                  variant="subtitle1"
                  style={{ fontSize: 16, fontWeight: "bold" }}
                >
                  {message["fullName"]}
                  {message["createdBy"] == creatorEmail && " ( creator )"}
                </Typography>
                <Typography variant="caption">
                  {getDateTime(message["createdAt"])}
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
  const { sendNewMessage } = props;
  const [messageInput, setMessageInput] = useState("");

  const handleMessage = async () => {
    let msg = messageInput;
    setMessageInput("");
    let res = await sendNewMessage(messageInput);
    if (!res) {
      setMessageInput(msg);
    }
  };

  return (
    <Controls.Input
      style={{ margin: 20, marginTop: 0 }}
      multiline
      rows={2}
      endAdornment={
        <Controls.ActionButton
          disabled={messageInput ? false : true}
          onClick={handleMessage}
        >
          <SendIcon color={messageInput ? "primary" : "default"} />
        </Controls.ActionButton>
      }
      placeholder="Type a message"
      value={messageInput}
      onChange={(e) => setMessageInput(e.target.value)}
    ></Controls.Input>
  );
};

const DeleteGroup = (props) => {
  const classes = useStyles();
  const { open, setOpen, userData, setError, postData, groupData } = props;
  const history = useHistory();

  const deleteGroup = async () => {
    let data = { id: groupData["id"], email: userData.email };
    let res = await deleteInstantGroup(data);
    if (res) {
      history.replace(`/product/view/${postData["postId"]}`);
    } else {
      setError("Group deletion failed...");
    }
  };

  const Actions = () => {
    return (
      <>
        <Controls.Button onClick={() => setOpen(false)}>Cancel</Controls.Button>

        <Controls.Button onClick={deleteGroup} color="secondary">
          Delete Group
        </Controls.Button>
      </>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Delete Group"
        openPopup={open}
        setOpenPopup={setOpen}
        actions={<Actions />}
      >
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

const AddInstantGroupMembers = (props) => {
  const classes = useStyles();
  const { open, setOpen, userData, setError, postData, groupData } = props;
  const [dataList, setDataList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [initialUsers, setInitialUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (groupData["users"]) {
      let dataList = groupData["users"].map((user, i) => {
        return {
          title: `${user.firstName} ${user.lastName}`,
          email: user.email,
        };
      });
      // remove current user
      dataList = dataList.filter((item, i, self) => {
        if (userData.email == item.email) {
          return false;
        }
        return true;
      });
      setInitialUsers(dataList);
      setSelectedUsers(dataList);
    }
  }, [groupData]);

  useEffect(async () => {
    if (postData["reviews"]) {
      let dataList = postData["reviews"].map((review, i) => {
        return { title: review.reviewedBy, email: review.email };
      });

      // filter unique users
      dataList = dataList.filter((item, i, self) => {
        if (userData.email == item.email) {
          return false;
        }
        return i === self.findIndex((t) => t.email === item.email);
      });
      setDataList(dataList);
    }
  }, [postData]);

  // add or remove group members
  const handleSubmit = async (e) => {
    let selectedEmails = selectedUsers.map((user, i) => {
      return user.email;
    });

    let initialEmails = initialUsers.map((user, i) => {
      return user.email;
    });

    let newEmails = selectedEmails.filter((x) => !initialEmails.includes(x));
    let removedEmails = initialEmails.filter(
      (x) => !selectedEmails.includes(x)
    );

    let addRes = await addInstantGroupMemebers({
      id: groupData["id"],
      emails: newEmails,
    });
    let removeRes = await removeInstantGroupMemebers({
      id: groupData["id"],
      emails: removedEmails,
    });
    if (!addRes) {
      setError("Add new members failed.");
    }
    if (!removeRes) {
      setError("Remove members failed.");
    }
    window.location.reload(false);
    setOpen(false);
  };

  const Actions = () => {
    return (
      <>
        <Controls.Button onClick={() => setOpen(false)} color="secondary">
          Cancel
        </Controls.Button>

        <Controls.Button onClick={handleSubmit}>Save</Controls.Button>
      </>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Report Review"
        openPopup={open}
        setOpenPopup={setOpen}
        actions={<Actions />}
      >
        <Grid
          container
          style={{ width: "500" }}
          className={classes.reportPopup}
        >
          <Grid item xs={12}>
            <MultipleSelect
              label="Select Members"
              placeholder="Search"
              defaultValue={initialUsers}
              setSelectedUsers={setSelectedUsers}
              dataList={dataList}
              styles={{ marginBottom: 150 }}
            />
          </Grid>
        </Grid>
      </Controls.Popup>
    </>
  );
};

const RemainingTime = (props) => {
  const [remains, setRemains] = useState("");
  const { datetime } = props;

  useEffect(() => {
    if (datetime) {
      setInterval(async () => {
        await getRemainTime(datetime);
      }, 1000);
    }
  }, [datetime]);

  const getRemainTime = async (datetime) => {
    if (datetime) {
      let d = getTimeRemains(datetime, 7);
      setRemains(`${d.d}d : ${d.h}h : ${d.m}m : ${d.s}s`);
    }
  };

  return (
    <Typography variant="h4">Instant Group( Remaining: {remains} )</Typography>
  );
};

const LeaveGroup = (props) => {
  const classes = useStyles();
  const { open, setOpen, userData, postData, groupData } = props;
  const [error, setError] = useState("");
  const history = useHistory();

  const deleteGroup = async () => {
    let data = { id: groupData["id"], email: userData.email };
    let res = await leaveFromGroup(data);
    if (res) {
      setError("");
      history.replace(`/product/view/${postData["postId"]}`);
    } else {
      setError("Leave group failed...");
    }
  };

  const handleClose = () => {
    setError("");
    setOpen(false);
  }

  const Actions = () => {
    return (
      <>
        <Controls.Button onClick={handleClose}>Cancel</Controls.Button>

        <Controls.Button onClick={deleteGroup} color="secondary">
          Leave
        </Controls.Button>
      </>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Leave Group"
        openPopup={open}
        setOpenPopup={setOpen}
        actions={<Actions />}
      >
        <Grid
          container
          style={{ width: "500" }}
          className={classes.reportPopup}
        >
          {
            error !== "" && (
              <Grid container justifyContent="center" style={{padding:8, color:"red", background:"#ffeeee"}}>
                <Typography variant="caption">
                  {error}
                </Typography>
              </Grid>
            )
          }
          <Grid item xs={12}>
            <Typography>Are you sure? Do you want to leave?</Typography>
          </Grid>
        </Grid>
      </Controls.Popup>
    </>
  );
};

const GroupMembersSection = (props) => {
  const { groupData, postData } = props;
  const { userData } = useContext(UserContext);
  const classes = useStyles();
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [error, setError] = useState("");

  return (
    <Grid container>
      <AddInstantGroupMembers
        setError={setError}
        groupData={groupData}
        open={addMemberOpen}
        setOpen={setAddMemberOpen}
        userData={userData}
        postData={postData}
      />
      <div style={{ width: "100%", maxHeight: "50vh", overflowY: "scroll" }}>
        <Controls.Paper>
          <Grid container>
            <Typography variant="h6">
              Group Members
            </Typography>
          </Grid>
          {groupData["createdBy"] &&
            groupData.createdBy.email === userData.email && (
              <Grid
                container
                style={{ marginTop: 8, marginBottm: 8 }}
                justifyContent="flex-end"
              >
                <IconButton
                  onClick={() => setAddMemberOpen(true)}
                  title="Add members"
                  color="primary"
                  aria-label="addMembers"
                >
                  <PersonAddIcon />
                </IconButton>
              </Grid>
            )}

          <List dense={true}>
            {groupData.users &&
              groupData.users.map((member, i) => {
                {
                  return member.email !== userData.email ? (
                    <>
                      <div>
                        <ListItem
                          style={{ background: "#eee", marginBottom: 8 }}
                        >
                          <ListItemAvatar>
                            <div style={{ maxWidth: 40, maxHeight: 40 }}>
                              <img
                                src={`${member.avatar}`}
                                style={{ width: "100%", borderRadius: "50%" }}
                              />
                            </div>
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${member.firstName} ${member.lastName} `}
                            secondary={"Secondary text"}
                          />
                        </ListItem>
                      </div>
                    </>
                  ) : null;
                }
              })}
          </List>
        </Controls.Paper>
      </div>
    </Grid>
  );
};

const MessageSection = (props) => {
  const { userData, postId, groupId, postData } = props;
  const [groupData, setGroupData] = useState({});
  const history = useHistory();
  const [error, setError] = useState("");
  const classes = useStyles();
  const [deleteGroupOpen, setDeleteGroupOpen] = useState(false);
  const endOfChat = useRef();
  const [refreshing, setRefreshing] = useState(true);
  const [openLeave, setOpenLeave] = useState(false);

  // send new message
  const sendNewMessage = async (message) => {
    let data = {
      email: userData.email,
      group: groupId,
      content: message,
    };
    let res = await sendMessage(data);
    if (res) {
      setGroupData({
        ...groupData,
        messages: [...groupData.messages, res],
      });
      scrollToBottom();
      return true;
    }
    return false;
  };

  const scrollToBottom = () => {
    let endOfChat = document.getElementById("endOfChat");
    let msgContainer = document.getElementById("msgContainer");
    if (endOfChat) {
      var offset = endOfChat.offsetTop;
      msgContainer.scrollTop = offset;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [groupData.messages]);

  // get chat group info
  const getGroupInfo = async () => {
    if (groupId) {
      setRefreshing(true);
      let res = await getGroupData(groupId, userData.email);
      if (res) {
        setGroupData(res);
      } else {
        history.replace("/product/view/" + postId);
      }
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (groupId) {
      getGroupInfo();
      var infiniteRefresh = setInterval(() => {
        getGroupInfo();
      }, 10000);

      return () => {
        clearInterval(infiniteRefresh);
      };
    }
  }, []);

  return (
    <>
      <DeleteGroup
        setError={setError}
        groupData={groupData}
        open={deleteGroupOpen}
        setOpen={setDeleteGroupOpen}
        userData={userData}
        postData={postData}
      />

      <LeaveGroup
        groupData={groupData}
        open={openLeave}
        setOpen={setOpenLeave}
        userData={userData}
        postData={postData}
      />
      <Grid>
        <Card className={classes.root}>
          <CardHeader
            style={{ paddingRight: 50, paddingBottom: 0 }}
            action={
              <>
                <IconButton
                  title="Refresh Chat"
                  color="primary"
                  aria-label="addMembers"
                >
                  {refreshing ? (
                    <ReplayIcon className={classes.replyIcon} />
                  ) : (
                    <RefreshIcon onClick={getGroupInfo} />
                  )}
                </IconButton>
                {groupData["createdBy"] &&
                groupData["createdBy"]["email"] === userData.email ?
                groupData.active == true ? (
                  <>
                    <IconButton
                      onClick={() => setDeleteGroupOpen(true)}
                      title="Delete group"
                      color="secondary"
                      aria-label="addMembers"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </>
                ) : null
                :(
                  <IconButton
                    onClick={() => setOpenLeave(true)}
                    title="Leave group"
                    color="secondary"
                    aria-label="leave"
                  >
                    <ExitToAppIcon />
                  </IconButton>
                )
                }
              </>
            }
          />
          {!error && (
            <Typography variant="caption" color="secondary">
              {error}
            </Typography>
          )}
          <CardContent>
            <Controls.Paper
              boxClassName={classes.paperBoxStyles}
              className={classes.chatOuterPaper}
              id="msgContainer"
            >
              <Grid container className={classes.messageContainer}>
                {groupData &&
                groupData.messages &&
                groupData.messages.length !== 0 ? (
                  groupData.messages.map((msg, i) => (
                    <Message
                      key={i}
                      message={msg}
                      appUserEmail={userData.email}
                      creatorEmail={groupData["createdBy"]["email"]}
                    />
                  ))
                ) : (
                  <span>Messages not found</span>
                )}
                {groupData &&
                  groupData.messages &&
                  groupData.messages.length !== 0 && (
                    <div ref={endOfChat} id="endOfChat"></div>
                  )}
              </Grid>
            </Controls.Paper>
          </CardContent>
        </Card>
      </Grid>
      {groupData.active == true && (
        <Grid container>
          <NewMessage sendNewMessage={sendNewMessage} />
        </Grid>
      )}
    </>
  );
};

export default function InstantGroup(props) {
  const params = useParams();
  const groupId = params["groupId"];
  const postId = params["postId"];
  const history = useHistory();

  if (groupId == undefined) {
    history.push("/pageNotFound");
  }
  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);
  const [postData, setPostData] = useState({});
  const [groupData, setGroupData] = useState({});
  const [error, setError] = useState("");

  // check user is login
  useEffect(() => {
    if (userData) {
      if (userData.isLoggedIn == false) {
        history.push("/login");
      }
    }
  }, [userData]);

  // get chat group info
  useEffect(async () => {
    let res = await getGroupData(groupId, userData.email);
    if (res) {
      setGroupData(res);
    } else {
      history.replace("/product/view/" + postId);
    }
  }, [groupId]);

  // get post info
  useEffect(async () => {
    if (postId) {
      let data = await getPostById(postId);
      if (data) {
        setPostData(data);
      } else {
        history.replace("/pagenotfound");
      }
    }
  }, [postId]);

  return (
    <>
      <Header />
      <Grid container className={"content"}>
        <Grid item xs={12} style={{ marginTop: 50 }}>
          {groupData.active == true ? (
            <RemainingTime datetime={groupData ? groupData["createdAt"] : ""} />
          ) : (
            <Typography variant="h4">Instant Group( Expired )</Typography>
          )}
        </Grid>
        <Grid container style={{ marginTop: 30 }}>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            style={{ padding: 20, paddingTop: 0 }}
          >
            <Grid container>
              <ProductCard postData={postData} />
            </Grid>
            <Grid container style={{ marginTop: 20 }}>
              <GroupMembersSection postData={postData} groupData={groupData} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <MessageSection
              userData={userData}
              postData={postData}
              groupId={groupId}
              postId={postId}
            />
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
