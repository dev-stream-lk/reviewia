import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {Paper, Button, Grid} from '@material-ui/core';

export default function ImageCarousel(props) {

    const {images} = props;

    return (
        <Carousel
            animation="slide"
        >
            {
               images && images.map((item,i) => <Item key={i} image={item} /> )
            }
        </Carousel>
    )
}

function Item(props){

    const {image} = props;

    return (
        // <Paper>
            <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center"}}
            >
                <img style={{maxWidth:200, maxHeight:200}} src={`${image.url}`} />
            </Grid>
        // </Paper>
    )
}