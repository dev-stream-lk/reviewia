import {getCookie, setCookie, checkCookie} from './cookies';
import HOST from '../config/config';

const TOKEN = getCookie("token");

// get all posts
export const getReviewsByPostId = (id) => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/review/all?id=${id}`, requestOptions )
    .then( async res => {
        if(res.ok){
            let data = await res.json()
            return data;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// add review
export const addReview = (email,postId, description, userRate) => {
    const requestOptions = {
        method:"POST",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
            reviewedBy:"Chamith",
            postId,
            description,
            userRate
        })
    }
    let e = new URLSearchParams({email})
    return fetch(HOST+`user/review?email=${email}`, requestOptions )
    .then( async res => {
        if(res.ok){
            let data = await res.json()
            console.log(data)
            return data;
        }
        return false;
    })
    .catch( err=> console.error(err));
}