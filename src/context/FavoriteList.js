import React from 'react';
import {getCookie, setCookie} from '../services/cookies';
import {getFavouriteList} from '../services/favouritelist';


const token = getCookie("token")
const email = getCookie("email")
var FavContext = [];

var favList = []

export const getContextFromDb = () =>{
    ( async () => {
        let data = await getFavouriteList(email)
        if(data){
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
    console.log(favList)
    FavContext = React.createContext(favList)

    if(!token){
        setCookie("favList", JSON.stringify(favList),365)
    }
}

export const removeFromFavContext = (postId) => {
    favList = favList.filter( item => {
        if(item.postId == postId){return false;}
        else{return true;}
    })
    FavContext = React.createContext(favList)
    if(!token){
        setCookie("favList", JSON.stringify(favList),365)
    }
}

if(token === ""){
    let f = getCookie("favList")
    if(f !== ""){
        favList = JSON.parse(f)
        favList = favList.map(item => {
            return parseInt(item)
        })
    }else{
        favList = []
    }
}else{
    getContextFromDb()    
}


export {
    FavContext
}