

export const getItem = (key) => {
    let val = localStorage.getItem(key)
    if(val){
        return val
    }else{
        return ""
    }
}

export const setItem = (key, val) =>{
    localStorage.setItem(key, val)
}