import {
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  ListItemSecondaryAction,
  makeStyles,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Controls from "../../components/Controls";

const useStyles = makeStyles((theme)=>({
  addSubCategory: {
    width: 500,
  },
}));

const DeleteCategory = (props) => {
  const classes = useStyles();
  const { open, setOpen, deleteCategory, deleteCategoryId } = props;
  const [error, setError] = useState("");

  const onSubmit = async () => {
    let res = await deleteCategory(deleteCategoryId);

    if (res) {
      setOpen(false);
      setError("");
    } else {
      setError("New category creation failed.");
    }
  };

  const Actions = () => {
    return (
      <Grid container justifyContent="flex-end">
        <Controls.Button
          style={{ marginRight: 10 }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Controls.Button>
        <Controls.Button
          color="secondary"
          onClick={() => onSubmit()}
        >
          Delete
        </Controls.Button>
      </Grid>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Create New Category"
        openPopup={open}
        setOpenPopup={setOpen}
        actions={<Actions />}
      >
        {error !== "" && (
          <Grid
            container
            style={{
              marginTop: 8,
              padding: 8,
              marginBottom: 24,
              color: "red",
              background: "#ffaaaa",
            }}
            justifyContent="center"
          >
            <Typography variant="subtitle2">{error}</Typography>
          </Grid>
        )}
        <div className={classes.addCategory}>
          <Typography variant="subtitle2" >
              Are you sure?
          </Typography>
        </div>
      </Controls.Popup>
    </>
  );
};

const EditCategory = (props) => {
  const classes = useStyles();
  const { open, setOpen, editCategory, editCategoryId, oldName } = props;
  console.log(oldName)
  const [newName, setNewName] = useState(oldName);
  const [error, setError] = useState("");

  useEffect( () => {
    if(oldName){
      setNewName(oldName);
    }
  },[oldName])

  const onSubmit = async () => {
    let res = await editCategory(editCategoryId, newName);
    if (res) {
      setOpen(false);
      setError("");
    } else {
      setError("Operation failed.");
    }
  };

  const handleClose = () =>{
    setOpen(false);
    setNewName("");
    setError("");
  }

  const Actions = () => {
    return (
      <Grid container justifyContent="flex-end">
        <Controls.Button
        color="secondary"
          style={{ marginRight: 10 }}
          onClick={handleClose}
        >
          Cancel
        </Controls.Button>
        <Controls.Button
          disabled={newName !== "" ? false : true}
          onClick={() => onSubmit()}
        >
          Save
        </Controls.Button>
      </Grid>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Edit Category Name"
        openPopup={open}
        setOpenPopup={setOpen}
        actions={<Actions />}
      >
        {error !== "" && (
          <Grid
            container
            style={{
              marginTop: 8,
              padding: 8,
              marginBottom: 24,
              color: "red",
              background: "#ffaaaa",
            }}
            justifyContent="center"
          >
            <Typography variant="subtitle2">{error}</Typography>
          </Grid>
        )}
        <div className={classes.addCategory}>
          <Controls.Input
            name="description"
            label="New Category Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required={true}
          />
        </div>
      </Controls.Popup>
    </>
  );
};

export default function ProductCategory(props) {

  const {productList, setCatSelected, deleteCategory, editCategory} = props;
  const [selectedIndex, setSelectedIndex] = useState( productList.length >0 ? productList[0].categoryId : 0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(0);
  const [editCategoryId, setEditCategoryId] = useState(0);
  const [editCategoryName, setEditCategoryName] = useState("");

  const handleListItemClick = (event, id) => {
    //call the function to gain sub classes..using index as id.
    setSelectedIndex(id);
    setCatSelected(id)
  };

  const [searchItem, setSearch] = useState("");
  const handleDelete = (categoryId) => {
    setDeleteCategoryId(categoryId);
    setOpenDelete(true);
  }

  const handleEdit = (categoryId, name) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(name);
    setOpenEdit(true);
  }

  return (
    <Grid>
      <DeleteCategory deleteCategory={deleteCategory} deleteCategoryId={deleteCategoryId} open={openDelete} setOpen={setOpenDelete} />
      <EditCategory oldName={editCategoryName} editCategory={editCategory} editCategoryId={editCategoryId} open={openEdit} setOpen={setOpenEdit} />
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
              <ListItemText primary={`${product.categoryName} (${product.postCount} posts)`} />
              <ListItemSecondaryAction>
                <IconButton onClick={()=>handleEdit(product.categoryId, product.categoryName)} edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={()=>handleDelete(product.categoryId)}  edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Grid>
  );
}
