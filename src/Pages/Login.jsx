import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import {loginUser} from "../Services/user-service";
import { doLogIn } from "../Auth";

const Login = () => {
  const [user , setUser] = useState({
          email:'',
          password:''
  })

  const navigate = useNavigate();

  const handleChange=(e)=>{
      setUser({...user,[e.target.name]:e.target.value})
  }

  const signInUser = (e) => {
    e.preventDefault();

    if(user.email.trim()==='' || user.password.trim()===''){
      toast.error("username or password is required");
      return;
    }

    loginUser(user)
    .then((res)=>{
      console.log(res);
      toast.success("user login successfully")

      doLogIn(res,()=>{
        console.log("user saved in localstroge successfully");
           navigate("/user/dashboard");
      })

    })
    .catch((err)=>{
       console.log(err);
       if(err.response.status===400 || err.response.status === 404){
         toast.error(err.response.data.message)
       }else{
        toast.error("Somthing went wrong")
       }
      
      }
    );

  };
  return (
    <>
      
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse>
              <CardHeader>
                <h3>Fill Information to Register</h3>
              </CardHeader>
              <CardBody>
            <Form>
              <FormGroup className="text-start">
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  placeholder="Enter you email"
                  className="p-2"
                  id="email"
                  name="email"
                  value ={user.email}
                  onChange={(e)=>handleChange(e)}
                />
              </FormGroup>
              <FormGroup className="text-start">
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter you password"
                  className="p-2"
                  id="password"
                  name="password"
                  value ={user.password}
                  onChange={(e)=>handleChange(e)}
                />
              </FormGroup>
              <Container className="text-start">
                <Button color="light" outline onClick={signInUser}>
                  Login
                </Button>
                {/* <Button color="secondary" outline type="reset" className="ms-2" >
                  Reset
                </Button> */}
                <Button color="secondary" outline className="m-2">
                  <NavLink to="/register">Register</NavLink>
                </Button>
              </Container>
            </Form>
            </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
