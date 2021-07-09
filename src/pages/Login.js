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

const useStyles = makeStyles( theme => ({

    wrapper:{
        padding: theme.spacing(5)
    },

    paper: {
        marginTop: theme.spacing(10),
        // borderRadius:"10px",
        // overflow:"hidden",
        // boxShadow:"0px 0px 5px 2px rgba(0,0,0,0.21)",
    },
}))


export default function Login() {


    const [selected, setSelected] = useState(0);
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={5}>
            </Grid>
            <Grid item xs={7} className={classes.wrapper}>
                <Controls.Paper className={classes.paper}>
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
                    <Form>
                        <Grid container>
                            <Controls.Input
                                name="username"
                                placeholder="Username"
                                startAdornment={<EmailIcon/>}
                                fullWidth={true}
                                size="medium"
                            />
                            <Controls.Input
                                name="username"
                                placeholder="Username"
                                startAdornment={<LockIcon/>}
                                endAdornment={<VisibilityOffIcon/>}
                                fullWidth={true}
                                size="medium"
                            />
                        </Grid>
                        <Grid container alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <Controls.Checkbox 
                                    name="rememberMe"
                                    label="Remember Me"
                                    value={true}
                                    color="primary"
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
                                    style={{width:250, minHeight:50}}
                                />
                            </Grid>
                            <Grid container justify="center" style={{ marginTop:"40px"}}>
                                <span>------- Or register with --------</span>
                            </Grid>
                            <Grid container justify="center" style={{ marginTop:"10px"}}>
                                <FacebookIcon/>
                                <TwitterIcon/>
                                <LinkedInIcon/>
                            </Grid>
                        </Grid>
                    </Form>
                </Controls.Paper>
            </Grid>
        </Grid>
    )
}
