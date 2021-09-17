import HOST from '../config/config';
import {getItem} from '../services/localStorage';

const TOKEN = getItem("token");

// Create a new post
export const createPost = (data) => {
    const {title, email, brandName, subCategoryId, description, type, selectedImages} = data;
    const formData = new FormData();
    selectedImages.foreEach( img =>{
        formData.append(
            "image",
            img["imageObj"],
            img["imageObj"].name
        );
    } );

    formData.append(
        "post",
        JSON.stringify({
            title,
            description,
            type
        })
    );

    const requestOptions = {
        method:"POST",
        headers:{
          'Authorization': `Bearer ${TOKEN}`
        },
        body: formData
    }
    let url = HOST+`user/post/create?email=${email}&subcategory=${subCategoryId}`
    if(brandName){
        url +=`&brand${brandName}`;
    }

    return fetch(url, requestOptions )
    .then( async res => {
        if(res.ok){
            return true;
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
export const getAllPostsWithPagin = (page=1,size=10,sort="createdAt",order="asc") => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/post?page=${page}&size=${size}&sort=${sort}&order=${order}`, requestOptions )
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
export const getPostBySearch = (filters, page=0, size=10, sort="createdAt", order="asc") => {

    let search_url = "";
    let isEmpty = true;
    if ("title" in filters && filters.title !== ""){
        search_url += `title:${filters.title}`
        isEmpty = false
    }
    if ("rating" in filters && filters.rating >0){
        if( !isEmpty)
            search_url += ",rate";
        else
            search_url += "rate";
        isEmpty = false
        
        if( "ratingOperator" in filters && filters.rating !== ""){
            search_url += filters.ratingOperator;
        }else{
            search_url += ":";
        }
        search_url += `${filters.rating}`;
    }
    if ("category" in filters && (filters.category !== "" && filters.category !== "all")){
        if( !isEmpty)
            search_url += ",category";
        else
            search_url += "category";

        isEmpty = false
        search_url += `:${filters.category}`
    }
    if ("subCategory" in filters && (filters.subCategory !== "" && filters.subCategory !== "all")){
        if( !isEmpty)
            search_url += ",subCategory";
        else
            search_url += "subCategory";
        isEmpty = false
        search_url += `:${filters.subCategory}`
    }

    if ("brand" in filters && (filters.brand !== "" && filters.brand !== "all")){
        if( !isEmpty)
            search_url += ",brand";
        else
            search_url += "brand";
        isEmpty = false
        search_url += `:${filters.brand}`
    }

    if ("type" in filters && (filters.type !== "" && filters.type !== "all")){
        if( !isEmpty)
            search_url += ",type";
        else
            search_url += "type";
        isEmpty = false
        search_url += `:${filters.type}`
    }

    // add paging options
    if( !isEmpty)
        search_url += "&";
    search_url += `page=${page}&size=${size}&sort=${sort}&order=${order}`;

    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/posts?search=${search_url}`, requestOptions )
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

    return fetch(HOST+'public/posts?page=0&size=8&sort=updatedAt&order=desc', requestOptions )
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

// get user own posts
export const getUserPosts = (email) => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/posts?email=${email}`, requestOptions )
    .then( async res => {
        if(res.ok){
            let data = await res.json()
            return data;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}
