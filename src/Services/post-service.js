import { privateRequest } from "./helper";

export const createPost = (post) => {
  return privateRequest
    .post(`/user/${post.userId}/category/${post.categoryId}/posts`, post)
    .then((res)=>res.data)
};

export const getAllUser = () => {
  return privateRequest
    .get("/users/getAllUser")
    .then((response) => response.data);
};

export const getAllPost=(pageNumber,pageSize)=>{
  return privateRequest.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=postId&sortDir=desc`).then(res=>res.data);
}

export const postGetById=(postId)=>{
  return privateRequest.get(`/posts/+${postId}`).then((res)=>res.data);
}

// upload post banner image

export const uploadPostImage =(image,postId)=>{
  let formData= new FormData();
  formData.append("image",image);

 return privateRequest.post(`/post/image/upload/${postId}`,formData,{
  headers:{
    "Content-Type":"multipart/form-data"
  }
 }).then((res)=>res.data);
}