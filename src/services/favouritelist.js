import {getCookie, setCookie, checkCookie} from './cookies';
import HOST from '../config/config';

const TOKEN = getCookie("isLoggedIn");


// Add to favourite list
const addToFavouriteList = (data) => {
    const {email,id} = data;
    const requestOptions = {
        method:"POST",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/post/favourite?email?email=${email}&id=${id}`, requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// get  favourite list
const getFavouriteList = (email) => {

    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/post/favourite?email?email=${email}`, requestOptions )
    .then( async res => {
        if(res.ok){
            data = await res.json()
            return data;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// Delete from favourite list
const deleteFromFavouriteList = (data) => {
    const {email,id} = data;
    const requestOptions = {
        method:"DELETE",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/post/favourite?email?email=${email}&id=${id}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return true;
        }
        return false;
    })
    .catch( err=> console.error(err));
}