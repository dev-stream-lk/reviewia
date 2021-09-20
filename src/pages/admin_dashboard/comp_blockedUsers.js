import { Grid, List, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Controls from "../../components/Controls";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";


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
    maxWidth:65
  },
}));

export default function BlockedUsers() {
  const classes = useStyles();
  var flag = 0;
  const [selected, setSelected] = useState(flag);

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
            {/* <Typography
              variant="h6"
              align="left"
              style={{ marginTop: "20px", marginLeft: 40, fontWeight: 600 }}
              component="div"
            >
              H
            </Typography> */}
            <Grid item xs={12} style={{ margin: 10, maxHeight: 320 }}>
              <List style={{ maxHeight: "100%", overflow: "auto" }}>
                <Paper variant="outlined" square>
                  <Grid container xs={11} style={{ margin: 12 }}>
                    <Grid item xs={1} style={{ justifyItems: "center" }}>
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        DN
                      </Avatar>
                    </Grid>
                    <Grid
                      itemD
                      xs={3}
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
                        Damish Nisal
                      </Typography>
                    </Grid>
                    <Grid
                      itemD
                      xs={3}
                      style={{
                        margin: " auto 0",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Typography
                        style={{
                          flex: 3,
                          textAlign: "left",
                        }}
                      >
                        Report Counts : 5
                      </Typography>
                    </Grid>
                    <Grid
                      itemD
                      xs={5}
                      style={{
                        margin: " auto 0",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Typography
                        style={{
                          flex: 3,
                          textAlign: "center",
                        }}
                      >
                        Email : d@gmail.com
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container xs={8} style={{ justifyContent: "space-around",backgroundColor:'' }}>
                    <Typography>Hello</Typography>
                    <Typography>Hello</Typography>
                  </Grid>
                </Paper>
                <Paper variant="outlined" square>
                  <Grid container xs={11} style={{ margin: 12 }}>
                    <Grid item xs={1} style={{ justifyItems: "center" }}>
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        DN
                      </Avatar>
                    </Grid>
                    <Grid
                      itemD
                      xs={3}
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
                        Damish Nisal
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper variant="outlined" square>
                  <Grid container xs={11} style={{ margin: 12 }}>
                    <Grid item xs={1} style={{ justifyItems: "center" }}>
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        DN
                      </Avatar>
                    </Grid>
                    <Grid
                      itemD
                      xs={3}
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
                        Damish Nisal
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <Paper variant="outlined" square>
                  <Grid container xs={11} style={{ margin: 12 }}>
                    <Grid item xs={1} style={{ justifyItems: "center" }}>
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        DN
                      </Avatar>
                    </Grid>
                    <Grid
                      itemD
                      xs={3}
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
                        Damish Nisal
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Controls.Paper>
    </Grid>
  );
}
