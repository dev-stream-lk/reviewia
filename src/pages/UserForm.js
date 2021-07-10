import { Grid} from '@material-ui/core';
import React, {useState} from 'react';
import Header from '../components/Header';
import Login from './Login';
import HomePage from './HomePage';
import Footer from '../components/Footer';
import Controls from '../components/Controls';
import ProductList from './ProductList';
import ProductView from './ProductView';
import AddProduct from './AddProduct';

export default function UserForm() {

    const [isMobile, setIsMobile] = useState(false);

    const handleIsMobile = (state) => {
        setIsMobile(state);
    }

    return (
        <Grid container>
                {/* <Header></Header> */}
                {/* <Login></Login> */}
                {/* <HomePage></HomePage> */}
                {/* <ProductList isMobile={isMobile} handleIsMobile={handleIsMobile} ></ProductList> */}
                {/* <ProductView/> */}
                <AddProduct/>
        </Grid>
        
    )
}
