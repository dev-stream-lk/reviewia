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
  ListItemSecondaryAction,
  Divider
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Controls from "../components/Controls";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


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


export default function SubCategory() {
  const classes = useStyles();

   const [subCategories, setcategory] = useState([
     { mainId: 1, title: "TV", id: 1 },
     { mainId: 1, title: "Laptop", id: 2 },
     { mainId: 1, title: "Mobile Phone", id: 3 },
     { mainId: 1, title: "Washing machine", id: 4 },
   ]);

  return (
    <List>
      {subCategories.map((category) => (
        <div>
          <ListItem>
            <ListItemText primary={category.title} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider light />
        </div>
      ))}
    </List>
  );
}