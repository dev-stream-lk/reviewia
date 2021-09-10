import { CircularProgress, Fade, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme)=> ({
    div:{
        position:"absolute",
        width:"100%",
        height:"100%",
        top:0,
        left:0,
        background:"#eee",
        zIndex:100,
        margin:0,
        padding:0,
    },
    spinnerWrapper:{
        width:"100%",
        height:"100%",
        margin:0,
        padding:0,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        top:0,
        left:0
    },
    spinner:{
        position:"absolute",
        zIndex:201,
        opacity:1,
        top: `calc(50% - 30px)`,
        left:`calc(50% - 30px)`,
    }
}));


export function PreLoader(props) {

    const classes = useStyles();

    const {loading, opacity=0.5} = props;

    return (
        <>
            <div className={classes.div} style={{opacity:opacity, display: loading?"inherit":"none"}} >
            </div>
            <div className={classes.spinnerWrapper} style={{ display: loading?"inherit":"none"}}>
                <Fade
                    in={loading}
                    style={{
                        transitionDelay:  '200ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress className={classes.spinner} />
                </Fade>
            </div>
        </>
    )
}
