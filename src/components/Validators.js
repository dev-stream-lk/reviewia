
const validateUserName = (username) => {
    username = username.trim()
    let error = "";

    if( username.length < 8){
        error = "Username must cantain at least 8 characters."
    }
    return error
}

const validateName = (name) => {
    name = name.trim()
    let error = "";

    if( name.length === 0){
        return "A required field"
    }else if(/[0-9]/.test(name)){
        return "Cannot contain numbers"
    }else if(/[!@#$%^&*]/.test(name)){
        return "Cannot contain symbols"
    }
    return error
}

const validatePassword = (password) => {
    password = password.trim()
    let error = "";
    if( password.length < 8){
        return "Password must cantain at least 8 characters."
    }else if(!/[a-z]/.test(password)){
        return "Lowercase letter";
    }else if(!/[A-Z]/.test(password)){
        return "Uppercase letter";
    }else if(!/[0-9]/.test(password)){
        return "Number";
    }else if(!/[!@#$%^&*]/.test(password)){
        return "Symbol";
    }
    return error
}

const validateEmail = (email) => {

    email = email.trim();
    let pattern = /.*@.*\..*/
    if(!pattern.test(email) ){
        return "Invalid email";
    }
    return ""
}

export {
    validateUserName,
    validatePassword,
    validateEmail,
    validateName
}