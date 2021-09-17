import HOST from '../config/config';
import {getItem} from '../services/localStorage';

const TOKEN = getItem("token");

// Create new category
export const createCategory = (categoryName, type) => {
    const requestOptions = {
        method:"POST",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
            categoryName,
            type
        })
    }

    return fetch(HOST+'admin/category', requestOptions )
    .then( async res => {
        if(res.ok){
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

// Create new subcategory
export const createSubCategory = (categoryId,subCategoryName) => {
    const requestOptions = {
        method:"POST",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
            subCategoryName
        })
    }

    return fetch(HOST+`admin/subcategory?id=${categoryId}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

// Create new brand
export const createBrand = (subCategoryId,name) => {
    const requestOptions = {
        method:"POST",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
            name
        })
    }

    return fetch(HOST+`admin/brand?id=${subCategoryId}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

// get all category
export const getAllCategoryNames = () => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+'public/category/names', requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

// get category by id
export const getAllCategoryById = (id) => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/category?id=${id}`, requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

//  get subcategories
export const getAllSubCategoryNames = () => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+'public/subcategory/names', requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

//  get subcategories by category id
export const getSubCategoryByCategoryId = (id) => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/category/${id}/subcategory`, requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

// get subcategories by subcategory id
export const getSubCategoryById = (id) => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/subcategory?id=${id}`, requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

// get brands by subcategory id
export const getBrandsBySubCategoryId = (id) => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`public/subcategory/${id}/brands`, requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}

// get all categories and subcategories
export const getCategoryWithSubCategory = () => {
    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }
    return fetch(HOST+`public/category/subcategory/names`, requestOptions )
    .then( async res => {
        if(res.ok){
            let data = await res.json()
            let services = []
            let products = []
            data.forEach( x => {
                if( x.type === 'p'){
                    products.push(x)
                }else{
                    services.push(x)
                }
            });
            return {products, services };
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}