import React from 'react';
import {getCookie, setCookie} from '../services/cookies';
import {getCategoryWithSubCategory} from '../services/category'

const token = getCookie("token");
var catContext = {"products":[], "services":[]};
var CatContext = catContext

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