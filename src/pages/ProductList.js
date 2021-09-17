import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  FormGroup,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { Drawer } from "@material-ui/core";
import { Grid, makeStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useState, useEffect, useContext } from "react";
import Controls from "../components/Controls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Form } from "../components/useForm";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useLocation, useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { UserContext } from "../context/UserContext";
import { getPostBySearch } from "../services/posts";
import { getCategoryWithSubCategory } from "../services/category";
import NotFoundImage from '../assets/not-found.svg';
import {PreLoader} from '../components/basic/PreLoader';
import { Pagination } from "@material-ui/lab";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "50vh",
    marginTop: theme.spacing(5),
  },
  filterTypo: {
    width: "100%",
    cursor: "pointer",
    fontWeight: 600,
  },
  filterCollapse: {
    marginLeft: theme.spacing(2),
  },
  filterCollapseInputGroup: {
    paddingLeft: theme.spacing(2),
  },
  productListSection: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  filterForm: {
    padding: 0,
  },
  filterMenuItem: {
    display: "flex",
    flexDirection: "column",
  },
  radioGroup: {
    "& .MuiFormControlLabel-label": {
      fontSize: "12px",
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    // display:"none",
    [theme.breakpoints.up("sm")]: {
      display: "inherit",
    },
  },
  drawerPaper: {
    paddingTop: theme.spacing(5),
    width: drawerWidth,
    marginTop: theme.mixins.toolbar.minHeight,
    paddingBottom: 100,
  },
  drawerPaperMobile: {
    paddingTop: theme.spacing(5),
    width: drawerWidth,
    paddingBottom: 100,
  },
  productListcard: {
    width: "100%",
  },
  productListItemImage: {
    minHeight: 80,
    maxHeight: 150,
    maxWidth:"100%"
  },
  productListItemHeader: {
    width: "100%",
    textAlign: "left",
  },
  productListSearch: {
    width: "90%",
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
  },
  notFoundImage:{
    width:"100%",
    maxWidth:"150px"
  },
}));

