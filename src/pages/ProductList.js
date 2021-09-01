import { Avatar, CardContent, CardHeader, CardMedia, Collapse, FormControlLabel, FormGroup, IconButton, List, ListItem, Menu, MenuList, Typography, useTheme } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Grid, makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { useState, useEffect, useContext } from 'react';
import Controls from '../components/Controls';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useForm ,Form } from '../components/useForm';
import Phone from '../static/img/j7.jpg';
import IphoneX from '../static/img/iphonex.png';
import F21 from '../static/img/f21.jpg';
import P30 from '../static/img/p30.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import {Link, useLocation, useParams} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import {UserContext} from '../context/UserContext';
import {getPostBySearch} from '../services/posts'

const drawerWidth = 280;

const useStyles = makeStyles( theme => ({
    wrapper:{
        minHeight: "50vh",
        marginTop: theme.spacing(5),
    },
    filterTypo:{
        width: "100%",
        cursor:"pointer",
        fontWeight:600
    },
    filterCollapse:{
        marginLeft: theme.spacing(2)
    },
    filterCollapseInputGroup:{
        paddingLeft: theme.spacing(2)
    },
    productListSection:{
        width: "100%",
        [ theme.breakpoints.up("md")]:{
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    filterForm:{
        padding:0
    },
    filterMenuItem:{
        display:"flex",
        flexDirection:"column",
    },
    radioGroup:{
        "& .MuiFormControlLabel-label":{
            fontSize:"12px"
        }
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        // display:"none",
        [ theme.breakpoints.up("sm")]: {
            display:"inherit"
        }
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
        width: "100%"
      },
      productListItemImage:{
        minHeight:80,
        maxHeight:150
      },
      productListItemHeader:{
          width: "100%",
          textAlign: "left"
      },
      productListSearch:{
          width: "90%",
          marginBottom: theme.spacing(1),
          [ theme.breakpoints.up("md")]:{
              width: "70%"
          }
      }
}));


const FiltersMenu = (props) => {

    const classes = useStyles();
    const [handleCollapseByRating, setHandleCollapseByRating] = useState(false);
    const [byRating, setByRating] = useState(0);
    const [categorySortBy, setCategorySortBy] = useState("higher");
    const [handleCollapseByCategory, setHandleCollapseByCategory] = useState(false);
    const [handleCollapseByDates, setHandleCollapseByDates] = useState(false);
    const [filterByCategory, setFilterByCategory] = useState("1");
    const [filterBySubCategory, setFilterBySubCategory] = useState("1");
    const [filterBrand, setFilterBrand] = useState("1");
    const [filterStartDate, setFilterStartDate] = useState("");
    const [filterEndDate, setFilterEndDate] = useState("");
    const [byState, setByState] = useState("new");

    const [categoryOptions, setCategoryOptions] = useState([
        {id:"0", title:"All"},
        {id: "1", title:"Electronics"},
        {id: "2", title:"Vehicles"},
        {id: "3", title:"Others"}
    ]);
    const [subCategoryOptions, setSubCategoryOptions] = useState([
        {id:"0", title:"All"},
        {id: "1", title:"Mobile Phones"},
        {id: "2", title:"Tvs"},
        {id: "3", title:"Laptops"}
    ]);
    const [brandOptions, setBrandOptions] = useState([
        {id:"0", title:"All"},
        {id: "1", title:"Samsung"},
        {id: "2", title:"Huawei"},
        {id: "3", title:"LG"}
    ]);
    
    return (
        <List>
            <ListItem className={classes.filterMenuItem}>
                <Grid container>
                    <Controls.RadioGroup
                        name="byState"
                        label="Sort By"
                        items={[{id:"new",title:"New"},{id:'popular', title:"Popular"}, {id:'name', title:"Name"}]}
                        value={byState}
                        className={classes.filterCollapseInputGroup}
                        onChange={ (e,value) => setByState(value)}
                        className={classes.radioGroup}
                    >
                    </Controls.RadioGroup>
                </Grid>
            </ListItem>
            <ListItem className={classes.filterMenuItem}>
                <Grid container>
                    <Typography variant="subtitle1" component="div" className={classes.filterTypo} onClick={() => setHandleCollapseByRating(!handleCollapseByRating)}>
                        By Rating
                    </Typography>
                </Grid>
                <Grid container>
                    <Collapse in={handleCollapseByRating} timeout="auto">
                        <Rating
                            className={classes.filterCollapseInputGroup}
                            value={byRating}
                            name="byRating"
                            precision={0.25}
                            onChange={ (e,value) => setByRating(value)}
                        >

                        </Rating>
                    </Collapse>
                </Grid>
            </ListItem>

            <ListItem className={classes.filterMenuItem}>
                <Grid container>
                    <Typography variant="subtitle1" component="div" className={classes.filterTypo} onClick={() => setHandleCollapseByDates(!handleCollapseByDates)}>
                        By Dates
                    </Typography>
                </Grid>
                <Grid container>
                    <Collapse in={handleCollapseByDates} timeout="auto">
                        <div style={{paddingLeft:20, marginTop:10}}>
                            <Controls.DatePicker
                                name="startDate"
                                label="Start Date"
                                format="MM/yyyy"
                                style={{marginBottom:10}}
                                onChange={(e) => setFilterStartDate(e.target.value) }
                                views={["year","month"]}
                            >
                            </Controls.DatePicker>
                            <Controls.DatePicker
                                name="endDate"
                                label="End Date"
                                onChange={(e) => setFilterEndDate(e.target.value) }
                                format="MM/yyyy"
                                views={["year","month"]}
                            >
                            </Controls.DatePicker>
                        </div>
                    </Collapse>
                </Grid>
            </ListItem>

            {/* Start ByCategory */}
            <ListItem className={classes.filterMenuItem}>
                <Grid container>
                    <Typography variant="subtitle1" component="div" className={classes.filterTypo} onClick={() => setHandleCollapseByCategory(!handleCollapseByCategory)}>
                        By Category
                    </Typography>
                </Grid>
                <Grid container>
                    <Collapse in={handleCollapseByCategory} className={classes.filterCollapse} timeout="auto">
                    <Controls.RadioGroup
                        name="byCaregorySort"
                        label="Sort By"
                        items={[{id:"lower",title:"Lower"},{id:'higher', title:"Higher"}]}
                        value={categorySortBy}
                        className={classes.filterCollapseInputGroup}
                        onChange={ (e,value) => setCategorySortBy(value)}
                        className={classes.radioGroup}
                    >
                    </Controls.RadioGroup>
                    <Typography variant="subtitle1" style={{color:"gray"}}>
                        Select Category
                    </Typography>
                    <FormGroup className={classes.filterCollapseInputGroup}>
                        <Controls.Select
                            name="category"
                            // label="Select a Category"
                            options = {categoryOptions}
                            value= {filterByCategory}
                            onChange= {(e) => setFilterByCategory(e.target.value)}
                        >
                        </Controls.Select>    
                    </FormGroup>
                    <Typography variant="subtitle1" style={{color:"gray"}}>
                        Select Sub Category
                    </Typography>
                    <FormGroup className={classes.filterCollapseInputGroup}>
                        <Controls.Select
                            name="subCategory"
                            options = {subCategoryOptions}
                            value= {filterBySubCategory}
                            onChange= { (e) => setFilterBySubCategory(e.target.value)}
                        >
                        </Controls.Select>    
                    </FormGroup>

                    <Typography variant="subtitle1" style={{color:"gray"}}>
                        Brand / Company
                    </Typography>
                    <FormGroup className={classes.filterCollapseInputGroup}>
                        <Controls.Select
                            name="brand"
                            options = {brandOptions}
                            value= {filterBrand}
                            onChange= { (e) => setFilterBrand(e.target.value)}
                        >
                        </Controls.Select>    
                    </FormGroup>
                    </Collapse>
                </Grid>
            </ListItem>
            {/* End Bycategory */}
        </List>
    )
}

const ProductCard = (props) => {

    const classes = useStyles();
    // const [rating, setRating] = useState(props.rating | (4.5));
    const [rating, setRating] = useState(4.5);
    const {post} = props;

    return (
        <Controls.Card className={classes.productListcard}>
            <Grid container>
                <Grid item xs={4}>
                    <CardMedia title={post.title}>
                        <img src={`${post.imgURL[0]}`} className={classes.productListItemImage} />
                    </CardMedia>
                </Grid>
                <Grid container item xs={8}>
                    <Grid container>
                        <CardHeader
                            className={classes.productListItemHeader}
                            avatar={
                            <Avatar aria-label="recipe">
                                R
                            </Avatar>
                            }
                            action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            }
                            title={post.title}
                            subheader={post.createdAt}
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
                        <Grid item xs={12}>
                            
                        </Grid>
                    </CardContent>
                </Grid>
            </Grid>
        </Controls.Card>

    )

}


export default function ProductList(props) {

    const location = useLocation()
    const classes = useStyles();
    const params = useParams()
    const [isMobile, setIsMobile] = useState(false);
    const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
    const [productSearch, setProductSearch] = useState("");
    const {userData, setUserData} = useContext(UserContext);
    const [ filterData, setFilterData ] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        let filters = {}
        if (params.categoryId != undefined){
            filters['category'] = params.categoryId
            if (params.subCategoryId != undefined){
                filters['subCategory'] = params.subCategoryId
            }
        }
        setFilterData(filters)
    },[location])



    const handleDisplaySize = () => {
        let width = window.innerWidth
        if(width < 800){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }
    }

    useEffect ( ()=> {
        handleDisplaySize()
        window.addEventListener('resize', handleDisplaySize)
    })

    useEffect( async () => {
        if (filterData){
          let data = await getPostBySearch(filterData)
          console.log(data)
          if(data){
              setPosts(data.posts);
          }
        }
    }, [filterData])

    return (
        <>
        <Header isMobile={isMobile} setIsMobile={setIsMobile} openMobileDrawer={openMobileDrawer} setOpenMobileDrawer={setOpenMobileDrawer} userData={userData} setUserData={setUserData} ></Header>

            <Grid container className={`${classes.wrapper} content`}>
                {/* Start Drawer */}
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    style={{ display: isMobile ? "none":"inherit" }}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Typography variant="h5" component="div">
                        Filter Products
                    </Typography>
                    <Form className={classes.filterForm}>
                        <FiltersMenu/>
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
                    onClose={()=> setOpenMobileDrawer(false)}
                >
                    <Typography variant="h5" component="div">
                        Filter Products
                    </Typography>
                    <Form className={classes.filterForm}>
                        <FiltersMenu/>
                    </Form>
                </Drawer>

                {/* End Mobile Drawer */}

                {/* Start ProductList */}

                <div className={classes.productListSection}>
                    <Grid container justifyContent="center">
                        <Controls.Input
                            endAdornment={<SearchIcon/>}
                            className={classes.productListSearch}
                            placeholder="Find Product or service"
                            value={productSearch}
                            onChange={ (e)=>setProductSearch(e.target.value)}
                        >
                        </Controls.Input>
                    </Grid>
                    <Grid container style={{paddingRight:50}} justifyContent="flex-end">
                        <Link to={{pathname:"/product/add"}} style={{textDecoration:"none"}} >
                            <Controls.Button>
                                <AddIcon/> Add New
                            </Controls.Button>
                        </Link>
                    </Grid>
                    <Controls.Paper>
                        <Grid container spacing={2}>
                            { posts.length != 0 ? posts.map( (item,index) => (
                                <Grid key={index} item xs={12} lg={6}>
                                    <Link style={{textDecoration:"none"}} to={`/product/view/${item.postId}`}><ProductCard post={item} /></Link>
                                </Grid>
                            ) ): null }
                        </Grid>
                    </Controls.Paper>
                </div>
                {/* End ProductList */}
            </Grid>
        <Footer></Footer>
        </>
    )
}
