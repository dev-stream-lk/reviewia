import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  makeStyles,
  useMediaQuery,
  MenuItem,
  Menu,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link as MuiLink,
  Tooltip,
  Badge,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Controls from "../components/Controls";
import { useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Link, useHistory} from 'react-router-dom';
import { logout } from "../services/auth";
import AddIcon from '@material-ui/icons/Add';
import {UserContext} from '../context/UserContext';
import {getCategoryWithSubCategory} from '../services/category'
import FavoriteIcon from '@material-ui/icons/Favorite';
import {CatContext} from '../context/CategorySubCategotyContext';
import NotFoundImage from '../assets/not-found.svg';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { getNotificationCount } from "../services/notifications";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  getHeaderPadding: {
    padding: theme.mixins.toolbar.minHeight / 2,
  },

  getPadding: {
    flexGrow: 1,
  },
  navbar: {
    paddingRight: theme.spacing(10),
  },
  headerFavIcon:{
    color:"white",
    marginRight:10,
  },
  categoryMenu: {
    morgin: 0,
    padding: 0,
    width: "100% !important",
    "& .MuiPopover-paper": {
      top: `${theme.mixins.toolbar.minHeight + 8}px !important`,
      width: "100% !important",
      maxHeight: "85vh",
    },
    "& .MuiPaper-rounded": {
      borderRadius: 0,
    },
  },
  closeIcon: {
    paddingTop: theme.spacing(5),
  },
  accordination: {
    padding: "10px !important",
    "& .MuiAccordion-root:before": {
      backgroundColor: "white",
    },
  },
  accordinationSummary: {
    "& .MuiAccordionSummary-content, &.MuiAccordionSummary-root, & .MuiButtonBase-root":
      {
        marginTop: "0px !important",
        marginBottom: "0px !important",
        paddingTop: "0px !important",
        paddingBottom: "0px !important",
        minHeight: "30px",
        border: 0,
      },
  },
  accordinationDetails: {
    "&.MuiAccordionDetails-root": {
      paddingTop: "0px !important",
    },
    "& .MuiListItem-dense": {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  isMobileIcon: {
    padding: 20,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  notFoundImage:{
    width:"100%",
    height:"100%",
    maxWidth:"150px"
  }
}));