const FiltersMenu = (props) => {
  const classes = useStyles();
  const params = useParams();
  const {handlePagination, setFilterData} = props;
  const [handleCollapseByRating, setHandleCollapseByRating] = useState(true);
  const [byRating, setByRating] = useState(0);
  const [handleCollapseByCategory, setHandleCollapseByCategory] =
    useState(true);
  const [handleCollapseByDates, setHandleCollapseByDates] = useState(true);

  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [byState, setByState] = useState("new");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [values, setValues] = useState({
    ratingOperator:">",
    rating:2,
    category: params.categoryId || "all",
    subCategory: params.subCategoryId || "all",
    type: "all",
    brand: "all"
  });

  // get all categories, subCategories and brands only one time
  useEffect(async () => {
    let data = await getCategoryWithSubCategory();
    let products = [];
    let services = [];
    var type = "";
    if (data) {
      for (let i in data.products) {
        if (params.categoryId) {
          if (data.products[i].categoryName === params.categoryId) {
            type = data.products[i]["type"] === "p" ? "p" : "s";
          }
        }
        products.push({
          id: data.products[i].categoryName,
          title: data.products[i].categoryName,
          subCategories: data.products[i].subCategoryList,
        });
      }
      for (let i in data.services) {
        products.push({
          id: data.services[i].categoryName,
          title: data.services[i].categoryName,
          subCategories: data.services[i].subCategoryList,
        });
      }

      var initialCatValues = {
        type: type,
        category: params.categoryId ? params.categoryId : "all",
        subCategory: params.subCategoryId ? params.subCategoryId : "all",
        brand: "",
      };
      console.log({products})
      setValues({...values,...initialCatValues});
      setCategories({ products, services });
    }
  }, []);

  // call when product type changed
  useEffect(() => {
    setValues({
      ...values,
      category: "all",
      subCategory: "all",
      brand: "all"
    });
    setSubCategories([]);
  }, [values.type]);

  // call when category changed
  useEffect(() => {
    setValues({
      ...values,
      subCategory: "all",
      brand: "all"
    });
    setBrands([]);
    if (values.category !== "" && categories.length !== 0) {
      let type = values.type == "p" ? "products" : "services";
      categories[`${type}`].forEach((item, index) => {
        if (values.category == item.id) {
          values["categoryName"] = item.title;
          let subCategories = [];
          for (let i in item.subCategories) {
            subCategories.push({
              id: item.subCategories[i].subCategoryName,
              title: item.subCategories[i].subCategoryName,
              brands: item.subCategories[i].brandList,
            });
          }
          setSubCategories(subCategories);
        }
      });
    }
  }, [values.category, categories]);

  // call when subCategory changed
  useEffect(() => {
    if (values.subCategory != "" && subCategories.length !== 0) {
      subCategories.forEach((item, index) => {
        if (values.subCategory == item.id) {
          values["subCategoryName"] = item.title;
          let brands = [];
          for (let i in item.brands) {
            brands.push({
              id: item.brands[i].id,
              title: item.brands[i].name,
            });
          }
          setBrands(brands);
        }
      });
    }
  }, [values.subCategory, subCategories]);

  useEffect(() => {
    brands.map((item, i) => {
      if (item.id == values.brand) {
        values["brandName"] = item.title;
      }
    });
  }, [values.brand, brands]);

  useEffect (() => {
    if(values){
      // let others =  {
      // rating:byRating,
      // ratingOperator: ratingOperator
      // }

      let d;
      setFilterData((data) => {
        d ={
          ...data,
          ...values
        };
        console.log(d)
        return d
        }
      );
      handlePagination(1, d);
    }
  },[values])

  // const [categoryOptions, setCategoryOptions] = useState([
  //     {id:"all", title:"All"},
  //     {id: "1", title:"Electronics"},
  //     {id: "2", title:"Vehicles"},
  //     {id: "3", title:"Others"}
  // ]);
  // const [subCategoryOptions, setSubCategoryOptions] = useState([
  //     {id:"all", title:"All"},
  //     {id: "1", title:"Mobile Phones"},
  //     {id: "2", title:"Tvs"},
  //     {id: "3", title:"Laptops"}
  // ]);
  // const [brandOptions, setBrandOptions] = useState([
  //     {id:"all", title:"All"},
  //     {id: "1", title:"Samsung"},
  //     {id: "2", title:"Huawei"},
  //     {id: "3", title:"LG"}
  // ]);

  return (
    <List>
      <ListItem className={classes.filterMenuItem}>
        <Grid container>
          <Controls.RadioGroup
            name="byState"
            label="Sort By"
            items={[
              { id: "new", title: "New" },
              { id: "popular", title: "Popular" },
              { id: "name", title: "Name" },
            ]}
            value={byState}
            className={classes.filterCollapseInputGroup}
            onChange={(e, value) => setByState(value)}
            className={classes.radioGroup}
          ></Controls.RadioGroup>
        </Grid>
      </ListItem>
      <ListItem className={classes.filterMenuItem}>
        <Grid container>
          <Typography
            variant="subtitle1"
            component="div"
            className={classes.filterTypo}
            onClick={() => setHandleCollapseByRating(!handleCollapseByRating)}
          >
            By Rating
          </Typography>
        </Grid>
        <Grid container>
          <Collapse in={handleCollapseByRating} timeout="auto">
            <Grid container>
              <Controls.RadioGroup
                name="ratingOperator"
                label="Sort By"
                items={[
                  { id: ">", title: "greater" },
                  { id: "<", title: "less" }
                ]}
                value={values.ratingOperator}
                className={classes.filterCollapseInputGroup}
                onChange={(e, value) => setValues({...values, ratingOperator:value})}
                className={classes.radioGroup}
              ></Controls.RadioGroup>
            </Grid>
            <div style={{paddingLeft:10, display:"flex", alignItems:"center"}}>
              <Rating
                value={values.rating}
                name="byRating"
                precision={0.25}
                onChange={(e, value) => setValues({...values, rating:value})}
              />
              <span>
              ( {values.rating} )
              </span>
            </div>
          </Collapse>

        </Grid>
      </ListItem>

      <ListItem className={classes.filterMenuItem}>
        <Grid container>
          <Typography
            variant="subtitle1"
            component="div"
            className={classes.filterTypo}
            onClick={() => setHandleCollapseByDates(!handleCollapseByDates)}
          >
            By Dates
          </Typography>
        </Grid>
        <Grid container>
          <Collapse in={handleCollapseByDates} timeout="auto">
            <div style={{ paddingLeft: 20, marginTop: 10 }}>
              <Controls.DatePicker
                name="startDate"
                label="Start Date"
                format="MM/yyyy"
                style={{ marginBottom: 10 }}
                onChange={(e) => setFilterStartDate(e.target.value)}
                views={["year", "month"]}
              ></Controls.DatePicker>
              <Controls.DatePicker
                name="endDate"
                label="End Date"
                onChange={(e) => setFilterEndDate(e.target.value)}
                format="MM/yyyy"
                views={["year", "month"]}
              ></Controls.DatePicker>
            </div>
          </Collapse>
        </Grid>
      </ListItem>

      {/* Start ByCategory */}
      <ListItem className={classes.filterMenuItem}>
        <Grid container>
          <Typography
            variant="subtitle1"
            component="div"
            className={classes.filterTypo}
            onClick={() =>
              setHandleCollapseByCategory(!handleCollapseByCategory)
            }
          >
            By Category
          </Typography>
        </Grid>
        <Grid container>
          <Collapse
            in={handleCollapseByCategory}
            className={classes.filterCollapse}
            timeout="auto"
          >
            <Typography variant="subtitle1" style={{ color: "gray" }}>
              Select type
            </Typography>
            <FormGroup className={classes.filterCollapseInputGroup}>
              <Controls.Select
                name="type"
                // label="Select a Category"
                options={[
                  { id: "all", title: "All" },
                  { id: "p", title: "Product" },
                  { id: "s", title: "Service" },
                ]}
                value={values.type}
                onChange={(e) => setValues({ ...values, type: e.target.value })}
              ></Controls.Select>
            </FormGroup>
            <Typography variant="subtitle1" style={{ color: "gray" }}>
              Select Category
            </Typography>
            <FormGroup className={classes.filterCollapseInputGroup}>
              <Controls.Select
                name="category"
                // label="Select a Category"
                value={values.category}
                onChange={(e) =>
                  setValues({ ...values, category: e.target.value })
                }
                options={
                  categories.length != 0
                    ? values.type == "p"
                      ? categories.products.length != 0
                        ? [{ id: "all", title: "All" },...categories.products]
                        : [{ id: "all", title: "Not Found" }]
                      : categories.services.length != 0
                      ? categories.services
                      : [{ id: "all", title: "Not Found" }]
                    : [{ id: "all", title: "Not Found" }]
                }
                // options ={[]}
              ></Controls.Select>
            </FormGroup>
            <Typography variant="subtitle1" style={{ color: "gray" }}>
              Select Sub Category
            </Typography>
            <FormGroup className={classes.filterCollapseInputGroup}>
              <Controls.Select
                name="subCategory"
                options={
                  subCategories.length !== 0 ?
                  [{ id: "all", title: "All" },...subCategories] :
                  [{ id: "all", title: "Not Found" }]
                }
                value={values.subCategory}
                onChange={(e) =>
                  setValues({ ...values, subCategory: e.target.value })
                }
              ></Controls.Select>
            </FormGroup>

            <Typography variant="subtitle1" style={{ color: "gray" }}>
              Brand / Company
            </Typography>
            <FormGroup className={classes.filterCollapseInputGroup}>
              <Controls.Select
                name="brand"
                options={
                  brands.length !== 0 ?
                  [{ id: "all", title: "All" }, ...brands] :
                  [{ id: "all", title: "Not Found" }]
                }
                value={values.brand}
                onChange={(e) =>
                  setValues({ ...values, brand: e.target.value })
                }
              ></Controls.Select>
            </FormGroup>
          </Collapse>
        </Grid>
      </ListItem>
      {/* End Bycategory */}
    </List>
  );
};

