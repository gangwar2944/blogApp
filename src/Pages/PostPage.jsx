import React from "react";
import Base from "../Component/Base";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {postGetById } from "../Services/post-service";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap";
import { useState } from "react";
import { createComment } from "../Services/comment.-service";
import { isLoggedIn } from "../Auth";
import { BASE_URL } from "../Services/helper";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [comment,setComment] = useState({
    content:""
  });

  console.log(post)
  useEffect(() => {
    //  load all posts
    postGetById(postId)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  }, []);

//   const printDate=(number)=>{
//     return new Date(number).toString();
//   }
const commented=(e)=>{
  e.preventDefault();
  if(!isLoggedIn()){
    toast.error("need to login first");
    return;
  }
  if(comment.content===''){
    return;
  }
  createComment(comment,post.postId).then(data=>
        {
          console.log(data)
          
          toast.success("comment posted!")
          setPost({
            ...post,
            comments:[...post.comments,data]
          })
          setComment({
            content:""
          })
        } 
    ).catch(error=>{
      console.log(error)
    });
  
}

  return (
    <Base>
      <div>
        <Container>
          <Link to={"/"}>Home</Link>/{post && (<Link to={""}>{post.title}</Link>)}
          <Row>
            <Col md={{ size: 12 }}>
              <Card className="mt-3">
                
                  {(post) && (
                    <CardBody>
                      <CardText>
                       Posted by{" "}
                       <b>
                         {post.user?.firstName} on{" "}
                         {/* <b>{new Date()}</b> */}
                       </b>
                      </CardText>
                      <CardText className="text-start">
                          <span>{post?.category?.categoryTitle}</span>
                      </CardText>

                      {/* image section  */}

                      <CardText className="text-center">
                          {/* <span>{post?.category?.categoryTitle}</span> */}
                         {
                         post && <img src={BASE_URL+"/post/image/"+post.imgName} alt="post-img"/>
                        }
                      </CardText>
                      <CardText className="text-start">
                          <h3>{post.title}</h3>
                      </CardText>

                      <CardText className="text-start mt-3" dangerouslySetInnerHTML={{__html: post.content}}>
                          
                      </CardText>
                    </CardBody>
                  )}
                
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
               <Col md={
                {
                  size:9,
                  offset:1
                }
               }>
                <h3 className="text-start"> comments ({post ? post.comments?.length :0})</h3>
                {
                  post.comments && post.comments.map((c,index)=>(
                    <Card className="mt-2 border-3 text-start" key={index}>
                       <CardBody>
                         <CardText>
                          {c.content}
                         </CardText>
                       </CardBody>
                    </Card>
                  ))
                }
                 <Card className="mt-2 border-3 text-start">
                       <CardBody>
                         <Input 
                         type="textarea" 
                         placeholder="write comment here "
                         value={comment.content}
                         onChange={(e)=>setComment({content:e.target.value})}/>
                      
                        <Button className="mt-3" onClick={commented}>Send</Button>
                       </CardBody>
                    </Card>
               </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default PostPage;
