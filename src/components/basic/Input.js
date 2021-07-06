import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles( theme => ({

}))

export default function Input(props) {

    const classes = useStyles();
    const {name, variant="outlined", label, value="", onChange=null, error=null, ...others} = props

    return (
        <TextField
            variant={variant}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            { ...(error && {error:true, helperText:error})}
            {...others}
        />
    )
}
