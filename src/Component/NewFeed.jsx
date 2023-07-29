import React, { useEffect, useState } from 'react'
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap'
import { getAllPost } from '../Services/post-service';
import Post from './Post';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

const NewFeed = () => {

   const [postContent,setPostContent] = useState({
        content:[],
        totalElements:'',
        totalPages:'',
        pageSize:'',
        lastPage:false,
        pageNumber:''
   }); 
   const [currPage,setCurrPage] =useState(0);

    useEffect(()=>{
        // load all post 

        // getAllPost().then(res=>{
        //     console.log(res);
        //     setPostContent(res)
        // }).catch((err)=>{
        //     console.log(err)
        // });
        changePage(currPage);
    },[currPage])
    const changePage =(pageNumber=0,pageSize=5)=>{
        if(pageNumber>postContent.pageNumber && postContent.lastPage){
            return;
        }
        if(pageNumber<postContent.pageNumber && postContent.pageNumber==0){
            return;
        }
          getAllPost(pageNumber,pageSize).then((data)=>{
            setPostContent({
            content:[...postContent.content,...data.content],
            totalPages:data.totalPages,
            totalElements:data.totalElements,
            pageSize:data.pageSize,
            lastPage:data.lastPage,
            pageNumber:data.pageNumber
          })
            window.scroll(0,0);
          }).catch((error)=>{
            toast.error(error)
          })
    }

    const changePageInfinite =()=>{
        console.log("content loaded")
       setCurrPage(currPage+1)
    }
  return (
    <div className='container-fluid'>
            <Row>
                <Col md={
                    {
                        size:10,
                        offset:1
                    }
                }>
                    <h1>blogcount : {postContent.totalElements}</h1>
                    <InfiniteScroll
                      dataLength={postContent.content.length}
                      next={changePageInfinite}
                      hasMore={!postContent.lastPage}
                      loader={<h4>loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: 'center' }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                    {
                        postContent.content?.map((post)=>{
                           return <Post post ={post}/>
                        })
                    }
                    </InfiniteScroll>
                   
                    {/* <Container className='mt-3'> 
                          <Pagination size='mx'>
                            <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber==0}>
                                <PaginationLink previous>
                                     previous
                                </PaginationLink>
                            </PaginationItem>
                            {
                                [...Array(postContent.totalPages)].map((item,index)=>(
                                    <PaginationItem onClick={()=>changePage(index)} active={index==postContent.pageNumber} key={index}>
                                    <PaginationLink>
                                         {index+1}
                                    </PaginationLink>
                                </PaginationItem>
                                ))
                            }
                            <PaginationItem onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage}>
                                <PaginationLink next>
                                       next
                                </PaginationLink>
                            </PaginationItem>
                          </Pagination>
                    </Container> */}
                </Col>
            </Row>
    </div>
  )
}

export default NewFeed