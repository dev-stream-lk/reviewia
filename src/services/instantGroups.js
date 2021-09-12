import HOST from '../config/config';
import {getItem, setItem} from '../services/localStorage';

const TOKEN = getItem("token");


// create instant group
export const createInstantGroup = (data) => {

    const {email,post, emails} = data;

    const requestOptions = {
        method:"POST",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
            emails
        })
    }

    return fetch(HOST+`user/group?email=${email}&post=${post}`, requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

// get user instant groups
export const getAllInstantGroup = (email) => {


    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/group/all?email=${email}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return await res.json();
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

// get group data
export const getGroupData = (id, email) => {


    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/group?id=${id}&email=${email}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return await res.json();
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}


// send message
export const sendMessage = (data) => {

    const {group, email, content} = data;

    const requestOptions = {
        method:"POST",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
            content
        })
    }

    return fetch(HOST+`user/chat?group=${group}&email=${email}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return await res.json();
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}