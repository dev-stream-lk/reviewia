import {getCookie, setCookie, checkCookie} from './cookies';
import HOST from '../config/config';


const user_register = (data) => {
    const {firstName, lastName, email, password} = data;
    
    const requestOptions = {
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
    }

    return fetch(HOST+'registration', requestOptions)
    .then( res => { 
        if (res.status == 201){
            return true
        }else{
            return res.json()
        }
    })
    .then( data => {
        if( data === true)
            return true
        else
            return data['message']
    })
    .catch( err => {console.error(err); return false});
}


const user_login = ({email, password},setUserData,history) => {
    const requestOptions = {
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify({
                email,
                password
            })
    }

    return fetch(HOST+'login', requestOptions )
    .then( res => {
        if(res.ok){
            return res.json();
        }
        return false;
    })
    .then ( data => {
        if( data){
            let token = data['token'].split("Bearer ")[1]
            setCookie("token", token ,30);
            setCookie("email", email ,30);
            
            const requestOptions = {
                method:"GET",
                headers:{
                    'Content-Type':"application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            fetch(HOST+`user?email=${email}`, requestOptions )
            .then( res => {
                if(res.ok){
                    return res.json();
                }
                return false;
            })
            .then ( data => {
                if( data){
                    setCookie("name", data['firstName'] + data['lastName'] ,30);
                }
            })
            .catch( err => console.error(err));
            return token;
        }else{
            return false;
        }
    })
    .catch( err=> console.error(err));

}

const get_user_basic_info = (token, email) => {
    const requestOptions = {
        method:"GET",
        headers:{
            'Content-Type':"application/json",
            'Authorization': `Bearer ${token}`
        }
    }

    return fetch(HOST+`user?email=${email}`, requestOptions)
        .then( async res => { 
            let data = await res.json()
            if(data){
                return data
            }
            return false
        })
        .catch( err => console.error(err));
}

const logout = (setUserData,history) => {
    setUserData( userData=> { return { userData:{...userData.userData,token:"",isLoggedIn:false}, setUserData:userData.setUserData }})
    setCookie("isLoggedIn", false, -7);
    setCookie("email", "", -7 );
    setCookie("token","", -7);
    setCookie("name","", -7);
    history.push("/login");
}

const passwordRecovery = ({email}) => {

  const requestOptions = {
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body: JSON.stringify({
      email
    })
  }
  return fetch(HOST+'reset', requestOptions )
    .then( res => {
        if(res.ok){
            return true;
        }
        return false;
    })
    .catch( err=> console.error(err));

}


export {
    user_login,
    logout,
    passwordRecovery,
    user_register,
    get_user_basic_info
}