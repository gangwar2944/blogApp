import React from 'react'
import LinkBar from '../Component/LinkBar'
import CustomNavbar from '../Component/CustomNavbar'
import Base from '../Component/Base'
import NewFeed from '../Component/NewFeed'
import { Container } from 'reactstrap'


const Home = () => {
  return (
    <div className='homeContainer'>
      <Base>
           <LinkBar/>
           <Container>
              <NewFeed/>
           </Container>
       </Base>
  
    </div>
  )
}

export default Home