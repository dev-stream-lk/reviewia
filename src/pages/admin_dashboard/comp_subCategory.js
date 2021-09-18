import {
  Grid,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  ListItemSecondaryAction,
  Divider,
  DialogContentText,
} from "@material-ui/core";
import React, { useState } from "react";
import Controls from "../../components/Controls";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
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

export default function SubCategory() {
  const classes = useStyles();

  const [subCategories, setcategory] = useState([
    { mainId: 1, title: "TV", id: 1 },
    { mainId: 1, title: "Laptop", id: 2 },
    { mainId: 1, title: "Mobile Phone", id: 3 },
    { mainId: 1, title: "Washing machine", id: 4 },
  ]);

  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);

  const handleClickOpen = () => {
    setOpenAddSubCategory(true);
  };

  const handleClose = () => {
    setOpenAddSubCategory(false);
  };

  return (
    <>
      <Controls.Popup
        title="Add new Sub Category"
        openPopup={openAddSubCategory}
        setOpenPopup={setOpenAddSubCategory}
        actions={
          <>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              add
            </Button>
          </>
        }
      >
        <DialogContentText>
          Add Your Sub Category for Electronics.
        </DialogContentText>
        <Controls.Input disabled={true} value={"Category : Electronic"} />
        <Controls.Input
          autoFocus
          margin="dense"
          id="name"
          label="Sub Category"
          type="text"
          fullWidth
        />
      </Controls.Popup>

      <Grid container justifyContent="flex-end">
        <Controls.Button
          variant="contained"
          color="primary"
          size="small"
          style={{
            marginTop: "20px",
            marginLeft: 40,
          }}
          className={classes.button}
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleClickOpen}
        >
          New
        </Controls.Button>
      </Grid>
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
    </>
  );
}
