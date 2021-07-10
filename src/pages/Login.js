import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import Controls from '../components/Controls';
import {useForm, Form} from '../components/useForm';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PersonIcon from '@material-ui/icons/Person';
import {validateUserName, validatePassword, validateEmail} from '../components/Validators'

const useStyles = makeStyles( theme => ({

    wrapper:{
        padding: theme.spacing(5)
    },

    paper: {
        marginTop: theme.spacing(10),
    },
    paperDiv:{
        padding: `${theme.spacing(0)}px ${theme.spacing(0)}px ${theme.spacing(4)}px ${theme.spacing(0)}px !important`,
    },
    disabledSubmit: {
        backgroundColor: `${theme.palette.grey[300]} !important`,
        width:250,
        minHeight:50,
    },
    activeSubmit:{
        backgroundColor:"#236CC7 !important",
        width:250,
        minHeight:50,
    }
}))

const SignIN = () => {

    const classes = useStyles();
    const  [disableSubmit, setDisabledSubmit] = useState(true);

    const initialValues = {
        username:"",
        password:"",
        rememberMe:false
    }

    const validate = (fieldValues= values) => {
        let temp = {}
        
        if('username' in fieldValues)
            temp.username = validateUserName(fieldValues.username);
        if('password' in fieldValues)
            temp.password = validatePassword(fieldValues.password);
    
        setErrors({
            ...errors,
            ...temp
        })
        let isValid = Object.values(temp).every(x=> x=="");
        if(isValid){
            setDisabledSubmit(false)
        }else{
            setDisabledSubmit(true)
        }
        return isValid
    }
    const { values, setValues, handleInputChange, errors, setErrors } = useForm(initialValues, true, validate);


    return (
        <Form>
            <Grid container>
                <Controls.Input
                    name="username"
                    placeholder="Username"
                    startAdornment={<EmailIcon/>}
                    fullWidth={true}
                    size="medium"
                    value={values.username}
                    onChange={handleInputChange}
                    error={errors.username}
                />
                <Controls.Input
                    name="password"
                    placeholder="Password"
                    startAdornment={<LockIcon/>}
                    endAdornment={<VisibilityOffIcon/>}
                    fullWidth={true}
                    size="medium"
                    type="password"
                    onChange={handleInputChange}
                    value={values.password}
                    error={errors.password}
                />
            </Grid>
            <Grid container alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Controls.Checkbox 
                        name="rememberMe"
                        label="Remember Me"
                        color="primary"
                        value={values.rememberMe}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p>
                        Forgot Password?
                    </p>
                </Grid>
                <Grid container justify="center" style={{marginTop:20}}>
                    <Controls.Button
                        type="submit"
                        text="Sign In"
                        className={disableSubmit ? classes.disabledSubmit: classes.activeSubmit}
                        {...disableSubmit ? {disabled:"disabled"}: {}}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}

const SignUp =() => {

    const classes = useStyles();
    const  [disableSubmit, setDisabledSubmit] = useState(true);

    const initialValues = {
        username:"",
        email:"",
        password:"",
        cpassword:"",
        rememberMe:false
    }

    const validate = (fieldValues= values) => {
        let temp = {}
        
        if('username' in fieldValues)
            temp.username = validateUserName(fieldValues.username);
        if('email' in fieldValues)
            temp.email = validateEmail(fieldValues.email);
        if('password' in fieldValues)
            temp.password = validatePassword(fieldValues.password);
        if('cpassword' in fieldValues)
            temp.cpassword = validatePassword(fieldValues.cpassword);
        
        
        setErrors({
            ...errors,
            ...temp
        })
        let isValid = Object.values(temp).every(x=> x=="");
        if(isValid){
            setDisabledSubmit(false)
        }else{
            setDisabledSubmit(true)
        }
        return isValid
    }


    const { values, setValues, handleInputChange, errors, setErrors } = useForm(initialValues,true,validate);

    const onSubmit = (e) => {
        e.preventDefault();

        if( validate()){
            console.log("valid")
        }else{
            console.log("invalid")
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Grid container>
                <Controls.Input
                    name="username"
                    placeholder="Username"
                    startAdornment={<PersonIcon/>}
                    fullWidth={true}
                    size="medium"
                    value={values.username}
                    onChange={handleInputChange}
                    error={errors.username}
                />
                <Controls.Input
                    name="email"
                    placeholder="Email"
                    startAdornment={<EmailIcon/>}
                    endAdornment={<VisibilityOffIcon/>}
                    fullWidth={true}
                    size="medium"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                />
                <Controls.Input
                    name="password"
                    placeholder="Password"
                    startAdornment={<LockIcon/>}
                    endAdornment={<VisibilityOffIcon/>}
                    fullWidth={true}
                    size="medium"
                    type="password"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                />
                <Controls.Input
                    name="cpassword"
                    placeholder="Confirm Password"
                    startAdornment={<LockIcon/>}
                    endAdornment={<VisibilityOffIcon/>}
                    fullWidth={true}
                    size="medium"
                    type="password"
                    value={values.cpassword}
                    onChange={handleInputChange}
                    error={errors.cpassword}
                />
            </Grid>
            <Grid container alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Controls.Checkbox 
                        name="rememberMe"
                        label="Remember Me"
                        color="primary"
                        value={values.rememberMe}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p>
                        Forgot Password?
                    </p>
                </Grid>
                <Grid container justify="center" style={{marginTop:20}}>
                    <Controls.Button
                        type="submit"
                        text="Sign Up"
                        className={disableSubmit ? classes.disabledSubmit: classes.activeSubmit}
                        {...disableSubmit ? {disabled:"disabled"}: {}}
                    />
                </Grid>
            </Grid>
        </Form>

    )
}


export default function Login() {

    const [selected, setSelected] = useState(0);
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={5}>
            </Grid>
            <Grid item xs={7} className={classes.wrapper}>
                <Controls.Paper className={classes.paper} divClassName={classes.paperDiv}>
                    <Grid container alignItems="center">
                        <Grid item xs={6} style={selected===0 ? {backgroundColor:"#236CC7"}: {boxShadow:"0px 2px 2px 1px rgba(0,0,0,0.21)",}}>
                            <Controls.ActionButton
                                onClick={()=>setSelected(0)}
                                style={{width:"100%", height:"100%", ...selected===0 ? {color:"white"}:{color:"black"}}} 

                            >
                                Sign In
                            </Controls.ActionButton>
                        </Grid>
                        <Grid item xs={6} style={selected===1 ? {backgroundColor:"#236CC7"}: {boxShadow:"0px 2px 2px 1px rgba(0,0,0,0.21)",}}>
                            <Controls.ActionButton
                                onClick={()=>setSelected(1)}
                                style={{width:"100%", height:"100%", ...selected===1 ? {color:"white"}:{color:"black"}}}
                            >
                                Register
                            </Controls.ActionButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" align="left" style={{marginTop:"20px",marginLeft:40, fontWeight:600}} component="div">
                                We are happy to have you here
                            </Typography>
                        </Grid>
                    </Grid>
                    { selected===0 ?
                        (
                            <SignIN/>
                        )
                        :
                        (
                            <SignUp/>
                        )
                    }
                   
                    <Grid container justify="center" style={{ marginTop:"10px"}}>
                        <span>------- Or register with --------</span>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop:"10px"}}>
                        <FacebookIcon/>
                        <TwitterIcon/>
                        <LinkedInIcon/>
                    </Grid>
                </Controls.Paper>
            </Grid>
        </Grid>
    )
}
