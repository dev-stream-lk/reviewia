import { FormControl, FormLabel, Grid, makeStyles, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { CallReceived } from '@material-ui/icons';
import React, { useState } from 'react';
import Controls from '../components/Controls';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {useForm , Form} from '../components/useForm';

const useStyles = makeStyles( theme => ({
    addProductWrapper:{
        marginTop: theme.spacing(5)
    },
    stepper:{
        width:"80%"
    },
    steps:{
        padding:40
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
    }
}));

function getSteps() {
    return ['Basic Details', 'Upload Images', 'Preview'];
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
                                
                            </Controls.Paper>
                        </Grid>
                    </Grid>
                </Form>
            </Grid>
            <Controls.Button text="Next" onClick={handleNext}>
            </Controls.Button>
        </Grid>
        </>
    )


}

export default function AddProduct() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const isStepOptional = (step) => {
        return step === 1;
    };
    

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    }


    return (
        <>
            <Header></Header>
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

                                if (isStepOptional(index)) {
                                    labelProps.optional = <Typography variant="caption">Optional</Typography>;
                                }
                                if (isStepSkipped(index)) {
                                stepProps.completed = false;
                                }

                                return (
                                    <Step key={index} {...stepProps}>
                                      <StepLabel {...labelProps}>{label}</StepLabel>
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
                                <Typography>Step -02</Typography>
                                <Controls.Button text="Back" onClick={handleBack}>
                                </Controls.Button>
                                <Controls.Button text="Next" onClick={handleNext}>
                                </Controls.Button>
                            </>
                        ):
                        null
                    }

                    { activeStep === 2 ? 
                        (
                            <>
                                <Typography>Step -03</Typography>
                                <Controls.Button text="Finish" onClick={handleNext}>
                                </Controls.Button>
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
