import {getCookie, setCookie, checkCookie} from './cookies';
import HOST from '../config/config';

const TOKEN = getCookie("token");


// Add to favourite list
export const addToFavouriteList = (data) => {
    const {email,id} = data;
    const requestOptions = {
        method:"POST",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/post/favourite?email=${email}&id=${id}`, requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// get  favourite list
export const getFavouriteList = (email) => {

    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/post/favourite?email=${email}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return await res.json()
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// Delete from favourite list
export const removeFromFavouriteList = (data) => {
    const {email,id} = data;
    const requestOptions = {
        method:"DELETE",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/post/favourite?email=${email}&id=${id}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return true;
        }
        return false;
    })
    .catch( err=> console.error(err));
}