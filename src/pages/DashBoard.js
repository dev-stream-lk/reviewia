import {
  Drawer,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Controls from "../components/Controls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ReportedBannedPost from "../components/comp_reportedPostList";
import ReportedHiddenReview from "../components/comp_reportHiddenReview";
import BlockedUsers from "../components/comp_blockedUsers";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "50vh",
    marginTop: theme.spacing(5),
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    display: "none",
    "& .MuiPaper-root": {
      backgroundColor: theme.palette.primary.main,
    },

    [theme.breakpoints.up("md")]: {
      display: "inherit",
    },
  },
  drawerPaper: {
    paddingTop: theme.spacing(5),
    width: drawerWidth,
    marginTop: theme.mixins.toolbar.minHeight,
    paddingBottom: 100,
  },
  dashboardContent: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  dashboardContentPaper: {
    minHeight: "100vh",
    marginBottom: theme.spacing(5),
  },
}));

export default function DashBoard(props) {
  const classes = useStyles();
  const { userData, setUserData } = props;
  const [selected, setSelected] = useState(1);

  return (
    <>
      <Header userData={userData} setUserData={setUserData} />
      <Grid container className={"content"}>
        <Grid item className={classes.wrapper}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <List>
              <ListItem style={{ cursor: "pointer", padding: 0 }}>
                <Controls.Button
                  style={{
                    width: "100%",
                    padding: 12,
                    color: selected === 1 ? "grey" : "white",
                  }}
                  onClick={() => setSelected(1)}
                  variant="text"
                >
                  Add Category
                </Controls.Button>
              </ListItem>
              <ListItem style={{ cursor: "pointer", padding: 0 }}>
                <Controls.Button
                  style={{
                    width: "100%",
                    padding: 12,
                    color: selected === 2 ? "grey" : "white",
                  }}
                  onClick={() => setSelected(2)}
                  variant="text"
                >
                  Reported Posts
                </Controls.Button>
              </ListItem>
              <ListItem style={{ cursor: "pointer", padding: 0 }}>
                <Controls.Button
                  style={{
                    width: "100%",
                    padding: 12,
                    color: selected === 3 ? "grey" : "white",
                  }}
                  onClick={() => setSelected(3)}
                  variant="text"
                >
                  Reported Reviews
                </Controls.Button>
              </ListItem>
              <ListItem style={{ cursor: "pointer", padding: 0 }}>
                <Controls.Button
                  style={{
                    width: "100%",
                    padding: 12,
                    color: selected === 4 ? "grey" : "white",
                  }}
                  onClick={() => setSelected(4)}
                  variant="text"
                >
                  Blocked Users
                </Controls.Button>
              </ListItem>
              <ListItem style={{ cursor: "pointer", padding: 0 }}>
                <Controls.Button
                  style={{
                    width: "100%",
                    padding: 12,
                    color: selected === 5 ? "grey" : "white",
                  }}
                  onClick={() => setSelected(5)}
                  variant="text"
                >
                  System Reports
                </Controls.Button>
              </ListItem>
            </List>
          </Drawer>
        </Grid>
        <Grid item className={classes.dashboardContent}>
          <Grid container>
            <Grid item xs={12}>
              <Controls.Paper className={classes.dashboardContentPaper}>
                {selected === 1 ? <Typography>Add Category</Typography> : null}

                {selected === 2 ? <ReportedBannedPost /> : null}

                {selected === 3 ? (
                  <ReportedHiddenReview/>
                ) : null}

                {selected === 4 ? <BlockedUsers/> : null}

                {selected === 5 ? (
                  <Typography>System Reports</Typography>
                ) : null}
              </Controls.Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