const GenerateList = (props) => {
  const classes = useStyles();

  const { list, ...others } = props;

  return (
    <div className={classes.accordination}  {...others}>
        { list.length !==0 ? list.map((category, i) => (
            <Accordion key={i}>
                <AccordionSummary
                 className={classes.accordinationSummary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>{category.categoryName}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordinationDetails}>
                    <List dense={true}>
                        {category.subCategoryList.map((item, j) => (
                            <ListItem key={j} to={`/products/${category.categoryName}/${item.subCategoryName}`} component={Link} >
                              <ListItemText primary={item.subCategoryName} secondary={`${item.postCount} Posts`} />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        )):
        (
          <Grid container alignItems="center" style={{marginTop:20, flexDirection:"column"}}>
            {/* <Typography>
              Categories not found.
            </Typography> */}
            <img src={NotFoundImage} className={classes.notFoundImage} />
          </Grid>
        )}
    </div>
  );
};

const HeadeNotificationIcon = (props) => {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const {userData} = props;

  useEffect( () => {
    let interval = setInterval( async () => {
       let res = await getNotificationCount(userData.email);
       console.log(res)
       if(res){
         setCount(res)
       }
    }, 5000 )

    return () => {
      clearInterval(interval);
    }
  },[]);

  return (
    <Tooltip title="Notifications" aria-label="add" arrow>
        <Badge
          id="headeFavIcon"
          className={classes.headerFavIcon}
          color="secondary"
          badgeContent={count}
        >
          <NotificationsIcon />
        </Badge>
      </Tooltip>
  )
}

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { isMobile, setIsMobile, openMobileDrawer, setOpenMobileDrawer } = props;
  const {userData, setUserData} = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [ categories, setCategories]= useState({})
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const openCategoty = Boolean(categoryAnchorEl);
  
  const res = useContext(CatContext)
  
  useEffect(()=>{
    if(res){
      setCategories(res)
    }
  },[res])

  // useEffect( async () => {
  //   if(userData){
  //     let res = await getCategoryWithSubCategory()
  //     if(res){
  //       setCategories(res)
  //     }
  //   }
  // },[userData])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategory = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  const handleCategoryClose = (e) => {
    if (
      !isDescendant(
        document.querySelector("#categoryMenu .MuiPaper-root"),
        e.target
      )
    )
      setCategoryAnchorEl(null);
  };
  const history = useHistory();
  const handleLogout = () =>{
    logout(setUserData, history)
  }

  return (
    <>
      <div className={classes.getHeaderPadding}></div>
      <AppBar className={classes.appBar} id="header">
        <Toolbar>
          { isMobile? (
            <div className={classes.isMobileIcon}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpenMobileDrawer(true)}
                size="small"
              >
                <MenuIcon />
              </IconButton>
            </div>
          ) : null}
          {/* <div style={{ width: 50, height: 50, backgroundColor: "grey" }}></div> */}
          {/* <Link to={{pathname:"/"}}> */}
            <Typography to={{pathname:"/"}} component={Link}  variant="caption" style={{fontSize:20, fontWeight:'bold', textDecoration:"none", color:"white"}}>Reviewia</Typography>
          {/* </Link> */}
          <div className={classes.getPadding}></div>

          <div className={classes.navbar}>
            <Controls.ActionButton textColor="white" component={Link} to="/">
               Home
            </Controls.ActionButton>
            <Controls.ActionButton textColor="white" onClick={handleCategory}>
              Reviews{" "}
              <ArrowForwardIosIcon
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  transition: "0.5s",
                  ...(openCategoty ? { transform: "rotateZ(90deg)" } : {}),
                }}
              />
            </Controls.ActionButton>
            { userData.true ? 
              (
                <Controls.ActionButton textColor="white" component={Link} to={{pathname:"/product/add"}}>
                  <AddIcon/> New Post
                </Controls.ActionButton>
              ):null
            }
            
            <Menu
              id="categoryMenu"
              className={classes.categoryMenu}
              anchorEl={categoryAnchorEl}
              open={openCategoty}
              onClick={handleCategoryClose}
            >
              <Grid container>
                <Grid item xs={6} style={{ borderRight: "2px solid gray" }}>
                  <Typography align="center" variant="h6" component="div">
                    Product
                  </Typography>
                  <GenerateList
                    list={ categories.products }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography align="center" variant="h6" component="div">
                    Services
                  </Typography>
                  <GenerateList list={ categories.services} />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" className={classes.closeIcon}>
                  <IconButton onClick={ () => setCategoryAnchorEl(null)}>
                      <HighlightOffIcon fontSize="large" color="secondary" />
                  </IconButton>
              </Grid>
            </Menu>
          </div>
          {userData.isLoggedIn ? 
            (
              <>              
                <HeadeNotificationIcon userData={userData} />
                <Link to={{pathname: "/favourite-list", state:{ register:0 }}} style={{textDecoration:"none"}} underline="none" >
                  <Tooltip title="Favourite List" aria-label="add" arrow>
                    <IconButton
                      id="headeFavIcon"
                      className={classes.headerFavIcon}
                      component="span"
                    >
                      <FavoriteIcon  id="headerHeartIcon" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <IconButton color="inherit" onClick={ handleMenu } >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="categoryMenu"
                  className={classes.Menu}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  style={{position:"absolute", top:40}}
                >
                  {userData.role == "admin" ? 
                    (
                      <MenuItem component={Link} to="/dashboard" >Dashboard</MenuItem>    
                    ):null
                  }
                  <MenuItem component={Link} to="/profile" >Profile</MenuItem>
                  <MenuItem>Instant Groups</MenuItem>
                  <MenuItem onClick={handleLogout} >Logout</MenuItem>
                </Menu>
              </>
            )
            :
            (
              <div>
                <Link to={{pathname: "/favourite-list", state:{ register:0 }}} style={{textDecoration:"none"}} underline="none" >
                  <Tooltip title="Favourite List" aria-label="add" arrow>
                    <IconButton
                      id="headeFavIcon"
                      className={classes.headerFavIcon}
                      component="span"
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link to={{pathname: "/login", state:{ register:0 }}} style={{textDecoration:"none"}} underline="none" >
                  <Controls.Button style={{marginRight:10}}>
                    Login
                  </Controls.Button>
                </Link>
                <Link to={{pathname: "/login", state:{ register:1 }}} style={{textDecoration:"none"}} underline="none" >
                    <Controls.Button >
                      SignUp
                    </Controls.Button>
                  </Link>
              </div>
            )
          }          
          
        </Toolbar>
      </AppBar>
    </>
  );
}
