import React, { useEffect, useState } from 'react';
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
import { push, replace } from 'connected-react-router';
import { logout, ToGetUserThunk } from './User/thunks';

const SampleNavBar:React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const dispatch=useDispatch();
  const isLoggedIn=useSelector((state:IRootState)=>state.login.isLoggedIn);
  const username=useSelector((state:IRootState)=>state.login.username);
  const accountBalance=useSelector((state:IRootState)=>state.login.accountBalance);
useEffect(() => {
  if(isLoggedIn){
    dispatch(ToGetUserThunk())
  }

})
  return (
    <div>
      <Navbar color="light" light expand="md" className="NavBarBackground">
        <NavbarBrand onClick={()=>dispatch(push('/'))}>炒股王</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} className="NavBarArrangement" navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
            <NavLink onClick={()=>dispatch(push('/homepage'))}>市場資訊</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                我的股票
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <NavItem>
            <NavLink onClick={()=>dispatch(push('/selfProfilePage'))}>持有股票</NavLink>
            </NavItem>
                </DropdownItem>
                <DropdownItem>
                <NavItem>
              <NavLink onClick={()=>dispatch(push('/showTheStockBySortingPage'))}>關注列表</NavLink>
            </NavItem>
                </DropdownItem>
                <DropdownItem>
                <NavItem>
              <NavLink onClick={()=>dispatch(push('/instructionHistory'))}>指示概覽</NavLink>
            </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <SearchBox/>
            {!isLoggedIn &&
            <NavItem>
              <NavLink onClick={()=>dispatch(push("/register"))}>註冊</NavLink>
            </NavItem>}
             {!isLoggedIn &&
             <NavItem>
              <NavLink onClick={()=>dispatch(push("/login"))}>登入</NavLink>
            </NavItem>}
            {isLoggedIn &&
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                帳戶資料
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem>
                {isLoggedIn && username &&<p>歡迎,{username}</p>}
                </DropdownItem>
                <DropdownItem>
                {isLoggedIn && accountBalance &&<p>戶口結餘:${accountBalance}</p>}
                </DropdownItem>
                <DropdownItem>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                {isLoggedIn && 
            <NavItem>
              <NavLink className="Logout" onClick={()=>{
                dispatch(logout())
                dispatch(replace('/'))
              }}>登出</NavLink>
            </NavItem>}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default SampleNavBar;