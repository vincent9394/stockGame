import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './SampleNavBar.scss'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import SearchBox from './SearchBox';
import { ToLogOutSuccess } from './Login/actions';
import { push } from 'connected-react-router';

const SampleNavBar:React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const dispatch=useDispatch();
  const isLoggedIn=useSelector((state:IRootState)=>state.login.isLoggedIn);
  const username=useSelector((state:IRootState)=>state.login.username);

  return (
    <div>
      <Navbar color="light" light expand="md" className="NavBarBackground">
        <NavbarBrand onClick={()=>dispatch(push('/'))}>Stock Game</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} className="NavBarArrangement" navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
            <NavLink onClick={()=>dispatch(push('/homepage'))}>Home</NavLink>
            </NavItem>
            <NavLink onClick={()=>dispatch(push('/selfProfilePage'))}>Profile</NavLink>
            <NavItem>
              <NavLink onClick={()=>dispatch(push('/showTheStockBySortingPage'))}>Info</NavLink>
            </NavItem>
            {username && <p>Hello,{username}</p>}
            {!isLoggedIn &&<NavItem>
              <NavLink onClick={()=>dispatch(push("/register"))}>Register</NavLink>
            </NavItem>}
             {!isLoggedIn &&<NavItem>
              <NavLink onClick={()=>dispatch(push("/login"))}>Login</NavLink>
            </NavItem>}
            {isLoggedIn && <NavItem>
              <NavLink className="Logout" onClick={()=>dispatch(ToLogOutSuccess())}>LogOut</NavLink>
            </NavItem>}
            <SearchBox/>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default SampleNavBar;