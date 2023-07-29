import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { signUp } from "../Services/user-service";

const Register = () => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(error.isError){
      toast.error("Data is invailed or getting Some fields Empty")
      setError({...error,isError:false})
      return;
    }
     
  signUp(inputs)
      .then((res) => {
        console.log(res.message);
        toast.success(res.message)
        setInputs({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          cpassword: "",
        });
        setError({...error,isError:false})
      })
      .catch((err) => {

        setError({
          errors:err,
          isError: true
        })
        // toast.error(err.response.data.firstname)
      });
  };
  return (
    <div>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                <h3>Fill Information to Register</h3>
              </CardHeader>
              <CardBody>
                {/* creating form */}
                <Form>
                  {/* for first name field */}
                  <FormGroup className="text-start">
                    <Label for="fname">First Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter first Name"
                      id="fname"
                      name="firstname"
                      className="p-2"
                      onChange={(e)=>handleChange(e)}
                      value={inputs.firstname}
                      invalid={error.errors.response?.data?.firstname?true:false}
                    />
                    <FormFeedback>{error.errors.response?.data?.firstname}</FormFeedback>
                  </FormGroup>
                  {/* for last name field */}
                  <FormGroup className="text-start">
                    <Label for="lname">Last Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter last Name"
                      id="lname"
                      name="lastname"
                      className="p-2"
                      onChange={(e)=>handleChange(e)}
                      value={inputs.lastname}
                      invalid={error.errors.response?.data?.lastname?true:false}
                      />
                      <FormFeedback>{error.errors.response?.data?.lastname}</FormFeedback>
                  </FormGroup>
                  {/* for email name field */}
                  <FormGroup className="text-start">
                    <Label for="email">Email</Label>
                    <Input
                      type="text"
                      placeholder="Enter your email"
                      id="email"
                      name="email"
                      className="p-2"
                      onChange={(e)=>handleChange(e)}
                      value={inputs.email}
                      invalid={error.errors.response?.data?.email?true:false}
                    />
                    <FormFeedback>{error.errors.response?.data?.email}</FormFeedback>
                  </FormGroup>
                  {/* for password name field */}
                  <FormGroup className="text-start">
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      id="password"
                      name="password"
                      className="p-2"
                      onChange={(e)=>handleChange(e)}
                      value={inputs.password}
                      invalid={error.errors.response?.data?.password?true:false}
                    />
                    <FormFeedback>{error.errors.response?.data?.password}</FormFeedback>
                  </FormGroup>
                  {/* for confirm password name field */}
                  <FormGroup className="text-start">
                    <Label for="cpassword">Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter your confirm password"
                      id="cpassword"
                      name="cpassword"
                      className="p-2"
                      onChange={(e)=>handleChange(e)}
                      value={inputs.cpassword}
                    />
                  </FormGroup>
                  <Container className="text-start">
                    <Button color="light" outline onClick={handleSubmit}>
                      Register
                    </Button>
                    <Button
                      color="secondary"
                      outline
                      type="reset"
                      className="ms-2"
                      >
                      Reset
                    </Button>
                    <Button color="secondary" outline className="m-2">
                      <NavLink to="/login">Login</NavLink>
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
