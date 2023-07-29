import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavItem,
  NavbarToggler,
  Collapse,
  NavLink,
  Nav,
  NavbarBrand,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { doLogOut, getCurrentUserDetail, isLoggedIn } from "../Auth";

function CustomNavbar() {
  // Collapse isOpen State
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  
  const userLogout=()=>{
     doLogOut(()=>{
         setLogin(false);
		 navigate("/login");
	  });
  }

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, []);

  return (
    <div>
      <Navbar color="white" light expand="md px-5">
        <NavbarBrand href="/">BlogApp</NavbarBrand>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse
          isOpen={isOpen}
          navbar
          style={{ justifyContent: "space-between" }}
        >
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                {" "}
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                {" "}
                about
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink tag={ReactLink} to="/">
                {" "}
                Service
              </NavLink>
            </NavItem> */}
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>Dropdown</DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Contact Us</DropdownItem>
                <DropdownItem text>Dropdown Item Text</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem>LinkedIn</DropdownItem>
                <DropdownItem>Github</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
          <Nav navbar>
            {login && (
              <Nav navbar>
              
			  <NavItem>
                  <NavLink  tag={ReactLink} to={"/user/profile-info"}> Profile Info</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink> {user.email}</NavLink>
                </NavItem>
				<NavItem>
                  <NavLink  tag={ReactLink} onClick={userLogout}> Logout</NavLink>
                </NavItem>
              </Nav>
            )}
            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/register">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