const ProductCard = (props) => {
  const classes = useStyles();
  // const [rating, setRating] = useState(props.rating | (4.5));
  const [rating, setRating] = useState(4.5);
  const { post } = props;

  return (
    <Controls.Card className={classes.productListcard}>
      <Grid container>
        <Grid item xs={4}>
          <CardMedia title={post.title}>
            <img
              src={`${post.imgURL.length === 0 ? "" : post.imgURL[0].url}`}
              className={classes.productListItemImage}
            />
          </CardMedia>
        </Grid>
        <Grid container item xs={8}>
          <Grid container>
            <CardHeader
              className={classes.productListItemHeader}
              // avatar={<Avatar aria-label="recipe">R</Avatar>}
              // action={
              //   <IconButton aria-label="settings">
              //     <MoreVertIcon />
              //   </IconButton>
              // }
              titleTypographyProps={{ style: {fontSize:22, whiteSpace: "normal" } }}
              subheaderTypographyProps={{style:{fontSize:13}}}
              title={post.title}
              subheader={new Date(post.createdAt).toDateString()}
            />
          </Grid>
          <Grid container alignItems="center">
            <Rating
              className={classes.filterCollapseInputGroup}
              value={post.rate}
              name="byRating"
              precision={0.25}
              readOnly
            />
            ({post.rate})
          </Grid>
          <CardContent>
            <Grid item xs={12}></Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Controls.Card>
  );
};

