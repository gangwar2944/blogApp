import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'

const Post = ({post}) => {

  return (
    <div>
        <Card>
            <CardBody className='text-start'>
                <h1>{post.title}</h1>
                <CardText dangerouslySetInnerHTML={{__html: post.content.substring(0,50)+'...'}}>
                  
                </CardText>
                <div>
                  <Link to={`posts/`+`${post.postId}`}  color='secondary'>read more</Link>
                </div>
                {/* <Button color='secondary'>read more</Button> */}
            </CardBody>
        </Card>
    </div>
  )
}

export default Post