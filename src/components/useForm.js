import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';


// USE THIS THEMPLATE FOR VALIDATION
// const validate = (fieldValues= values) => {
//     let temp = {}

//     if('name' in fieldValues)
//         temp.name = fieldValues.name ? "" : "This field is required";
//     if('course' in fieldValues)
//         temp.cource = fieldValues.cource ? "" : "This field is required";

//     setErrors({
//         ...errors,
//         ...temp
//     })

//     return Object.values(temp).every(x=> x=="");
// }

const useStyles = makeStyles( theme => ({
    root:{
        padding: theme.spacing(3),
        "& .MuiFormControl-root":{
            width:"100%",
            margin: theme.spacing(1)
        }
    }
}))

export function useForm(initialValues,validateOnChange=false, validate = null) {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const handleInputChange =  e => {
        console.log(e)
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

