import React from 'react';
import {FormControl, FormControlLabel, Checkbox as MuiCheckbox, makeStyles} from '@material-ui/core'


const useStyles = makeStyles( theme => ({

}))

const convertToDefaultEventPara = (name, value) => ({
    target:{
        name,value
    }
});

export default function Checkbox(props) {

    const classes = useStyles();
    const {name, label,value, onChange, ...others} = props;

    return (
        <FormControl>
            <FormControlLabel 
                control={
                    <MuiCheckbox name={name} checked={value} onChange={e => onChange(convertToDefaultEventPara(name,e.target.checked))} {...others}/>
                } 
                label={label}
            />
        </FormControl>
    )
}
