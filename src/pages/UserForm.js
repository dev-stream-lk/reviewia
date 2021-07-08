import { Grid } from '@material-ui/core';
import React from 'react';

import Header from '../components/Header';
import Login from './Login';

export default function UserForm() {


    return (
        <Grid container>
                {/* <Header></Header> */}
                <Login></Login>
        </Grid>
        
    )
}
