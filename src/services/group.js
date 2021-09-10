import HOST from '../config/config';
import {getItem, setItem} from '../services/localStorage';

const TOKEN = getItem("token");

// get user own posts
export const getUserGroups = (email) => {
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
            let data = await res.json()
            return data;
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}
