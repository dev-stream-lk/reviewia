import { Grid, List, makeStyles, Typography } from "@material-ui/core";
import React, { useState,useEffect } from "react";
import Controls from "../../components/Controls";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import { getBlockedUsers } from "../../services/adminPosts";
import { PreLoader } from "../../components/basic/PreLoader";



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
  avatar: {
    backgroundColor: red[500],
    maxWidth: 65,
  },
  btnView: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: "Auto",
    marginBottom: "Auto",
    backgroundColor: "#1E3A5C",
    borderRadius: 4,
    margin: 5,
    color: "white",
  },
  btnViewInside: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: "Auto",
    marginBottom: "Auto",
    borderRadius: 4,
    margin: 5,
    backgroundColor: "white",
    color: "black",
  },
}));

const BlockUserCard= (props) =>{
     const classes = useStyles();
     const { details } = props;
    return (
      <Grid container xs={12} sm={12} md={12} lg={6} style={{}}>
        <Paper
        //   variant="outlined"
          square
          style={{ marginBottom: 15,marginRight:10,marginLeft:10, padding: 15, width: "100%" ,backgroundColor:'grey'}}
        >
          <Grid container xs={12} style={{ margin: 12 }}>
            <Grid item xs={3} style={{ margin: "Auto" }}>
              <Avatar aria-label="recipe" className={classes.avatar}>
                {details.firstName[0]}
                {details.lastName[0]}
              </Avatar>
            </Grid>
            <Grid
              item
              xs={9}
              style={{
                margin: " auto 0",
              }}
            >
              <Typography
                style={{
                  flex: 1,
                  textAlign: "left",
                }}
              >
                {details.firstName} {details.lastName}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            xs={12}
            style={{
              flexDirection: "column",
            }}
          >
            <Grid
              container
              xs={12}
              style={{
                marginBottom: 3,
              }}
            >
              <Grid contriner xs={6}>
                <Typography className={classes.btnView}>
                  Repor Count:
                </Typography>
              </Grid>
              <Grid contriner xs={6}>
                <Typography className={classes.btnViewInside}>
                  {details.reportCount}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              xs={12}
              style={{
                marginBottom: 3,
              }}
            >
              <Grid contriner xs={6}>
                <Typography className={classes.btnView}>User ID:</Typography>
              </Grid>
              <Grid contriner xs={6}>
                <Typography className={classes.btnViewInside}>
                  {details.id}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              xs={12}
              style={{
                marginBottom: 3,
              }}
            >
              <Grid contriner xs={6}>
                <Typography className={classes.btnView}>User Email</Typography>
              </Grid>
              <Grid contriner xs={6}>
                <Typography className={classes.btnViewInside}>
                  {details.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
}

export default function BlockedUsers() {
  const classes = useStyles();
  var flag = 0;
  const [selected, setSelected] = useState(flag);
  const [blockUsers,setBlockUsers]=useState([]);  
const [listLoading, setListLoading] = useState(true);
const [selectedPostId, setSelectedPostId] = useState(0);

  useEffect(() => {
      getBlockUsers();
  }, [])

  const getBlockUsers = async () => {
    setListLoading(true);
        let data = await getBlockedUsers();
        console.log(data);
      setBlockUsers(data);
      setListLoading(false);
  };
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      className={classes.wrapper}
      style={{ minWidth: 550 }}
    >
      <Controls.Paper className={classes.paper} divClassName={classes.paperDiv}>
        <Grid container alignItems="center">
          <Grid
            item
            xs={12}
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
              Blocked Users
            </Controls.ActionButton>
          </Grid>
          <Grid container xs={12}>
            <Grid item xs={12} style={{ margin: 10, maxHeight: 320 }}>
              <List style={{ maxHeight: "100%", overflow: "auto" }}>
                <PreLoader loading={listLoading} />
                <Grid container>
                  {blockUsers.map((item, index) => (
                    <BlockUserCard details={item}></BlockUserCard>
                  ))}

                  {/* <BlockUserCard></BlockUserCard>
                  <BlockUserCard></BlockUserCard>
                  <BlockUserCard></BlockUserCard>
                  <BlockUserCard></BlockUserCard> */}
                </Grid>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Controls.Paper>
    </Grid>
  );
}
