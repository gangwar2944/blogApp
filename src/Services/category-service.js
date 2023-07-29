import { myAxios, privateRequest } from "./helper"

export const getAllCategoryData = ()=>{
    return privateRequest.get(`/categories/`).then((res)=>res.data);
}