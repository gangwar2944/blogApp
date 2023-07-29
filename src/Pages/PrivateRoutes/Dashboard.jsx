import React from "react";
import CustomNavbar from "../../Component/CustomNavbar";
import Base from "../../Component/Base";
import AddPost from "../../Component/AddPost";
import { Container } from "reactstrap";

const Dashboard = () => {
  return (
    <>
      <Base>
          <Container>
                <AddPost/>
          </Container>
        
      
      </Base>
    </>
  );
};

export default Dashboard;
