import React from 'react';
import {makeStyles} from '@material-ui/core'
import {Paper as MuiPaper} from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    root:{
        borderRadius:"10px",
        overflow:"hidden",
        boxShadow:"0px 0px 5px 2px rgba(0,0,0,0.21)",
    }
}))

export default function Paper(props) {

    const classes = useStyles();
    const {children , className,...others} = props;

    return (
        <MuiPaper className={`${classes.root} ${className}`} {...others}>
            {children}
        </MuiPaper>
    )
}
