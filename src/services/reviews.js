import HOST from '../config/config';
import {getItem, setItem} from '../services/localStorage';

const TOKEN = getItem("token");

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

// add revirew like dislike
export const addOrRemoveReviewReact = (data) => {

    const {id, email, like,remove} = data;
    
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/review/react?email=${email}&id=${id}&like=${like}&remove=${remove}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return true;
        }
        return false;
    })
    .catch( err=> console.error(err));
}