import {
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export default function ProductCategory() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    console.log(index);
    //call the function to gain sub classes..using index as id.

    setSelectedIndex(index);
  };

  const [searchItem, setSearch] = useState("");

  const [products] = useState([
    { title: "Electronics", id: 1 },
    { title: "Cloths", id: 2 },
    { title: "Education", id: 3 },
    { title: "Foods", id: 4 },
  ]);

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
        {products
          .filter((val) => {
            if (searchItem === "") {
              return val;
            } else if (
              val.title
                .toLocaleLowerCase()
                .includes(searchItem.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((product) => (
            <ListItem
              button
              selected={selectedIndex === product["id"]}
              onClick={(event) => handleListItemClick(event, product["id"])}
            >
              <ListItemText primary={product.title} />
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
