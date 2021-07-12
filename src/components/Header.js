import React, { useState, useEffect } from "react";
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
  Link,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Controls from "../components/Controls";
import { useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


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
}));

const GenerateList = (props) => {
  const classes = useStyles();

  const { list, ...others } = props;

  return (
    <div className={classes.accordination}  {...others}>
        {list.map((item, i) => (
            <Accordion key={i}>
                <AccordionSummary
                 className={classes.accordinationSummary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordinationDetails}>
                    <List dense={true}>
                        {list.map((item, j) => (
                            <ListItem key={j} to="/products/1" component={Link} >
                              <ListItemText primary="Single-line item" secondary="Secondary text" />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        ))}
    </div>
  );
};

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { isMobile, handleIsMobile } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let isLogin = false;

  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const openCategoty = Boolean(categoryAnchorEl);

  useEffect(() => {}, [handleIsMobile]);

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

  return (
    <>
      <div className={classes.getHeaderPadding}></div>
      <AppBar className={classes.appBar} id="header">
        <Toolbar>
          {handleIsMobile ? (
            <div className={classes.isMobileIcon}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => handleIsMobile(true)}
                size="small"
              >
                <MenuIcon />
              </IconButton>
            </div>
          ) : null}
          <div style={{ width: 50, height: 50, backgroundColor: "grey" }}></div>
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
                    list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography align="center" variant="h6" component="div">
                    Services
                  </Typography>
                  <GenerateList list={[1, 2, 3]} />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" className={classes.closeIcon}>
                  <IconButton onClick={ () => setCategoryAnchorEl(null)}>
                      <HighlightOffIcon fontSize="large" color="secondary" />
                  </IconButton>
              </Grid>
            </Menu>
          </div>
          {isLogin ? 
            (
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            )
            :
            (
              <div>
                <Link to={{pathname: "/login", state:{ register:0 }}}>
                  <Controls.Button style={{marginRight:10}}>
                    Login
                  </Controls.Button>
                </Link>
                <Link to={{pathname: "/login", state:{ register:1 }}}>
                    <Controls.Button>
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
