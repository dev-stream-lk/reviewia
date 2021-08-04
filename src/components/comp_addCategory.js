import {
  Grid,
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Tooltip,
  CardMedia,
  CardHeader,
  Avatar,
  CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Controls from "../components/Controls";
import ProductCategory from "../components/productCategory";
import ServiceCategory from "../components/serviceCategory";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

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

export default function AddCaregory() {
  const classes = useStyles();
  var flag = 0;
  const [selected, setSelected] = useState(flag);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Controls.Paper className={classes.paper}>
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
                Products
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
                Services
              </Controls.ActionButton>
            </Grid>
            <Grid item xs={12}>
              {selected === 0 ? (
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      align="left"
                      style={{
                        marginTop: "20px",
                        marginLeft: 40,
                        fontWeight: 600,
                      }}
                      component="div"
                    >
                      Product
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{
                        marginTop: "20px",
                        marginLeft: 40,
                      }}
                      className={classes.button}
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      New
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      align="left"
                      style={{
                        marginTop: "20px",
                        marginLeft: 40,
                        fontWeight: 600,
                      }}
                      component="div"
                    >
                      Service
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      style={{
                        marginTop: "20px",
                        marginLeft: 40,
                      }}
                      className={classes.button}
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      New
                    </Button>
                  </Grid>
                </Grid>
              )}

              <Grid>
                {selected === 0 ? <ProductCategory /> : <ServiceCategory />}
              </Grid>
            </Grid>
          </Grid>
        </Controls.Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controls.Paper className={classes.paper}>
          Sub Categories
        </Controls.Paper>
      </Grid>
    </Grid>
  );
}
