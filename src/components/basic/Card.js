import React from 'react';
import {Card as MuiCard, makeStyles} from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    root:{
        
    }
}))

export default function Card(props) {

    const cardClasses = useStyles();
    const {children, classes, className, ...others} = props;

    return (

        <MuiCard classes={classes} className={`${cardClasses.root} ${className}`} {...others}>
            {children}
        </MuiCard>
        
    )
}
