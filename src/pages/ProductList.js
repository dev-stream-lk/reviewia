import { Avatar, CardContent, CardHeader, CardMedia, Collapse, FormControlLabel, FormGroup, IconButton, List, ListItem, Menu, MenuList, Typography } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Grid, makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { useState, useEffect } from 'react';
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
import {Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        display:"none",
        [ theme.breakpoints.up("md")]: {
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
    const [byCategory, setByCategory] = useState(0);
    const [electronics, setElectronics] = useState(false);
    const [vehicles, setVehicles] = useState(false);
    const [others, setOthers] = useState(false);

    return (
        <List>
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
                    >
                    </Controls.RadioGroup>
                    <Typography variant="subtitle1" style={{color:"gray"}}>
                        Select Category
                    </Typography>
                    <FormGroup className={classes.filterCollapseInputGroup}>
                        <FormControlLabel
                            control={<Controls.Checkbox value={electronics} onChange={ () => setElectronics(!electronics)}  name="electronics" />}
                            label="Electronics"
                        />
                        <FormControlLabel
                            control={<Controls.Checkbox value={vehicles} onChange={ () => setVehicles(!vehicles)}  name="vehicles" />}
                            label="Vehicles"
                        />
                        <FormControlLabel
                            control={<Controls.Checkbox value={others} onChange={ () => setOthers(!others)} name="others" />}
                            label="Others"
                        />
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
    const {title="", image=Phone} = props;

    return (
        <Controls.Card className={classes.productListcard}>
            <Grid container>
                <Grid item xs={4}>
                    <CardMedia title="Samsung j7 nxt">
                        <img src={image} className={classes.productListItemImage} />
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
                            title={title}
                            subheader="September 14, 2016"
                        />
                    </Grid>
                        <Grid container alignItems="center">
                            <Rating
                                className={classes.filterCollapseInputGroup}
                                value={rating}
                                name="byRating"
                                precision={0.25}
                                onChange={ (e,value) => setRating(value)}
                                readOnly
                            />
                            ({rating})
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

    const classes = useStyles();
    const {isMobile, handleIsMobile, userData, setUserData} = props;
    const [productSearch, setProductSearch] = useState("");

    useEffect(() => {
    }, [handleIsMobile])

    return (
        <>
        <Header isMobile={isMobile} handleIsMobile={handleIsMobile} userData={userData} setUserData={setUserData} ></Header>

            <Grid container className={`${classes.wrapper} content`}>
                {/* Start Drawer */}
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
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
                    open={isMobile}
                    onClose={()=> handleIsMobile(false)}
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
                            { [{title:"Samsung galaxy J7 Nxt",image:Phone}, {title:"Apple iphone X pro", image:IphoneX}, {title:"Oppo F21",image:F21}, {title:"Huawei P30 Pro", image:P30}, {title:"Samsung galaxy J7 Nxt",image:Phone}].map( (item,index) => (
                                <Grid key={index} item xs={12} md={6}>
                                    <Link style={{textDecoration:"none"}} to={`/product/view/${index+1}`}><ProductCard {...item} /></Link>
                                </Grid>
                            ) ) }
                        </Grid>
                    </Controls.Paper>
                </div>
                {/* End ProductList */}
            </Grid>
        <Footer ></Footer>
        </>
    )
}
