import React from 'react';
import {getFavouriteList} from '../services/favouritelist';
import {getItem, setItem} from '../services/localStorage';

const token = getItem("token")
const email = getItem("email")
var favList = []
var FavContext = []

export const getContextFromDb =  () =>{
    ( async () => {
        let data = await getFavouriteList(email)
        if(data){
            favList = []
            data['posts'].forEach( (post) => {
                favList.push(post);
            })
        }else{
            favList = []
        }
        FavContext = React.createContext(favList)
    })();
}
export const addToFavContext = (post) => {
    favList.push(post);
    FavContext = React.createContext(favList)

    if(!token){
        localStorage.setItem("favList", JSON.stringify(favList))
    }
}

export const removeFromFavContext = (postId) => {
    favList = favList.filter( item => {
        if(item.postId == postId){return false;}
        else{return true;}
    })
    FavContext = React.createContext(favList)
    if(!token){
        localStorage.setItem("favList", JSON.stringify(favList))
    }
}

export const refreshContext = () =>{
    if(!token){
        let f = getItem("favList")
        if(f !== ""){
            favList = JSON.parse(f)
            favList = favList.map(item => {
                return item
            })
        }else{
            favList = []
        }
        FavContext = React.createContext(favList)
    }else{
        getContextFromDb()
    }
}
refreshContext()
export {
    FavContext
}