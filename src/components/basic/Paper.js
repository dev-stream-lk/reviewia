import React from "react";
import { makeStyles } from "@material-ui/core";
import { Paper as MuiPaper, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.21)",
    width: "100%",
  },
  div: {
    padding: theme.spacing(2),
  },
  box: {
    margin: 10,
  },
}));

export default function Paper(props) {
  const classes = useStyles();
  const { children, className, boxClassName, divClassName, ...others } = props;

  return (
    <Box className={`${classes.box} ${boxClassName}`}>
      <MuiPaper className={`${classes.root} ${className}`} {...others}>
        <div className={`${classes.div} ${divClassName}`}>{children}</div>
      </MuiPaper>
    </Box>
  );
}
