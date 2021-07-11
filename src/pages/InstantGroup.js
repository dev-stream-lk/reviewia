import { Box, CardActions, CardContent, CardHeader, CardMedia, FormLabel, Grid, makeStyles, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';
import Controls from '../components/Controls';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Phone from '../static/img/j7.jpg';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles( theme => ({
    titleLabel:{
        width:150,
        wordWrap: "wrap",
        textAlign:"left"
    },
    titleValueLabel:{
        width: "calc(100% - 150px)",
        textAlign:"left"
    },
    productInfoSection:{
        overflowX:"scroll",
        [theme.breakpoints.up("md")]:{
            overflowX:"hidden"
        }
    },
    productDetails:{
        marginTop: theme.spacing(10),
        [theme.breakpoints.up("md")]:{
            marginTop:0
        }
    },
    productImage:{
        maxWidth:100,
        maxHeight:100,
        [theme.breakpoints.up("md")]:{
            maxWidth:200,
            maxHeight:200
        }
    },
    chatOuterPaper:{
        height: "70vh",
        overflowY:"scroll",
        marginBottom: theme.spacing(0)
    },
    paperBoxStyles:{
        marginBottom:0
    },
    userImage:{
        width: 40,
        height:40,
        margin: `${theme.spacing(0)}px ${theme.spacing(2)}px` ,
        borderRadius:"50%"
    },
    messageContainer:{

    },
    messagePaper:{
        width:"90%"
    }

}));

const ProductCard = (props) => {

    const classes = useStyles();
    let {value=4.75} = props;

    return (
        <Controls.Card className={classes.productInfoSection}>
            <Grid container alignItems="center">
                <Grid item xs={4} lg={12}>
                    <CardHeader
                        title="Samsung J7 nxt"
                        subheader="34 Aug, 2021"
                    >
                    </CardHeader>
                    <CardMedia title="Samsung Galaxy j7 Nxt">
                        <img src={Phone} className={classes.productImage} />
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
                </Grid>

                <Grid item xs={8} lg={12} className={classes.productDetails} style={{paddingBottom:20}}>
                    <Grid container style={{paddingLeft:10}}>
                        <Grid container alignItems="center">
                            <FormLabel className={classes.titleLabel}>Title</FormLabel>
                            <FormLabel className={classes.titleValueLabel}>Samsung Galaxy j7 Nxt</FormLabel>
                        </Grid>
                        <Grid container alignItems="center">
                            <FormLabel className={classes.titleLabel}>Type</FormLabel>
                            <FormLabel className={classes.titleValueLabel}>Product</FormLabel>
                        </Grid>

                        <Grid container alignItems="center">
                            <FormLabel className={classes.titleLabel}>Category</FormLabel>
                            <FormLabel className={classes.titleValueLabel}>Elecronics</FormLabel>
                        </Grid>
                        <Grid container alignItems="center">
                            <FormLabel className={classes.titleLabel}>Product Year</FormLabel>
                            <FormLabel className={classes.titleValueLabel}>2017</FormLabel>
                        </Grid>
                        <Grid container alignItems="center">
                            <FormLabel className={classes.titleLabel}>Brand</FormLabel>
                            <FormLabel className={classes.titleValueLabel}>Samsung</FormLabel>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>

        </Controls.Card>
    )
}

const Message = (props)=> {

    const classes = useStyles();
    const {message="",owner=false, user="User-01"} = props;

    return (
        <React.Fragment>
            {owner ? 
                (   
                    <Grid item xs={12} >
                        <Grid container justifyContent="flex-end">
                            <Controls.Paper style={{backgroundColor:"#ffefF6"}} boxClassName={classes.messagePaper} >
                                <Grid container alignItems="center">
                                <img src={Phone} className={classes.userImage} />
                                    <Typography variant="subtitle1" style={{fontSize:16, fontWeight:"bold"}} >{user}</Typography>
                                </Grid>
                                <Grid container style={{marginTop:10,paddingLeft:50}}>
                                    <Typography variant="content" align="left">
                                        {message}
                                    </Typography>
                                </Grid>
                            </Controls.Paper>
                        </Grid>
                    </Grid>
                )
                :
                (
                    <Grid item xs={12} >
                        <Grid container justifyContent="flex-start">
                            <Controls.Paper style={{backgroundColor:"#ddefF6"}} boxClassName={classes.messagePaper}>
                                <Grid container alignItems="center">
                                    <img src={Phone} className={classes.userImage} />
                                    <Typography variant="subtitle1" style={{fontSize:16, fontWeight:"bold"}} >{user}</Typography>
                                </Grid>
                                <Grid container style={{marginTop:10,paddingLeft:50}}>
                                    <Typography variant="content" align="left">
                                        {message}
                                    </Typography>
                                </Grid>
                            </Controls.Paper>
                        </Grid>
                    </Grid>
                )
            }
        </React.Fragment>
    )
}


export default function InstantGroup() {

    const classes = useStyles();

    return (
        <>
        <Header/>
        
        <Grid container className={"content"} >
            <Grid item xs={12} style={{marginTop:50}}>
                <Typography variant="h4">
                    Instant Group(Remaining: 2 days)
                </Typography>
            </Grid>
            <Grid container style={{marginTop:30}}>
                <Grid item xs={12} md={6} lg={4} style={{padding:20}}>
                    <ProductCard />
                </Grid>
                <Grid item xs={12} md={6} lg={8} >
                    <Controls.Paper boxClassName={classes.paperBoxStyles} className={classes.chatOuterPaper}>
                        <Grid container className={classes.messageContainer}>
                            <Message owner={true} user="me" message="Do you know a place where to buy this product?" />
                            <Message  message="We are selling all kind of mobile phones,tablets and other smart devices... We are experts in mobile phone repairing field." />
                            <Message/>
                            <Message/>
                        </Grid>
                    </Controls.Paper>
                    <Grid container>
                        <Controls.Input style={{margin:20, marginTop:0}} multiline rows={2} endAdornment={<SendIcon color="primary" />} placeholder="Type a message">
                        </Controls.Input>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

        <Footer/>
            
        </>
    )
}
