import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Controls from "../../components/Controls";

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
}));

export default function ReportedBannedPost() {
  const classes = useStyles();
  var flag = 0;
  const [selected, setSelected] = useState(flag);

  return (
    <Grid item xs={12} sm={10} md={12} className={classes.wrapper}>
      <Controls.Paper className={classes.paper} divClassName={classes.paperDiv}>
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
          <Grid item xs={12}>
            <Typography
              variant="h6"
              align="left"
              style={{ marginTop: "20px", marginLeft: 40, fontWeight: 600 }}
              component="div"
            >
              Reported Posts
            </Typography>
          </Grid>
        </Grid>
      </Controls.Paper>
    </Grid>
  );
}
