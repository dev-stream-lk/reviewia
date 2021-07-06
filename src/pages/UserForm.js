import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import Controls from '../components/Controls';
import {useForm, Form} from '../components/useForm'; 

const genderItems = [
    {id:'male', title:"Male"},
    {id:'female', title: "Female"},
    {id:'other', title: "Other"},
]

const cources = [
    {id:"cs", title:"CS"},
    {id:"management", title:"Management"}
]

const initialValues= {
    name:"",
    cource:"cs"
}

export default function UserForm() {

    const validate = (fieldValues= values) => {
        let temp = {}

        if('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required";
        if('cource' in fieldValues)
            temp.cource = fieldValues.cource ? "" : "This field is required";

        setErrors({
            ...errors,
            ...temp
        })

        return Object.values(temp).every(x=> x=="");
    }

    const {values, setValues, handleInputChange, errors, setErrors } = useForm(initialValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validate())
            alert("testing")
    }


    return (
        <Grid container>
            <Grid item xs={6}>
                <Form onSubmit={handleSubmit}>
                    <Controls.Input 
                        name="name"
                        value={values.name}
                        label="Name"
                        onChange={handleInputChange}
                        error={errors.name}
                    >
                    </Controls.Input>
                    <Controls.Select
                        name="cource"
                        value={values.cource}
                        label="Cource"
                        error={errors.cource}
                        options={cources}
                        onChange={handleInputChange}
                    >
                    <Controls.RadioGroup items={genderItems}>

                    </Controls.RadioGroup>
                    </Controls.Select>
                    <Controls.Button type="submit">
                    </Controls.Button>
                </Form>
            </Grid>
        </Grid>
        
    )
}
