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


export default function ProductCategory(){


      const [selectedIndex, setSelectedIndex] = React.useState(1);

      const handleListItemClick = (event, index) => {
        console.log(index);
        //call the function to gain sub classes..using index as id.

        setSelectedIndex(index);
      };



    const [products, setProduct] = useState([
    { title: "Electronics", id: 1 },
    { title: "Cloths", id: 2 },
    { title: "Education", id: 3 },
    { title: "Foods", id: 4 },
  ]);

    return (
      <List component="nav" aria-label="secondary mailbox folder">
        {products.map((product) => (
          <ListItem
            button
            selected={selectedIndex === product["id"]}
            onClick={(event) => handleListItemClick(event, product["id"])}
          >
            <ListItemText primary={product.title} />
          </ListItem>
        ))}
      </List>
    );
}