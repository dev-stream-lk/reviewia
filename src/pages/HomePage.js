import { Grid, ListItemText, makeStyles, Typography, List, Link, ListItem } from '@material-ui/core';
import React from 'react';
import Controls from '../components/Controls';
import Header from '../components/Header';
import HeadImage from '../static/img/homepage_head.svg';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles( theme => ({
    headSection:{
        padding: theme.spacing(4),
        marginBottom: theme.spacing(5)
    },
    headHeader:{
        fontWeight:"400 !important",
        fontSize:50
    },
    headSubHeader:{
        textAlign:"center",
        [ theme.breakpoints.up("md")]:{
            marginTop: theme.spacing(2),
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(3)}px`,
        },
    },
    headImage:{
        
        [ theme.breakpoints.down("sm")]:{
            position:"absolute",
            marginTop:150,
            zIndex:-100,
            opacity:0.3,
            justifyContent:"center",
            "& img":{
                width:"100%",
                height:"100%"
            },
        }
    },
    headSearchInput:{
        [theme.breakpoints.down('sm')]: {
            width:"90%"
        },
        [theme.breakpoints.up('sm')]: {
            width:"70%"
        }
    },
    list:{
        textAlign:"left"
    }
}))


export default function HomePage() {

    const classes = useStyles();

    return (
        <div>
            <Header></Header>
            {/* Start Head section */}
            <div>
                <Grid container className={classes.headSection}>
                    <Grid container justify="center" alignItems="center" >
                        <Grid item xs={12} md={6} lg={7}>
                            <Typography variant="h2" component="div" className={classes.headHeader}>
                                We are here to Help you
                            </Typography>
                            <Typography variant="h6" component="div" className={classes.headSubHeader}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut nunc sit amet tortor tincidunt sagittis. Aliquam commodo tristique dolor ut laoreet. Sed consectetur blandit tempor.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={5} className={classes.headImage}>
                            <img src={HeadImage} />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Controls.Input
                            endAdornment={<SearchIcon/>}
                            fullWidth={true}
                            size="large"
                            className={classes.headSearchInput}
                            placeholder="What are you looking for..."
                        >
                        </Controls.Input>
                    </Grid>
                </Grid>
                
            </div>
            {/* End Head section */}

            {/* Start Trending section */}
            <Grid container>
                {/* Start Popular categories */}
                <Grid item xs={12} md={4}>
                    <Controls.Paper>
                        <Typography variant="h6" component="div">
                            Popular Categories
                        </Typography>

                        <List className={classes.list}>
                            <ListItem>
                                <Link href="/df" to="/dfdf" component="button" underline="none">
                                    <ListItemText primary="Electronics"></ListItemText>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/df" to="/dfdf" component="button" underline="none">
                                    <ListItemText primary="Vehicles"></ListItemText>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/df" to="/dfdf" component="button" underline="none">
                                    <ListItemText primary="category-01"></ListItemText>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="/df" to="/dfdf" component="button" underline="none">
                                    <ListItemText primary="category-01"></ListItemText>
                                </Link>
                            </ListItem>
                        </List>

                    </Controls.Paper>
                </Grid>
                {/* End Popular categories */}

                {/* Start Most view  */}
                <Grid item xs={12} md={8}>
                    <Controls.Paper>
                        <Typography variant="h6" component="div">
                            Popular Categories
                        </Typography>
                    </Controls.Paper>
                </Grid>
                {/* End Most view  */}
            </Grid>

            {/* End Trending section */}
        </div>
    )
}
