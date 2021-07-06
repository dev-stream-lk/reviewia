import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles( theme => ({
    root:{
        padding: theme.spacing(5),
        "& .MuiFormControl-root":{
            width:"80%",
            margin: theme.spacing(1)
        }
    }
}))

export function useForm(initialValues,validateOnChange, validate) {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const handleInputChange = e => {
        const {name,value} = e.target;
        setValues({
            ...values,
            [name]:value
        })

        if(validateOnChange){
            validate({[name] : value})
        }
    }

    return {
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors
    }
}


export  function Form(props) {

    const classes = useStyles();
    const {children, ...others} = props;

    return (
        <form  className={classes.root} {...others}>
            {children}
        </form>
    )
}

