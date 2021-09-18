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

export default function ServiceCategory() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [searchItem, setSearch] = useState("");

  const handleListItemClick = (event, index) => {
    //call the function to gain sub classes..using index as id.
    setSelectedIndex(index);
  };

  const [services] = useState([
    { title: "Electronics service", id: 1 },
    { title: "Cloths service", id: 2 },
    { title: "Education service", id: 3 },
    { title: "Foods service", id: 4 },
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
        {services
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
          .map((service) => (
            <ListItem
              button
              selected={selectedIndex === service["id"]}
              onClick={(event) => handleListItemClick(event, service["id"])}
            >
              <ListItemText primary={service.title} />
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
