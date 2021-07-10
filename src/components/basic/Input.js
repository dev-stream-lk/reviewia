import { InputAdornment, makeStyles, TextField } from '@material-ui/core'
import React from 'react';

const useStyles = makeStyles( theme => ({
    root:{
        padding:5,
        "& .MuiOutlinedInput-notchedOutline":{
            boxShadow:"0px 0px 5px 1px rgba(0,0,0,0.21)",
            padding: 0
        }
    }
}))

export default function Input(props) {

    const classes = useStyles();
    const {name, variant="outlined", size="small", startAdornment=null, endAdornment=null, label, value="", onChange=null, error=null, ...others} = props

    return (
        <TextField
            className={classes.root}
            variant={variant}
            label={label}
            name={name}
            value={value}
            size={size}
            InputProps={{
                ...startAdornment?
                        {startAdornment:(
                            <InputAdornment position="start">
                                {startAdornment}
                            </InputAdornment>
                        )}:{},
                ...endAdornment ? 
                        {endAdornment:(
                            <InputAdornment position="end">
                                {endAdornment}
                            </InputAdornment>
                        )}:{}
            }}
            onChange={onChange}
            { ...(error && {error:true, helperText:error})}
            {...others}
        />
    )
}
