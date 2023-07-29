import { myAxios } from "./helper";

export const signUp=(user)=>{
      return myAxios
            .post('/auth/register',user)
            .then((response)=>response.data);
}

export const loginUser=(user)=>{
      return myAxios.post('/auth/authenticate',user).then((res)=>res.data);
}