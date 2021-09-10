import React from 'react';
import {getCategoryWithSubCategory} from '../services/category';
import {getItem, setItem} from '../services/localStorage';

const token = getItem("token");
var catContext = {"products":[], "services":[]};
var CatContext = catContext;

const loadContext = () => {
    (async () => {
        let data = await getCategoryWithSubCategory()
        if(data){
            catContext = data;
        }
        CatContext = React.createContext(catContext);
    })();
}
loadContext();

export {
    CatContext
}