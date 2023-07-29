import axios from "axios";

export const BASE_URL='http://localhost:8091/api/v1';
export const myAxios = axios.create({
    baseURL : BASE_URL
});

export const privateRequest = axios.create({
    baseURL : BASE_URL
});
privateRequest.interceptors.request.use(
    (config)=>{
        const token =JSON.parse(localStorage.getItem("data")).token;
        // console.log(token);
        if(token){
            config.headers.common.Authorization =`Bearer ${token}`;
         }
    return config;
},(error)=>Promise.reject(error)
);