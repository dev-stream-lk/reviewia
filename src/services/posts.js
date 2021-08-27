import {getCookie, setCookie, checkCookie} from './cookies';
import HOST from '../config/config';

const TOKEN = getCookie("token");

// Create a new post
export const createPost = (data) => {
    const {title, description, type} = data;
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        },
        body:{
            title,
            description,
            type
        }
    }

    return fetch(HOST+'user/post/create', requestOptions )
    .then( async res => {
        if(res.ok){
            let data = await res.json()
            return data;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// get all posts
export const getAllPosts = () => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/posts`, requestOptions )
    .then( async res => {
        if(res.ok){
            let data = await res.json()
            return data;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// get all posts with paging and sorting
export const getAllPostsWithPagin = (page=1,size=10,sort="asc") => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/post?page=${page}&size=${size}&sort=${sort}`, requestOptions )
    .then( async res => {
        if(res.ok){
            let data = await res.json()
            return data;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// get post by post id
export const getPostById = (id) => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/post?id=${id}`, requestOptions )
    .then( async res => {
        if(res.ok){
            let data = await res.json()
            return data;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

// get all post by search
export const getPostBySearch = (title) => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/post?title=${title}`, requestOptions )
    .then( async res => {
        if(res.ok){
            let data = await res.json()
            return data;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

export const getRecentPosts = () => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+'public/posts?page=0&size=8&sort=desc', requestOptions )
    .then( async res => {
        if(res.ok){
            let data = await res.json()
            return data.posts;
        }
        return false;
    })
    .catch( err=> console.error(err));
}

export const getPopularCategory = () => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+'', requestOptions )
    .then( async res => {
        if(res.ok){
            let data = await res.json()
            return data;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

