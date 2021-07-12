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
import React from "react";
import Controls from "../components/Controls";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    margin: theme.spacing(5),
  },
  reviewContainer: {
    margin: theme.spacing(2),
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
  },
  Button_grid: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  avatar: {
    color: "red[500]",
  },
}));

const GroupCard = (props) => {
  const classes = useStyles();

  return (
    <Controls.Card className={classes.productListcard}>
      <Grid container>
        <Grid container item xs={12}>
          <Grid container>
            <CardHeader
              className={classes.productListItemHeader}
              avatar={
                <Avatar aria-label="recipe">
                  S
                </Avatar>
              }
              title="Saman Kumara"
              subheader="Creator"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
          </Grid>
          <CardContent>
            <Grid item xs={12}>
              <Typography variant="caption" display="block" gutterBottom>
                Create Date:2012/08/09
              </Typography>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Controls.Card>
  );
};

export default function GroupListContainer() {
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
      {[1, 2, 3, 4, 5].map((i, index) => (
        <Grid key={index} item xs={12} md={12}>
          <GroupCard />
        </Grid>
      ))}
    </Grid>
  );
}
