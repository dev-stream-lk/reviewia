import {getCookie, setCookie, checkCookie} from './cookies';
import HOST from '../config/config';

const TOKEN = getCookie("isLoggedIn");


// Add to new review
const addReview = (data) => {
    const {email,reviewedBy, postId, description, userRate} = data;
    const requestOptions = {
        method:"POST",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        },
        body:{
            reviewedBy,
            postId,
            description,
            userRate
        }
    }

    return fetch(HOST+`user/review?email=${email}`, requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// get revirew by id
const addReviewById = (id) => {
    
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/review/${id}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return await res.json();
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// get revirew by email
const addReviewsByEmail = (email) => {
    
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/review?email=${email}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return await res.json();
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// TODO : Clarify this
// get revirew like dislike
const addReviewLike = (id) => {
    
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/review/${id}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return await res.json();
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// block review
const blockReview = (id) => {
    
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`admin/review?id=${id}`, requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
    })
    .catch( err=> console.error(err));
}


// delete review
const deleteReview = (id) => {
    
    const requestOptions = {
        method:"DELETE",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/review/${id}`, requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// get revirews by post id
const addReview = (id) => {
    
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/review?id=${id}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return await res.json();
        }
        return false;
    })
    .catch( err=> console.error(err));
}