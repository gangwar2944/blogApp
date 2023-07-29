// isLoggedIn
export const isLoggedIn=()=>{
     let data = localStorage.getItem("data");
     if(data==null){
        return false;
     }else{
        return true;
     }
}

// doLogIn

export const doLogIn=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next();
}

// doLogOut

export const doLogOut=(next)=>{
    localStorage.removeItem("data");
    next()
}

// getCurrentUser

export const getCurrentUserDetail=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).user;
    }else{
        return undefined;
    }
}