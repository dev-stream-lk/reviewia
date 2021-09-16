import HOST from '../config/config';
import {getItem, setItem} from '../services/localStorage';

const TOKEN = getItem("token");


// get user notifications
export const getNotificationCount = (email) => {


    const requestOptions = {
        method:"GET",
        headers:{
          'Content-Type':"application/json",
          'Authorization': `Bearer ${TOKEN}`
        }
    }

    return fetch(HOST+`user/notification/count?email=${email}`, requestOptions )
    .then( async res => {
        if(res.ok){
            return await res.json();
        }
        return false;
        
    })
    .catch( err=> console.error(err));
}