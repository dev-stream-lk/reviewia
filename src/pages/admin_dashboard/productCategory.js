import {
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  ListItemSecondaryAction,
  makeStyles
} from "@material-ui/core";
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme)=>({
  addSubCategory: {
    width: 500,
  },
}));


export default function ProductCategory(props) {


  const {productList, setCatSelected} = props;
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, id) => {
    //call the function to gain sub classes..using index as id.
    setSelectedIndex(id);
    setCatSelected(id)
  };

  const [searchItem, setSearch] = useState("");

  return (
    <Grid>
      <form noValidate autoComplete="off">
        <Grid item xs={6}>
          <TextField
            id="standard-basic"
            label="Search..."
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </Grid>
      </form>
      <List component="nav" aria-label="secondary mailbox folder">
        {productList
          .filter((val) => {
            if (searchItem === "") {
              return val;
            } else if (
              val.categoryName
                .toLocaleLowerCase()
                .includes(searchItem.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((product, i) => (
            <ListItem
              key={i}
              button
              selected={selectedIndex === product["categoryId"]}
              onClick={(event) => handleListItemClick(event, product["categoryId"])}
            >
              <ListItemText primary={product.categoryName} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Grid>
  );
}
