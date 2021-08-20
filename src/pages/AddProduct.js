import { Box, CardActions, CardContent, CardHeader, CardMedia, FormControl, FormLabel, Grid, makeStyles, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { CallReceived } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import Controls from '../components/Controls';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {useForm , Form} from '../components/useForm';
import Phone from '../static/img/j7.jpg';
import Rating from '@material-ui/lab/Rating';
import AddIcon from '@material-ui/icons/Add';
import { Skeleton } from '@material-ui/lab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CompleteImage from '../static/img/complete.png';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {UserContext} from '../context/UserContext';

const useStyles = makeStyles( theme => ({
    addProductWrapper:{
        marginTop: theme.spacing(5)
    },
    stepper:{
        width:"80%"
    },
    steps:{
        padding:theme.spacing(2),
        [ theme.breakpoints.up("md")]:{
            padding: theme.spacing(5)
        }
    },
    stepForms:{
        width:"100%",
    },
    formLabel:{
        width:150,
        wordWrap: "wrap"
    },
    input:{
        width: `calc(100% - 150px)`,
        padding:5
    },
    similarProductCard:{
        cursor:"pointer"
    },
    step2AddImage:{
        maxWidth:200,
        maxHeight:200,
        width:200,
        height:200,
        backgroundColor: "#aaa",
        display:"flex",
        justifyContent: "center",
        alignItems:'center',
    },
    step2AddImageButton:{
        width:"100%",
        height:"100%"
    },
    uploadImagePreveiwImage:{
        maxHeight:100,
        maxWidth:100
    }
}));

function getSteps() {
    return ['Basic Details', 'Upload Images', 'Preview', "Finished"];
}


const SimillarProductCard = (props) => {

    const classes = useStyles();
    let {value=4.75} = props;

    return (
        <Controls.Card className={classes.similarProductCard} >
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

const Step1 = (props) => {

    const initialValues = {
        title:"",
        type:"product",
        category:"",
        producedYear:"",
        brand:"",
        description:""
    }

    const classes = useStyles();
    const { handleNext} = props;
    const { values,
        setValues,
        handleInputChange,
        errors,
        setErrors} = useForm(initialValues);

    return (
        <>
        <Grid container className={classes.steps}>
            <Grid item xs={12}>
                <Form className={classes.stepForms}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Controls.Paper>
                                <Grid container>
                                    <Grid container alignItems="center" >
                                        <FormLabel className={classes.formLabel}>Title</FormLabel>
                                        <Controls.Input className={classes.input} size="small" name="titile" ></Controls.Input>
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <FormLabel className={classes.formLabel}>Type</FormLabel>
                                        <Controls.Select size="small" inputProps={{size:"small", background:"red"}} className={classes.input} options={[{id:1,title:"Product"}, {id:2,title:"Service"}]} />
                                    </Grid>

                                    <Grid container alignItems="center">
                                        <FormLabel className={classes.formLabel}>Category</FormLabel>
                                        <Controls.Select className={classes.input} options={[{id:1,title:"Product"}, {id:2,title:"Service"}]} />
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <FormLabel className={classes.formLabel}>Product Year</FormLabel>
                                        <Controls.Input className={classes.input} type="date" />
                                    </Grid>
                                    <Grid container alignItems="center">
                                        <FormLabel className={classes.formLabel}>Brand</FormLabel>
                                        <Controls.Input className={classes.input} size="small" />
                                    </Grid>
                                </Grid>
                            </Controls.Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controls.Paper>
                                <Grid container>
                                    <Grid container alignItems="center" >
                                        <FormLabel className={classes.formLabel}>Description</FormLabel>
                                        <Controls.Input className={classes.input} multiline rows={10} size="small" name="titile" ></Controls.Input>
                                    </Grid>
                                    <Grid container justifyContent="flex-end">
                                        <Controls.Button text="Next" onClick={handleNext}>
                                            Next <ArrowForwardIosIcon />
                                        </Controls.Button>
                                    </Grid>
                                </Grid>
                            </Controls.Paper>
                        </Grid>
                    </Grid>
                </Form>
            </Grid>
            <Grid item xs={12}>
                <Controls.Paper>
                    <Grid container spacing={2}>
                        <Grid container justifyContent="center">
                            <Typography variant="h4" component="div">
                                Similar Products/Services
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <SimillarProductCard/>                            
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <SimillarProductCard/>                            
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <SimillarProductCard/>                            
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <SimillarProductCard/>                            
                        </Grid>
                    </Grid>
                </Controls.Paper>
            </Grid>
        </Grid>
        </>
    )


}

const DummyImage = (props) => {

    return (
        <>
        <Controls.Card style={{paddingTop:10}}>
            <CardMedia>
                <Grid container justifyContent="center">
                    <Skeleton width={100} variant="rect" height={100} style={{display:'flex', alignItems:"center", justifyContent:"center"}} >Image</Skeleton>
                </Grid>
            </CardMedia>
            <CardContent>
                <Grid container justifyContent="center">
                    <Skeleton style={{marginTop:10}} width={100}  variant="rect" >
                        Title
                    </Skeleton>
                </Grid>
                <Grid container justifyContent="center">
                    <p>
                        <Skeleton width={100} variant="rect" > Desctiption </Skeleton>
                    </p>
                </Grid>
            </CardContent>
        </Controls.Card>
        </>
    )
}

const ImageCard = (props) => {

    const classes = useStyles();
    const {cardData} = props;

    return (
        <Controls.Card style={{paddingTop:10}}>
            <CardMedia>
                <Grid container justifyContent="center">
                    <img src={cardData.image} className={classes.uploadImagePreveiwImage} />
                </Grid>
            </CardMedia>

            <CardContent>
                <Typography variant="subtitle1">
                    {cardData.title}
                </Typography>
                <Grid container justifyContent="center">
                    <p>
                        {cardData.description}
                    </p>
                </Grid>
            </CardContent>
        </Controls.Card>
    )
}


const Step2 = (props) => {


    const classes = useStyles();
    const { handleNext, handleBack} = props;

    return (
        <>
            <Grid container className={classes.steps}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Controls.Paper>
                                <Typography variant="h6" style={{marginBottom:20}}>You should add at least one photo before publishing your post.</Typography>
                                <Grid container>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container justifyContent="center">
                                            <div className={classes.step2AddImage}>
                                                <Controls.Button  className={classes.step2AddImageButton} variant="text" text="+ Add a Photo" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container>
                                            <Controls.Input placeholder="Alternative text" />
                                        </Grid>
                                        <Grid container>
                                            <Controls.Input multiline rows={5} placeholder="Short Description" />
                                        </Grid>
                                        <Grid container justifyContent="flex-end" >
                                            <Controls.Button  >
                                                <AddIcon/> Add
                                            </Controls.Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Controls.Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controls.Paper>
                                <Typography variant="h6">Preview</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                            <ImageCard cardData={{image:Phone, title:"Front Side", description:"Grey color front side."}}/>
                                    </Grid>

                                    <Grid item xs={4}>
                                            <ImageCard cardData={{image:Phone, title:"Back side", description:"Grey color back side."}}/>
                                    </Grid>

                                    <Grid item xs={4}>
                                            <DummyImage />
                                    </Grid>
                                </Grid>
                                <Grid container style={{marginTop:16}} justifyContent="flex-end">
                                    <Controls.Button style={{marginRight:10}} onClick={handleBack}>
                                        <ArrowBackIosIcon /> Back
                                    </Controls.Button>
                                    <Controls.Button onClick={handleNext}>
                                        Next <ArrowForwardIosIcon />
                                    </Controls.Button>
                                </Grid>
                            </Controls.Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

const Step3 = (props) => {

    const classes = useStyles();
    const {handleNext, handleBack} = props;


    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Paper>
                        <Typography style={{marginTop:20, marginBottom:20}} variant="h4">Preview Your Post</Typography>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container justifyContent="center">
                                    <Grid item xs={12} sm={10} md={8}>
                                        <Controls.Paper>
                                            <Typography variant="h6">Basic Information</Typography>
                                            <Grid container>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Grid container>
                                                            <Grid container alignItems="center" >
                                                                <FormLabel className={classes.formLabel}>Title</FormLabel>
                                                                <Typography>Samsung galaxy J7 Nxt</Typography>
                                                            </Grid>
                                                            <Grid container alignItems="center">
                                                                <FormLabel className={classes.formLabel}>Type</FormLabel>
                                                                <Typography>Product</Typography>
                                                            </Grid>

                                                            <Grid container alignItems="center">
                                                                <FormLabel className={classes.formLabel}>Category</FormLabel>
                                                                <Typography>Samsung galaxy J7 Electronics</Typography>
                                                            </Grid>
                                                            <Grid container alignItems="center">
                                                                <FormLabel className={classes.formLabel}>Product Year</FormLabel>
                                                                <Typography>14/07/2021</Typography>
                                                            </Grid>
                                                            <Grid container alignItems="center">
                                                                <FormLabel className={classes.formLabel}>Brand</FormLabel>
                                                                <Typography>Samsung</Typography>
                                                            </Grid>
                                                            <Grid container alignItems="center" >
                                                                <FormLabel className={classes.formLabel}>Description</FormLabel>
                                                                <Controls.Input className={classes.input} multiline rows={10} size="small" name="titile" 
                                                                    value="
                                                                    NETWORK	Technology	GSM / HSPA / LTE
                                                                    LAUNCH	Announced	2017, July
                                                                    Status	Available. Released 2017, July
                                                                    BODY	Dimensions	152.4 x 78.6 x 7.6 mm (6.00 x 3.09 x 0.30 in)
                                                                    Weight	170 g (6.00 oz)
                                                                    Build	Glass front, plastic back, plastic frame
                                                                    SIM	Dual SIM (Micro-SIM, dual stand-by)
                                                                    DISPLAY	Type	Super AMOLED
                                                                    Size	5.5 inches, 83.4 cm2 (~69.6% screen-to-body ratio)
                                                                    Resolution	720 x 1280 pixels, 16:9 ratio (~267 ppi density)
                                                                    PLATFORM	OS	Android 7.0 (Nougat), upgradable to Android 9.0 (Pie), One UI
                                                                    Chipset	Exynos 7870 Octa (14 nm)
                                                                    CPU	Octa-core 1.6 GHz Cortex-A53
                                                                    GPU	Mali-T830 MP1
                                                                    MEMORY	Card slot	microSDXC (dedicated slot)
                                                                    Internal	16GB 2GB RAM, 32GB 3GB RAM
                                                                         eMMC 5.1
                                                                    MAIN CAMERA	Single	13 MP, f/1.9, 28mm (wide), AF
                                                                    Features	LED flash, panorama
                                                                    Video	1080p@30fps
                                                                    SELFIE CAMERA	Single	5 MP, f/2.2, 23mm (wide)
                                                                    Features	LED flash
                                                                    Video	
                                                                    SOUND	Loudspeaker	Yes
                                                                    3.5mm jack	Yes
                                                                    COMMS	WLAN	Wi-Fi 802.11 b/g/n, Wi-Fi Direct, hotspot
                                                                    Bluetooth	4.1, A2DP, LE
                                                                    GPS	Yes, with A-GPS, GLONASS
                                                                    NFC	No
                                                                    Radio	FM radio, RDS, recording
                                                                    USB	microUSB 2.0
                                                                    FEATURES	Sensors	Accelerometer, proximity
                                                                         ANT+
                                                                    BATTERY	Type	Li-Ion 3000 mAh, removable
                                                                    MISC	Colors	Black, Gold
                                                                    Models	SM-J701F, SM-J701F, SM-J701M, SM-J701MT
                                                                    SAR	0.61 W/kg (head)    
                                                                    SAR EU	0.52 W/kg (head)     1.39 W/kg (body)    
                                                                    "
                                                                >
                                                                </Controls.Input>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Controls.Paper>
                                    </Grid>

                                    <Grid item xs={12} sm={10} md={8}>
                                        <Controls.Paper>
                                            <Typography variant="h6">
                                                Post Images
                                            </Typography>
                                                <Controls.Paper>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={4}>
                                                                <ImageCard cardData={{image:Phone, title:"Front Side", description:"Grey color front side."}}/>
                                                        </Grid>

                                                        <Grid item xs={4}>
                                                                <ImageCard cardData={{image:Phone, title:"Back side", description:"Grey color back side."}}/>
                                                        </Grid>

                                                        <Grid item xs={4}>

                                                            <DummyImage/>
                                                        </Grid>
                                                    </Grid>
                                                </Controls.Paper>   
                                        </Controls.Paper>
                                    </Grid>

                                    <Grid item xs={12} md={10}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Controls.Paper>
                                                    <Typography variant="h6" >
                                                        Agreement Section
                                                    </Typography>
                                                    <Grid container>
                                                        <div style={{display:"flex", alignItems:"center", marginTop:10}}>
                                                            <Controls.Checkbox/> 
                                                            <Typography align="left" variant="subtitle2" >You will not be allowed to edit or delete a product or service post once it is submitted.</Typography>
                                                        </div>
                                                    </Grid>
                                                    <Grid container>
                                                        <div style={{display:"flex", alignItems:"center", marginTop:10}}>
                                                            <Controls.Checkbox/>
                                                            <Typography align="left" variant="subtitle2">You will agree to follow the <a href="">Terms & Conditions </a> and refrain from adding any sort of inapprpriate, plagarized or invalid details.</Typography>
                                                        </div>
                                                    </Grid>
                                                    <Grid container justifyContent="flex-end" style={{ marginTop:20}}>
                                                        <Controls.Button style={{marginRight:10}} onClick={handleBack}>
                                                            <ArrowBackIosIcon /> Back
                                                        </Controls.Button>
                                                        <Controls.Button onClick={handleNext}>
                                                            Finish <ArrowForwardIosIcon />
                                                        </Controls.Button>
                                                    </Grid>
                                                </Controls.Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Controls.Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default function AddProduct(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const history = useHistory();
    const {userData, setUserData} = useContext(UserContext);

    // useEffect( ()=>{
    //     if(userData){
    //         if(userData.isLoggedIn == false){
    //             history.push("/login")
    //         }
    //     }
    // },[userData])
    
    const handleNext = () => {
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (

        <>
            <Header userData={userData} setUserData={setUserData} ></Header>
            <Grid container alignItems="flex-start" className={`${classes.addProductWrapper} content`}>
                <Grid container alignItems="flex-start" justifyContent="center">
                    <Typography variant="h4" component="div">
                        Add Your Post to better recommendation
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center">
                        <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
                            { steps.map( (label,index) => {
                                const stepProps = {};
                                const labelProps = {};


                                return (
                                    <Step key={index}>
                                    <StepLabel>{label}</StepLabel>
                                    </Step>
                                );                                
                            })}
                        
                        </Stepper>
                    </Grid>
                    <Grid container>

                    { activeStep === 0 ? 
                        (   <>
                                <Step1 handleNext={handleNext} />
                            </>
                        ):
                        null
                    }

                    { activeStep === 1 ? 
                        (
                            <>
                                <Step2 handleNext={handleNext} handleBack={handleBack} />
                            </>
                        ):
                        null
                    }

                    { activeStep === 2 ? 
                        (
                            <>
                                <Step3 handleNext={handleNext} handleBack={handleBack} />
                            </>
                        ):
                        null
                    }

                    { activeStep === 3 ? 
                        (
                            <>
                                <Grid container justifyContent="center" style={{ marginBottom:30}}>
                                    <Grid item xs={6}>
                                        <img src={CompleteImage} style={{width:100, height:100}} />
                                        <Typography variant="h4">
                                            Post Published Successfully.
                                        </Typography>
                                        <Link to={{pathname:"/product/view/1"}} style={{textDecoration:"none"}}>
                                            <Controls.Button style={{marginTop:20}}>
                                                View Your Post
                                            </Controls.Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </>
                        ):
                        null
                    }

                    </Grid>
                </Grid>

            </Grid>
            <Footer></Footer>
        </>
    )
}
