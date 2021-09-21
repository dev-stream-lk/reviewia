import { Grid, makeStyles, Typography, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Controls from "../../components/Controls";
import ProductCategory from "./productCategory";
import SubCategory from "./comp_subCategory";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {
  createNewCategory,
  createNewSubCategory,
  deleteCategoryDB,
  deleteSubCategoryDB,
  editCategoryDB,
  editSubCategoryDB,
} from "../../services/dashboard";
import { getCategoryWithSubCategory } from "../../services/category";

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

const AddNewCategory = (props) => {
  const classes = useStyles();
  const { open, setOpen, type, addNewCategory } = props;
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    let res = addNewCategory(categoryName);

    if (res) {
      setOpen(false);
      setError("");
      setCategoryName("");
    } else {
      setError("New category creation failed.");
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
          disabled={categoryName !== "" ? false : true}
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
          <Controls.Input
            name="name"
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required={true}
          />
        </div>
      </Controls.Popup>
    </>
  );
};

export default function AddCaregory() {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const [openCategory, setOpenCategory] = useState(false);
  const [productList, setProductList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [catSelected, setCatSelected] = useState(0);
  const [catData, setCatData] = useState({});

  // load categories
  useEffect(async () => {
    let res = await getCategoryWithSubCategory();
    if (res) {
      setProductList(res.products);
      setServiceList(res.services);
      if (selected === 0 && res.products.length > 0) {
        setCatSelected(res.products[0].categoryId);
      } else if (res.services.length > 0) {
        setCatSelected(res.services[0].categoryId);
      }
    }
  }, []);

  useEffect( () => {
    if(selected === 0){
      if(productList.length >0){
        setCatSelected(productList[0].categoryId)
      }else{
        setCatSelected(0);
        setCatData({});
      }
    }else{
      if(serviceList.length >0){
        setCatSelected(serviceList[0].categoryId)
      }else{
        setCatSelected(0);
        setCatData({});
      }
    }
  }, [selected])

  useEffect(() => {
    if (catSelected !== 0) {
      if (selected === 0) {
        setCatData(
          productList.filter((product) => {
            if (product.categoryId === catSelected) {
              return true;
            } else {
              return false;
            }
          })[0]
        );
      }else{
        setCatData(
          serviceList.filter((service) => {
            if (service.categoryId === catSelected) {
              return true;
            } else {
              return false;
            }
          })[0]
        );
      }
    }
  }, [catSelected]);

  const addNewCategory = async (categoryName) => {
    let type = selected === 0 ? "p" : "s";
    let res = await createNewCategory(categoryName, type);
    if (res) {
      if (type === "p") {
        setProductList([...productList, res]);
      } else {
        setServiceList([...serviceList, res]);
      }
    }
    return res;
  };

  const addNewSubCategory = async (subCategoryName) => {
    let type = selected === 0 ? "p" : "s";
    let res = await createNewSubCategory(subCategoryName, catSelected);
    if (res) {
      if (type === "p") {
        setProductList(
          productList.map((cat) => {
            if (cat.categoryId === catSelected) {
              if (cat.subCategoryList === null) {
                cat["subCategoryList"] = [res];
              } else {
                cat.subCategoryList = [...cat.subCategoryList, res];
              }
            }
            return cat;
          })
        );
      } else {
        setServiceList(
          serviceList.map((cat) => {
            if (cat.categoryId === catSelected) {
              if (cat.subCategoryList === null) {
                cat["subCategoryList"] = [res];
              } else {
                cat.subCategoryList = [...cat.subCategoryList, res];
              }
            }
            return cat;
          })
        );
      }
    }
    return res;
  };

  const deleteCategory = async (categoryId) => {
    let type = selected === 0 ? "p" : "s";
    let res = await deleteCategoryDB(categoryId);
    if (res) {
      if (type === "p") {
        setProductList(
          productList.filter( (cat) => {
            if(cat.categoryId === categoryId){
              return false;
            }else{
              return true;
            }
          })
        );
      } else {
        setServiceList(
          serviceList.filter( (cat) => {
            if(cat.categoryId === categoryId){
              return false;
            }else{
              return true;
            }
          })
        );
      }
      setCatSelected(0);
      setCatData({});
    }
    return res;
  }

  const editCategory = async (categoryId, newName) => {

    let type = selected === 0 ? "p" : "s";
    let res = editCategoryDB(categoryId,newName);
    if (res) {
      if (type === "p") {
        setProductList(
          productList.map( (cat) => {
            if(cat.categoryId === categoryId){
              cat.categoryName = newName;
            }
            return cat;
          })
        );
      } else {
        setServiceList(
          serviceList.filter( (cat) => {
            if(cat.categoryId === categoryId){
              cat.categoryName = newName;
            }
            return cat;
          })
        );
      }
      setCatSelected(0);
      setCatData({});
    }
    return res;
  }

  const deleteSubCategory = async (categoryId,subCategoryId) => {
    let type = selected === 0 ? "p" : "s";
    let res = await deleteSubCategoryDB(subCategoryId);
    if (res) {
      if (type === "p") {
        setProductList(
          productList.map( (cat) => {
            if(cat.categoryId === categoryId){
              cat.subCategoryList = cat.subCategoryList.filter( (subCat) => {
                if(subCat.subCategoryId === subCategoryId){
                  return false;
                }
                return true;
              })
            }
            return cat;
          })
        );
      } else {
        setServiceList(
          serviceList.map( (cat) => {
            if(cat.categoryId === categoryId){
              cat.subCategoryList = cat.subCategoryList.filter( (subCat) => {
                if(subCat.subCategoryId === subCategoryId){
                  return false;
                }
                return true;
              })
            }
            return cat;
          })
        );
      }
    }
    return res;
  }

  const editSubCategory = async (categoryId, subCatId, newName) => {

    let type = selected === 0 ? "p" : "s";
    let res = editSubCategoryDB(subCatId,newName);
    if (res) {
      if (type === "p") {
        setProductList(
          productList.map( (cat) => {
            if(cat.categoryId === categoryId){
              cat.subCategoryList.map( (subCat) => {
                if(subCat.subCategoryId === subCatId){
                  subCat.subCategoryName = newName;
                }
                return subCat;
              })
            }
            return cat;
          })
        );
      } else {
        setServiceList(
          serviceList.map( (cat) => {
            if(cat.categoryId === categoryId){
              cat.subCategoryList.map( (subCat) => {
                if(subCat.subCategoryId === subCatId){
                  subCat.subCategoryName = newName;
                }
                return subCat;
              })
            }
            return cat;
          })
        );
      }
    }
    return res;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Controls.Paper className={classes.paper}>
          {/* product service add popup */}
          <AddNewCategory
            addNewCategory={addNewCategory}
            open={openCategory}
            setOpen={setOpenCategory}
          />
          {/*  */}

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
                      Products
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
                      onClick={() => setOpenCategory(true)}
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
                      Services
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
                      onClick={() => setOpenCategory(true)}
                    >
                      New
                    </Button>
                  </Grid>
                </Grid>
              )}

              <Grid>
                {selected === 0 ? (
                  <ProductCategory
                    setCatSelected={setCatSelected}
                    productList={productList}
                    deleteCategory={deleteCategory}
                    editCategory={editCategory}
                  />
                ) : (
                  // <ServiceCategory serviceList={serviceList} />
                    <ProductCategory
                      setCatSelected={setCatSelected}
                      productList={serviceList}
                      deleteCategory={deleteCategory}
                      editCategory={editCategory}
                    />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Controls.Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Controls.Paper className={classes.paper}>
          <SubCategory
            catData={catData}
            addNewSubCategory={addNewSubCategory}
            deleteSubCategory={deleteSubCategory}
            editSubCategory={editSubCategory}
          />
        </Controls.Paper>
      </Grid>
    </Grid>
  );
}
