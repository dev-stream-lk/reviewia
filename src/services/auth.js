function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }


const register = (data) => {

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

    fetch('http://127.0.0.1:8080/api/registration', requestOptions)
    .then( res => { console.log(res)})
    .catch( err => console.error(err));
    return true;

}


const login = ({email, password},setUserData,history) => {
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

    return fetch('http://127.0.0.1:8080/api/login', requestOptions )
    .then( res => {
        if(res.ok){
            setCookie("isLoggedIn", true,7 )
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));

}

const logout = (setUserData,history) => {
    setUserData( userData=> { return {...userData, isLoggedIn:false}})
    setCookie("isLoggedIn", false,7 )
    history.push("/login")
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
  return fetch('http://127.0.0.1:8080/api/reset', requestOptions )
    .then( res => {
        if(res.ok){
            setCookie("isLoggedIn", true,7 )
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));

}


export {
    login,
    logout,
    passwordRecovery,
    register,
    getCookie
}