export default function ProductList(props) {
  const location = useLocation();
  const classes = useStyles();
  const params = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const [filterData, setFilterData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  useEffect(() => {
    let filters = {};
    if (params.categoryId != undefined) {
      filters["category"] = params.categoryId;
      if (params.subCategoryId != undefined) {
        filters["subCategory"] = params.subCategoryId;
      }
    }
    setFilterData(filters);
  }, [location]);

  const handleDisplaySize = () => {
    let width = window.innerWidth;
    if (width < 960) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleDisplaySize();
    window.addEventListener("resize", handleDisplaySize);
  });

  const handlePagination= async (page=1, filters=filterData) => {
    setPostLoading(true);
    setCurrentPage(page);
    console.log(filters)
    let data = await getPostBySearch(filters, currentPage-1,20);
    if (data) {
      setMaxPages(data.totalPages)
      setPosts(data.posts);
    }
    setPostLoading(false);
  }

  useEffect(async () => {
    if (filterData) {
      await handlePagination();
    }
  }, [filterData]);

  return (
    <>
      <Header
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        openMobileDrawer={openMobileDrawer}
        setOpenMobileDrawer={setOpenMobileDrawer}
        userData={userData}
        setUserData={setUserData}
      ></Header>

      <Grid container className={`${classes.wrapper} content`}>
        {/* Start Drawer */}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          style={{ display: isMobile ? "none" : "inherit" }}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Typography variant="h5" component="div">
            Filter Products
          </Typography>
          <Form className={classes.filterForm}>
            <FiltersMenu handlePagination={handlePagination} setFilterData={setFilterData} />
          </Form>
        </Drawer>
        {/* End Drawer */}

        {/* Start Mobile Drawer */}
        <Drawer
          className={classes.mobileDrawer}
          variant="temporary"
          classes={{
            paper: classes.drawerPaperMobile,
          }}
          open={openMobileDrawer}
          onClose={() => setOpenMobileDrawer(false)}
        >
          <Typography variant="h5" component="div">
            Filter Products
          </Typography>
          <Form className={classes.filterForm}>
            <FiltersMenu handlePagination={handlePagination} setFilterData={setFilterData} />
          </Form>
        </Drawer>

        {/* End Mobile Drawer */}

        {/* Start ProductList */}

        <div className={classes.productListSection}>
          <Grid container justifyContent="center">
            <Controls.Input
              endAdornment={<SearchIcon />}
              className={classes.productListSearch}
              placeholder="Find Product or service"
              value={filterData.title}
              onChange={(e) => setFilterData({...filterData, title: (e.target.value)})}
            ></Controls.Input>
          </Grid>
          <Grid
            container
            style={{ paddingRight: 50, marginTop:40, marginBottom:16 }}
            justifyContent="space-between"
          >
            <div style={{paddingLeft:50}}>
              <Pagination onChange={(e, page)=> handlePagination(page)} page={currentPage} count={maxPages} variant="outlined" shape="rounded"  />
            </div>
            <Link
              to={{ pathname: "/product/add" }}
              style={{ textDecoration: "none" }}
            >
              <Controls.Button>
                <AddIcon /> Add New
              </Controls.Button>
            </Link>
          </Grid>
          <Controls.Paper style={{ minHeight: "50vh",position:"relative" }}>
            <PreLoader loading={postLoading} />
            <Grid container spacing={2}>
              {posts.length != 0 ? (
                posts.map((item, index) => (
                  <Grid key={index} item xs={12} lg={6}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/product/view/${item.postId}`}
                    >
                      <ProductCard post={item} />
                    </Link>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} alignItems="center" justifyContent="center" style={{height:"100%",display:"flex", flexDirection:"column"}}>
                  <Typography variant="subtitle2" style={{marginBottom:20}}>
                    <span>Post Not found.</span>
                  </Typography>
                  <img src={NotFoundImage} className={classes.notFoundImage} />
                </Grid>
              )}
            </Grid>
          </Controls.Paper>
          <Grid container style={{marginTop:20, marginBottom:50}} >
            <div style={{paddingLeft:50}}>
              <Pagination onChange={(e, page)=> handlePagination(page)} page={currentPage} count={maxPages} variant="outlined" shape="rounded"  />
            </div>
          </Grid>
        </div>
        {/* End ProductList */}
      </Grid>
      <Footer></Footer>
    </>
  );
}
