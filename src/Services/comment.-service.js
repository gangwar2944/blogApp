import { privateRequest } from "./helper";

export const createComment = (comment,postId) => {
    return privateRequest
      .post(`/posts/${postId}/comments`, comment)
      .then((res)=>res.data)
  };