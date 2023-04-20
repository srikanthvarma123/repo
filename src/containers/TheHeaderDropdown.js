import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import './containers.css'
import axios from 'axios'
import { getUserNameFromSessonStorage } from 'src/Services/LocalStorageService'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from 'src/config'
import { callMsGraph } from 'src/graph'
const TheHeaderDropdown = (props) => {
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.darkMode);

  let userInfo = getUserNameFromSessonStorage();
  // const connectionId = useSelector(state => state.connectionId);
  const {instance ,accounts} = useMsal();
  const [graphData, setGraphData] = useState(null);
  const userName = props?.userName;
  const userFLName = userName?.charAt(0) + userName?.charAt(userName.indexOf(' ') + 1) ;
  const handleLogout = (logoutType) => {
    sessionStorage.clear();
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
}
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar profile-custiom-wording">
          {userFLName}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
      <CDropdownItem onClick={() => dispatch({type: 'set', darkMode: !darkMode})}>
          <CIcon name="cil-moon" className="c-d-dark-none mfe-2" alt="CoreUI Icons Moon" />
          <CIcon name="cil-sun" className="c-d-default-none mfe-2" alt="CoreUI Icons Sun" />
        <span>{darkMode ? 'Light' : 'Dark'}</span>
        </CDropdownItem>
        <CDropdownItem onClick={handleLogout}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
