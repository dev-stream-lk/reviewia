import { Grid } from '@material-ui/core';
import React from 'react';

import Header from '../components/Header';
import Login from './Login';
import HomePage from './HomePage';

export default function UserForm() {


    return (
        <Grid container>
                {/* <Header></Header> */}
                {/* <Login></Login> */}
                <HomePage></HomePage>
        </Grid>
        
    )
}
