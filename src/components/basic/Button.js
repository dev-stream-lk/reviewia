import React from 'react';
import {Button as MuiButton, makeStyles} from '@material-ui/core';

const useStyles = makeStyles( theme => ({
    muiButton:{

        "& .MuiButton-label":{            
        },
        "&.MuiButton-text, &.MuiButton-textPrimary,&.MuiButton-textSecondary" :{
            
        }
    },

}))

export default function Button(props) {

    const classes = useStyles();
    const {text="Button", variant="contained", color="primary", size="medium", onClick, ...others} = props;

    return (
        <MuiButton
            variant={variant}
            color={color}
            size={size}
            {...others}
            className={classes.muiButton}
        >
            {text}
        </MuiButton>
    )
}
