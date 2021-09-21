import {
  Grid,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Divider,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
  addCategory: {
    width: 500,
  },
}));

const AddNewSubCategory = (props) => {
  const classes = useStyles();
  const { open, setOpen, type,addNewSubCategory } = props;
  const [subCategoryName, setSubCategoryName] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    let res = await addNewSubCategory(subCategoryName);

    if(res){
      setOpen(false);
      setError("");
      setSubCategoryName("");
    }else{
      setError("New subcategory creation failed.")
    }
  };

  const Actions = () => {
    return (
      <Grid container justifyContent="flex-end">
        <Controls.Button
          color="secondary"
          style={{ marginRight: 10 }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Controls.Button>
        <Controls.Button
          disabled={subCategoryName !== "" ? false : true}
          onClick={() => onSubmit()}
        >
          Create
        </Controls.Button>
      </Grid>
    );
  };

  return (
    <>
      <Controls.Popup
        title="Create New Subcategory"
        openPopup={open}
        setOpenPopup={setOpen}
        actions={<Actions />}
      >
        {
          error !== "" && (
            <Grid container style={{marginTop:8, padding:8, marginBottom:24, color:"red", background:"#ffaaaa"}} justifyContent="center" >
              <Typography variant="subtitle2">
                {error}
              </Typography>
            </Grid>
          )
        }
        <div className={classes.addCategory}>
          <Controls.Input
            name="name"
            label="Sub Category Name"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            required={true}
          />
        </div>
      </Controls.Popup>
    </>
  );
};

const DeleteSubCategory = (props) => {
  const classes = useStyles();
  const { open, setOpen, deleteSubCategory } = props;
  const [error, setError] = useState("");

  const onSubmit = async () => {
    let res = await deleteSubCategory();

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

const EditSubCategory = (props) => {
  const classes = useStyles();
  const { open, setOpen, editSubCategory, editSubCategoryId, oldName } = props;
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  useEffect(()=> {
    if(oldName){
      setNewName(oldName)
    }
  },[oldName]);

  const onSubmit = async () => {
    let res = await editSubCategory(newName);
    if (res) {
      setOpen(false);
      setError("");
    } else {
      setError("Operation failed.");
    }
  };

  const handleClose = () => {
    setError("");
    setNewName("");
    setOpen(false);
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
        title="Edit Sub Category Name"
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


export default function SubCategory(props) {
  const classes = useStyles();
  const {catData, addNewSubCategory, deleteSubCategory, editSubCategory } = props;
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteSubCatId, setDeleteSubCatId] = useState(0);
  const [editSubCatId, setEditSubCatId] = useState(0);
  const [editSubCatName, setEditSubCatName] = useState("");

  const deleteSubCat = () => {
    return deleteSubCategory(catData.categoryId, deleteSubCatId);
  }

  const editSubCat = (newName) => {
    return editSubCategory(catData.categoryId, editSubCatId, newName);
  }

  const handleDelete = (subCategoryId) => {
    setDeleteSubCatId(subCategoryId);
    setOpenDelete(true);
  }

  const handleEdit = (subCategoryId, name) => {
    setEditSubCatId(subCategoryId);
    setEditSubCatName(name);
    setOpenEdit(true);
  }

  return (
    <>
      <DeleteSubCategory deleteSubCategory={deleteSubCat} open={openDelete} setOpen={setOpenDelete} />
      <EditSubCategory oldName={editSubCatName} editSubCategory={editSubCat} open={openEdit} setOpen={setOpenEdit} />
      <Grid container justifyContent="space-between" alignItems="center" style={{marginTop: "8px",}}>
        <Typography variant="h6" style={{fontWeight:600}}>
          Sub Categories
        </Typography>
        <AddNewSubCategory open={openAddSubCategory} addNewSubCategory={addNewSubCategory} setOpen={setOpenAddSubCategory} />
        <Controls.Button
          variant="contained"
          color="primary"
          size="small"
          style={{
            marginLeft: 40,
          }}
          className={classes.button}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpenAddSubCategory(true)}
        >
          New
        </Controls.Button>
      </Grid>
      <List>
        {catData.subCategoryList && catData.subCategoryList.map((subCategory) => (
          <div>
            <ListItem>
              <ListItemText primary={`${subCategory.subCategoryName} (${subCategory.postCount} posts)`} />
              <ListItemSecondaryAction>
                <IconButton onClick={()=>handleEdit(subCategory.subCategoryId, subCategory.subCategoryName)} edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={()=>handleDelete(subCategory.subCategoryId)} edge="end" aria-label="delete">
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
