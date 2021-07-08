import { Grid } from '@material-ui/core';
import React from 'react';

import Header from '../components/Header';

export default function UserForm() {


    return (
        <Grid container>
            <Grid item xs={6}>
                <Header></Header>
            </Grid>
        </Grid>
        
    )
}
