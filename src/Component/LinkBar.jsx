import React from 'react'
import styled from 'styled-components'

const LinkBarContainer = styled.div`
    background-color: rgb(76, 158, 240);
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Links = styled.ul`
    /* display: inline-block; */
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
    margin: 0;
`
const LinkItem = styled.li`
    color: #fff;
    font-size: 18px;
    flex: 1;
    font-weight: 400;
    list-style: none;
    padding: 0 10px;
    margin: auto;
`
const LinkBar = () => {
  return (
    <div className='LinkBarContainer'>
        <LinkBarContainer>
           <Links>
             <LinkItem>Home</LinkItem>
             <LinkItem>IT Jobs</LinkItem>
             <LinkItem>Private Jobs</LinkItem>
             <LinkItem>Goverment Jobs</LinkItem>
             <LinkItem>Internship</LinkItem>
           </Links>
        </LinkBarContainer>

    </div>
  )
}

export default LinkBar