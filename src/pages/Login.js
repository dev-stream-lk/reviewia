import { Checkbox, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Controls from '../components/Controls';
import {useForm, Form} from '../components/useForm';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PersonIcon from '@material-ui/icons/Person';
import {validateUserName, validatePassword, validateEmail, validateName} from '../components/Validators'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import {login,register} from '../services/auth';
import MainImage from '../static/img/login_img.svg';

const useStyles = makeStyles( theme => ({

    wrapper:{
        padding: theme.spacing(0),
        [ theme.breakpoints.up("md")]:{
            padding: theme.spacing(5)
        }
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
    },
    loginImage:{
        display:"none",
        [theme.breakpoints.up("md")]:{
            display:"inherit"
        }
    }
}))

const SignIN = (props) => {

    const classes = useStyles();
    const {userData, setUserData} = props;
    const  [disableSubmit, setDisabledSubmit] = useState(true);
    const history = useHistory();
    const [visibility, setVisibility] = useState(false);


    const initialValues = {
        email:"",
        password:"",
        rememberMe:false
    }

    const validate = (fieldValues= values) => {
        let temp = {}
        
        if('email' in fieldValues)
            temp.email = validateEmail(fieldValues.email);
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

    const  handleOnSubmit = async (e) => {
        e.preventDefault();

        const result = await login({
            email: values.email,
            password:values.password
        }, setUserData, history)

        if(result){
            setUserData( { ...userData,isLoggedIn:true })
            history.push("/")
        }
        console.log(result)

    }


    return (
        <Form onSubmit={handleOnSubmit} >
            <Grid container>
                <Controls.Input
                    name="email"
                    placeholder="Email Address"
                    startAdornment={<EmailIcon/>}
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
                    endAdornment={ visibility ?
                         <VisibilityIcon style={{cursor:"pointer"}} onClick={()=>setVisibility(false)} />
                         :
                         <VisibilityOffIcon style={{cursor:"pointer"}} onClick={()=>setVisibility(true)} />

                    }
                    fullWidth={true}
                    size="medium"
                    type= { visibility ? "text":"password"}
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
                    <Link to={{pathname:"/passwordRecovery"}} underline="none" style={{textDecoration:"none"}} >
                        Forgot Password?
                    </Link>
                </Grid>
                <Grid container justifyContent="center" style={{marginTop:20}}>
                    <Controls.Button
                        type="submit"
                        text="Sign In"
                        className={disableSubmit ? classes.disabledSubmit: classes.activeSubmit}
                        {...disableSubmit ? {disabled:true}: {}}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}

const SignUp =(props) => {

    const classes = useStyles();
    const  [disableSubmit, setDisabledSubmit] = useState(true);
    const {userData, setUserData} = props;
    const [visibility, setVisibility] = useState(false);

    const initialValues = {
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        cpassword:"",
        rememberMe:false
    }

    const validate = (fieldValues= values) => {
        let temp = {}
        
        if('firstName' in fieldValues)
            temp.firstName = validateName(fieldValues.firstName);
        if('lastName' in fieldValues)
            temp.lastName = validateName(fieldValues.lastName);
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

    var history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        if( validate()){
            let res = register({
                firstName: values.firstName,
                lastName: values.lastName,
                email:values.email,
                password: values.password
            })
            if(res){
                history.push({
                    pathname: "/login",
                    state:{
                        register:0
                    }
                })
            }
        }else{
            console.log("invalid")
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <Grid container>
                <Controls.Input
                    name="firstName"
                    placeholder="First Name"
                    startAdornment={<PersonIcon/>}
                    fullWidth={true}
                    size="medium"
                    value={values.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                />
                <Controls.Input
                    name="lastName"
                    placeholder="Last Name"
                    startAdornment={<PersonIcon/>}
                    fullWidth={true}
                    size="medium"
                    value={values.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                />
                <Controls.Input
                    name="email"
                    placeholder="Email"
                    startAdornment={<EmailIcon/>}
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
                    endAdornment={ visibility?
                         <VisibilityIcon onClick={()=> setVisibility(false)} style={{cursor:"pointer"}} />
                         :
                         <VisibilityOffIcon onClick={()=> setVisibility(true)} style={{cursor:"pointer"}} />
                    }
                    fullWidth={true}
                    size="medium"
                    type= {visibility? "text":"password"}
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                />
                <Controls.Input
                    name="cpassword"
                    placeholder="Confirm Password"
                    startAdornment={<LockIcon/>}
                    endAdornment={ visibility?
                        <VisibilityIcon onClick={()=> setVisibility(false)} style={{cursor:"pointer"}} />
                        :
                        <VisibilityOffIcon onClick={()=> setVisibility(true)} style={{cursor:"pointer"}} />
                   }
                   fullWidth={true}
                   size="medium"
                   type= {visibility? "text":"password"}
                    value={values.cpassword}
                    onChange={handleInputChange}
                    error={errors.cpassword}
                />
            </Grid>
            <Grid container alignItems="center">
                <Grid item xs={12}>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                        <Checkbox
                            name="rememberMe"
                            color="primary"
                            value={values.rememberMe}
                            onChange={handleInputChange}
                        />
                        <Typography variant="subtitle1">
                            I read and agree to terms & conditions
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
                <Grid container justifyContent="center" style={{marginTop:20}}>
                    <Controls.Button
                        type="submit"
                        text="Sign Up"
                        className={disableSubmit ? classes.disabledSubmit: classes.activeSubmit}
                        {...disableSubmit ? {disabled:true}: {}}
                    />
                </Grid>
            </Grid>
        </Form>

    )
}


export default function Login(props) {

    const history = useHistory()
    const location = useLocation();
    const {userData, setUserData} = props;
    var register = 0;
    if( location.state){
        register = location.state.register;
    }
    
    useEffect(() => {
        if(userData){
            if(userData.isLoggedIn == true){
                history.push("/")
            }
        }
    },[userData])

    const [selected, setSelected] = useState(register);
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={1} sm></Grid>
            <Grid item xs={false} className={classes.loginImage}  md={5}>
                <Grid container justifyContent="center">
                    <img style={{marginTop:150}} src={MainImage} />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={10} md={7} className={classes.wrapper}>
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
                            <SignIN userData={userData} setUserData={setUserData} />
                        )
                        :
                        (
                            <SignUp userData={userData} setUserData={setUserData} />
                        )
                    }
                   
                    <Grid container justifyContent="center" style={{ marginTop:"10px"}}>
                        <span>------- Or register with --------</span>
                    </Grid>
                    <Grid container justifyContent="center" style={{ marginTop:"10px"}}>
                        <FacebookIcon/>
                        <TwitterIcon/>
                        <LinkedInIcon/>
                    </Grid>
                </Controls.Paper>
            </Grid>
            <Grid item xs={1} sm></Grid>
        </Grid>
    )
}
