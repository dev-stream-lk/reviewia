import {
  Avatar,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  makeStyles,
  Typography,
  List,
  IconButton,
  CardMedia,
  Container,
} from "@material-ui/core";
import Button from "../../components/basic/Button";
import React, { useState, useEffect } from "react";
import { PreLoader } from "../../components/basic/PreLoader";
import Controls from "../../components/Controls";
import { adminBanPostDB, adminUnBanPostDB, getPostReports, getReportedPosts } from "../../services/adminPosts";
import { BlockOutlined } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
import { getDateTime } from "../../utils/dateTime";
import { getPostById } from "../../services/posts";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(2),
    },
  },

  paper: {
    marginTop: theme.spacing(0),
  },
  paperDiv: {
    padding: `${theme.spacing(0)}px ${theme.spacing(0)}px ${theme.spacing(
      4
    )}px ${theme.spacing(0)}px !important`,
  },
  productListcard: {
    width: "100%",
    backgroundColor: "#CCDEF5",
    marginBottom: 5,
    borderRadius:8
  },
  media: {
      width:"100%",
      display:"flex",
      justifyContent:"flex-start"
  },
}));

const AdminBanPost = (props) => {
  const classes = useStyles();
  const { open, setOpen, adminBanPost } = props;
  const [error, setError] = useState("");

  const onSubmit = async () => {
    let res = await adminBanPost();

    if (res) {
      setOpen(false);
      setError("");
    } else {
      setError("Unable to ban this post.");
    }
  };

  const Actions = () => {
    return (
      <Grid container justifyContent="flex-end">
        <Controls.Button
          style={{ marginRight: 10 }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Controls.Button>
        <Controls.Button
          color="secondary"
          onClick={() => onSubmit()}
        >
          Ban Post
        </Controls.Button>
      </Grid>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Ban post"
        openPopup={open}
        setOpenPopup={setOpen}
        actions={<Actions />}
      >
        {error !== "" && (
          <Grid
            container
            style={{
              marginTop: 8,
              padding: 8,
              marginBottom: 24,
              color: "red",
              background: "#ffaaaa",
            }}
            justifyContent="center"
          >
            <Typography variant="subtitle2">{error}</Typography>
          </Grid>
        )}
        <div className={classes.addCategory}>
          <Typography variant="subtitle2" >
              Are you sure?
          </Typography>
        </div>
      </Controls.Popup>
    </>
  );
};

const AdminUnBanPost = (props) => {
  const classes = useStyles();
  const { open, setOpen, adminUnBanPost } = props;
  const [error, setError] = useState("");

  const onSubmit = async () => {
    let res = await adminUnBanPost();

    if (res) {
      setOpen(false);
      setError("");
    } else {
      setError("Unable to ban this post.");
    }
  };

  const Actions = () => {
    return (
      <Grid container justifyContent="flex-end">
        <Controls.Button
          style={{ marginRight: 10 }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Controls.Button>
        <Controls.Button
          color="secondary"
          onClick={() => onSubmit()}
        >
          Active Post
        </Controls.Button>
      </Grid>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Active banned post"
        openPopup={open}
        setOpenPopup={setOpen}
        actions={<Actions />}
      >
        {error !== "" && (
          <Grid
            container
            style={{
              marginTop: 8,
              padding: 8,
              marginBottom: 24,
              color: "red",
              background: "#ffaaaa",
            }}
            justifyContent="center"
          >
            <Typography variant="subtitle2">{error}</Typography>
          </Grid>
        )}
        <div className={classes.addCategory}>
          <Typography variant="subtitle2" >
              Are you sure?
          </Typography>
        </div>
      </Controls.Popup>
    </>
  );
};

const ReportedPost=(props)=>{
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [reports, setReports] = useState([]);
    const {selectedPostId, set, adminBanPost, tabNumber, adminUnBanPost} = props;
    const [postData, setPostData] = useState({});
    const [openBan, setOpenBan] = useState(false);
    const [openUnBan, setOpenUnBan] = useState(false);

    // get post details
    useEffect( async () => {
      if(selectedPostId){
        let res = await getPostById(selectedPostId);
        console.log(res)
        if(res){
          setPostData(res);
        }
      }else{
        setPostData({});
      }
    },[selectedPostId]);

    // get report for selected post
    useEffect( async () => {
      let res = await getPostReports(selectedPostId);
      if(res){
        setReports(res);
      }
    },[]);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
      <Grid
        container
        xs={12}
        sm={12}
        md={12}
        style={{ position: "relative", width: "100%", maxHeight:"75vh", overflowY:"scroll" }}
      >
        <AdminBanPost open={openBan} setOpen={setOpenBan} adminBanPost={adminBanPost} />
        <AdminUnBanPost open={openUnBan} setOpen={setOpenUnBan} adminUnBanPost={adminUnBanPost} />
        <Controls.Card className={classes.productListcard} variant="outlined">
          <CardHeader
            avatar={ postData.avatarUrl ? (
              <img
                title={`${postData.title}`}
                alt=""
                src={`${postData.avatarUrl}`}
                className={classes.productCardImage}
              />
            ): (
              <Avatar style={{width:40, height:40}} title={`${postData.createdBy}`}  aria-label="recipe">
                { postData.createdBy && postData.createdBy[0]}
              </Avatar>
            ) }
            action={
              tabNumber === 0 ? (
                <IconButton title="Block post" onClick={() => setOpenBan(true)} aria-label="delete" className={classes.margin}>
                  <BlockOutlined fontSize="large" color="secondary" />
                </IconButton>
              ) : (
                <IconButton title="Undo block" onClick={() => setOpenUnBan(true)} aria-label="delete" className={classes.margin}>
                  <AddCircleOutlineIcon fontSize="large" color="primary" />
                </IconButton>
              )
            }
            titleTypographyProps={{style:{fontSize:20}}}
            title={postData.title}
            subheader={getDateTime(postData.createdAt)}
          />
          <CardContent>
            <div className={classes.media}>
              <div style={{width:150, height:150}}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={`${postData.imgURL && postData.imgURL.length >0 && postData.imgURL[0].url}`}
                ></img>
              </div>
              <div style={{paddingLeft:20}}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <Typography style={{ marginRight: 20 }}>Post Owner :</Typography>
                  {postData.createdBy}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <Typography style={{ marginRight: 20 }}>Email :</Typography>
                  {postData.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <Typography style={{ marginRight: 20 }}>Review Count :</Typography>
                  {postData.reviewCount}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <Typography style={{ marginRight: 20 }}>Rate :</Typography>
                  {postData.rate}
                </Typography>
              </div>
            </div>
          </CardContent>
          <CardActions
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: "5%",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              Show report details
            </Button>
          </CardActions>
          <Collapse in={expanded} style={{background:"white"}} timeout="auto" unmountOnExit>
            <CardContent>
              <List style={{ maxHeight: "70vh", overflow: "auto" }}>
                {reports.map((report, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={12}
                    justifyContent="center"
                    style={{ width: "100%" }}
                  >
                    <ReportCardDetail report={report} ls={1} />
                  </Grid>
                ))}
              </List>
            </CardContent>
          </Collapse>
        </Controls.Card>
      </Grid>
    );
}

// right side report card
const ReportCardDetail = (props) => {
  const classes = useStyles();
  const { report, ls } = props;

  return (
    <Grid container xs={12} style={{ position: "relative", width: "100%" }}>
      <Controls.Card className={classes.productListcard} variant="outlined">
      <CardHeader
          style={{textAlign:"left"}}
          avatar={ report.avatarUrl ? (
            <img
              title={`${report.reportedBy}`}
              alt=""
              src={`${report.avatarUrl}`}
              className={classes.productCardImage}
            />
          ): (
            <Avatar style={{width:40, height:40}} title={`${report.reportedBy}`}  aria-label="recipe">
              {report.reportedBy[0]}
            </Avatar>
          ) }
          title={`Report ID : ${report.id}`}
          subheader={getDateTime(report.createdAt)}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography style={{ marginRight: 20 }}>Reported By :</Typography>
            {report.reportedBy}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography style={{ marginRight: 20 }}>Post ID :</Typography>
            {report.subjectId}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography style={{ marginRight: 20 }}>Reason :</Typography>
            {report.reason}
          </Typography>
        </CardContent>
    </Controls.Card>
    </Grid>
  );
};

// left side report card
const ReportCard = (props) => {
  const classes = useStyles();
  const { report, ls , loadPost } = props;

  return (
    <Grid container xs={12} style={{ position: "relative", width: "100%" }}>
      <Controls.Card className={classes.productListcard} variant="outlined">
        <CardHeader
          style={{textAlign:"left"}}
          avatar={ report.avatarUrl ? (
            <img
              title={`${report.reportedBy}`}
              alt=""
              src={`${report.avatarUrl}`}
              className={classes.productCardImage}
            />
          ): (
            <Avatar style={{width:40, height:40}} title={`${report.reportedBy}`}  aria-label="recipe">
              {report.reportedBy[0]}
            </Avatar>
          ) }
          title={`Report ID : ${report.id}`}
          subheader={getDateTime(report.createdAt)}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography style={{ marginRight: 20 }}>Reported By :</Typography>
            {report.reportedBy}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography style={{ marginRight: 20 }}>Post ID :</Typography>
            {report.subjectId}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Typography style={{ marginRight: 20 }}>Reason :</Typography>
            {report.reason}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="blue"
            style={{ backgroundColor: "#152840", color: "white" }}
            onClick={() => loadPost(report.id,report.subjectId)}
          >
            See More
          </Button>
        </CardActions>
      </Controls.Card>
    </Grid>
  );
};

export default function ReportedBannedPost() {
  const classes = useStyles();
  var flag = 0;
  const [selected, setSelected] = useState(flag);
  const [listLoading, setListLoading] = useState(true);
  const [reportedPosts, setReportedPosts] = useState([]);
  const [loadPost, setLoadPost] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [selectedReportId, setSelectedReportId] = useState(0);

  useEffect(() => {
    if(selectedPostId){
      setLoadPost(false);
      setSelectedPostId(0);
      setSelectedReportId(0);
    }
  }, [selected])
  // get all post reports
  const getPostReports = async () => {
    setListLoading(true);
    let data = await getReportedPosts();
    if (data) {
      let reports = {notBanned:[],banned:[]};
      data.forEach( (report) => {
        if(report.is_processed){
          reports.banned =  [...reports.banned, report];
        }else{
          reports.notBanned = [...reports.notBanned, report];
        }
      });
      setReportedPosts(reports);
      setListLoading(false);
    }
  }
  useEffect(async () => {
    getPostReports();
  }, []);

  const loadThePost =(reportId, postId)=>{
      setSelectedPostId(postId);
      setSelectedReportId(reportId)
      setLoadPost(!loadPost);
  }

  const adminBanPost = async () => {
    let res = await adminBanPostDB(selectedReportId);
    console.log(res)
    if(res){
      setSelectedPostId(0);
      getPostReports();
    }
    return res;
  }

  const adminUnBanPost = async () => {
    let res = await adminUnBanPostDB(selectedReportId);
    console.log(res)
    if(res){
      setSelectedPostId(0);
      getPostReports();
    }
    return res;
  }

  return (
    <Grid container spacing={2} xs={12} sm={12} md={12}>
      <Grid item xs={12} sm={12} md={6} className={classes.wrapper}>
        <Controls.Paper
          className={classes.paper}
          divClassName={classes.paperDiv}
        >
          <Grid container alignItems="center">
            <Grid
              item
              xs={6}
              style={
                selected === 0
                  ? { backgroundColor: "#236CC7" }
                  : { boxShadow: "0px 2px 2px 1px rgba(0,0,0,0.21)" }
              }
            >
              <Controls.ActionButton
                onClick={() => setSelected(0)}
                style={{
                  width: "100%",
                  height: "100%",
                  ...(selected === 0 ? { color: "white" } : { color: "black" }),
                }}
              >
                Reported Posts
              </Controls.ActionButton>
            </Grid>
            <Grid
              item
              xs={6}
              style={
                selected === 1
                  ? { backgroundColor: "#236CC7" }
                  : { boxShadow: "0px 2px 2px 1px rgba(0,0,0,0.21)" }
              }
            >
              <Controls.ActionButton
                onClick={() => setSelected(1)}
                style={{
                  width: "100%",
                  height: "100%",
                  ...(selected === 1 ? { color: "white" } : { color: "black" }),
                }}
              >
                Banned Posts
              </Controls.ActionButton>
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              style={{ marginLeft: 5, marginRight: 5, position: "relative" }}
            >
              <PreLoader loading={listLoading} />
              <List style={{ height: "75vh", overflow: "auto" }}>
              {selected === 0 ? 
                reportedPosts.notBanned && reportedPosts.notBanned.length>0 ? reportedPosts.notBanned.map((report, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={12}
                    justifyContent="center"
                    style={{ width: "100%" }}
                  >
                      <ReportCard report={report} ls={1} setSelectedPostId={setSelectedPostId} loadPost={loadThePost} />
                  </Grid>
                )): (
                  <Grid container justifyContent="center">
                    <Typography>
                      No New  reports.
                    </Typography>
                  </Grid>
                )
              : (
                reportedPosts.banned && reportedPosts.banned.length>0 ? reportedPosts.banned.map((report, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    md={12}
                    justifyContent="center"
                    style={{ width: "100%" }}
                  >
                  <ReportCard report={report} ls={0} setSelectedPostId={setSelectedPostId} loadPost={loadThePost} />
                  </Grid>
                )): (
                  <Grid container justifyContent="center">
                    <Typography>
                      No banned posts.
                    </Typography>
                  </Grid>
                )
              )
              }
                
              </List>
            </Grid>

            {/* <Typography
                variant="h6"
                align="left"
                style={{ marginTop: "20px", marginLeft: 40, fontWeight: 600 }}
                component="div"
              > </Typography> */}
          </Grid>
        </Controls.Paper>
      </Grid>
      <Grid item xs={12} sm={12} md={6} className={classes.wrapper}>
        <Controls.Paper
          className={classes.paper}
          divClassName={classes.paperDiv}
        >
          <Grid container alignItems="center">
            <Grid
              item
              xs={12}
              //   style={
              //     selected === 0
              //       ? { backgroundColor: "#236CC7" }
              //       : { boxShadow: "0px 2px 2px 1px rgba(0,0,0,0.21)" }
              //   }
              style={{ backgroundColor: "#236CC7" }}
            >
              <Controls.ActionButton
                onClick={() => setSelected(0)}
                style={{
                  width: "100%",
                  height: "100%",
                  color: "white",
                  //   ...(selected === 0 ? { color: "white" } : { color: "black" }),
                }}
              >
                Reported Post Details
              </Controls.ActionButton>
            </Grid>
            <Grid container alignContent="center" sm={12} xs={12} md={12} style={{width:"100%"}}>
              {loadPost ? <ReportedPost tabNumber={selected} adminUnBanPost={adminUnBanPost} adminBanPost={adminBanPost} selectedPostId={selectedPostId}></ReportedPost> : (
                <Grid container justifyContent="center" style={{marginTop:30}}>
                  <Typography>Please select a report for see more details.</Typography>
                </ Grid>
              )}
            </Grid>
          </Grid>
        </Controls.Paper>
      </Grid>
    </Grid>
  );
}
