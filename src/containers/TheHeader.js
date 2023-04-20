import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CLabel,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logo from '../assets/icons/logo-dark-light.png';
import './containers.css'
import {
  TheHeaderDropdown, TheHeaderDropdownNotif,

}  from './index'
import store from 'src/store';
import routes from 'src/routes';
import { getUserAccountFromLocalStorage, getUserFLnameFromLocalStorage, getUserNameFromSessonStorage } from 'src/Services/LocalStorageService';
import { loginRequest } from 'src/config';
import { callMsGraph } from 'src/graph';
import { useMsal } from '@azure/msal-react';

const TheHeader = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.darkMode)
  const sidebarShow = useSelector(state => state.sidebarShow)
  const UserAccount = getUserAccountFromLocalStorage();
  const UserFLname = getUserNameFromSessonStorage();


  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }
  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }
  const {instance ,accounts} = useMsal();
  const [graphData, setGraphData] = useState(null);
  const userName = graphData?.displayName;

  useEffect(()=>{
    requestProfileData();
  },[])
  const  requestProfileData = () => {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
    }).then((response) => {
        callMsGraph(response.accessToken).then(response => setGraphData(response));
    });
  } 


  
  return (
    <CHeader withSubheader >
        <div className="header-style justify-content-between w-100">
          <div>
            <CToggler
              inHeader
              className="ml-md-3 d-lg-none menuicon"
              onClick={toggleSidebarMobile}
            />
            <CToggler
              inHeader
              className="ml-3 d-md-down-none my-3"
              onClick={toggleSidebar}
            />
            <CHeaderBrand className="d-lg-none" to="/dashboard">
              <CIcon
                className='resized'
                src={logo}
                name="logo"
                height="35"
                alt="Logo" />
            </CHeaderBrand>
          </div>
          <CHeaderNav className="p-0 ml-auto removed ">
            <div className="d-flex">
              <div className="mt-1">
                <CLabel className="c-subheader-nav-link p-0 pl-1 uname-size text-primary" href="#">
                  {UserFLname}
                </CLabel>
              </div>
              <div className="d-flex">
                {/* <TheHeaderDropdownNotif /> */}
              </div>
            </div>
            <TheHeaderDropdown userName= {userName} store={store.getState()} />
          </CHeaderNav>
        </div>
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
      </CHeaderBrand>
      <CSubheader className="px-1 justify-content-between" onClick={()=>{dispatch({type:"set",sidebarRefresh : true})}}>
          <CBreadcrumbRouter className="border-0 c-subheader-nav m-0 px-0 px-md-3" routes={routes} />
          <div>
            <div className="d-md-down mfe-2 c-subheader-nav">
              <CLink className="c-subheader-nav-link p-0 pl-1" href="#">
              <CIcon className="cil-fax" alt="Settings" />
              &nbsp; {userName}
              </CLink>
            </div>
          </div>
        </CSubheader>    
    </CHeader>
  )
}

export default TheHeader
