import { Box, CardActions, CardContent, CardHeader, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useContext } from 'react';
import Controls from '../components/Controls';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Phone from '../static/img/j7.jpg';
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import {UserContext} from '../context/UserContext';

const useStyles = makeStyles( theme => ({

    paper:{
        overflowX:"scroll",
        [ theme.breakpoints.up("md")]:{
            overflowX:"hidden"
        }
    },

    container:{
        width: 900,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        borderBottom: "1px solid lightgray",
        [ theme.breakpoints.up("md") ]:{
            width:"100%",
        },
        // marginBottom: 50

    },

    productCard:{
        margin: theme.spacing(1)        
    },
    topics:{
        width:250
    },
    cardSection:{
        width: `calc(100% - 250px)`
    }
}));


const SimillarProductCard = (props) => {

    const classes = useStyles();
    let {value=4.75} = props;

    return (
        <Controls.Card style={{marginTop:16}}>
            <CardHeader
                title="Samsung J7 nxt"
                subheader="34 Aug, 2021"
            >
            </CardHeader>
            <CardMedia title="Samsung Galaxy j7 Nxt">
                <img src={Phone} />
            </CardMedia>
            <CardContent>
                <Rating
                    name="phone"
                    value={value}
                    precision={0.25}
                    getLabelText={(val) => `${val} Heart${val !== 1 ? 's' : ''}`}
                    readOnly
                />
                <Box>{value}</Box>
            </CardContent>
            <CardActions>

            </CardActions>
        </Controls.Card>
    )
}


export default function Compare(props) {

    const classes = useStyles();
    const {userData, setUserData} = useContext(UserContext);

    return (

        <>
            <Header userData={userData} setUserData={setUserData} />

            <Grid container className={"content"}>
                <Grid item xs={12} style={{marginTop:20}}>
                    <Controls.Paper className={classes.paper} >
                        <Typography variant="h4" style={{margin:10}}>
                            Compare Products/Services
                        </Typography>
                        <Grid container className={classes.container}>
                            <div className={classes.topics}>
                            </div>
                            <div className={classes.cardSection} >
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Controls.Input endAdornment={<SearchIcon/>} placeholder="Search similar product">
                                        </Controls.Input>
                                        <SimillarProductCard/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Controls.Input endAdornment={<SearchIcon/>} placeholder="Search similar product">
                                        </Controls.Input>
                                        <div style={{display:"flex", justifyContent:"center"}}>
                                            <Skeleton width={"80%"} height={300} style={{marginTop:50}} variant="rect" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Controls.Input endAdornment={<SearchIcon/>} placeholder="Search similar product">
                                        </Controls.Input>
                                        <div style={{display:"flex", justifyContent:"center"}}>
                                            <Skeleton width={"80%"} height={300} style={{marginTop:50}} variant="rect" />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid container className={classes.container}>
                            <div className={classes.topics}>
                                Brand
                            </div>
                            <div className={classes.cardSection} >
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        Samsung
                                    </Grid>
                                    <Grid item xs={4}>
                                        
                                    </Grid>
                                    <Grid item xs={4}>
                                        
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid container className={classes.container}>
                            <div className={classes.topics}>
                                Year
                            </div>
                            <div className={classes.cardSection} >
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        2017
                                    </Grid>
                                    <Grid item xs={4}>
                                        
                                    </Grid>
                                    <Grid item xs={4}>
                                        
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid container className={classes.container}>
                            <div className={classes.topics}>
                                Number of reviews
                            </div>
                            <div className={classes.cardSection} >
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        27455
                                    </Grid>
                                    <Grid item xs={4}>
                                        
                                    </Grid>
                                    <Grid item xs={4}>
                                        
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                    </Controls.Paper>
                </Grid>
            </Grid>

            <Footer/>
        </>
    )
}
