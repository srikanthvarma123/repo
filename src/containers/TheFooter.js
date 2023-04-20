import React from 'react'
import { CFooter } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
const TheFooter = () => {
  return (
    <CFooter fixed={false} className={`h-auto footer-style text-center justify-content-between stickyFooter`}>
    {/* <div className=''> App Version
      <span role="button" onClick={changehandle} style={{whiteSpace:"nowrap"}}><CIcon name="cilPin" className={`text-danger ${toastval !== true || toastval === "" ? "pin" :"unpin"}`}/> {userDetails?.AppVersion ? 'V'+userDetails?.AppVersion : ""}</span>
    </div> */}
    <div className='text-left'>
      <span>
      <span>
        {/* <CIcon name="cilBank" className='mb-1' alt="Company" /> */}
        &nbsp;AIMS360 &nbsp;&nbsp;</span>
           {/* <span style={{whiteSpace:"nowrap"}}><i className="fas fa-database"></i>&nbsp;{userDetails?.Database} </span>&nbs
           {/* <span><CIcon name="cilBank" className='mb-1' alt="Company" />&nbsp;{userDetails?.CompanyName} &nbsp;&nbsp;</span>
           <span style={{whiteSpace:"nowrap"}}><i className="fas fa-database"></i>&nbsp;{userDetails?.Database} </span>&nbsp;&nbsp;
           <span style={{whiteSpace:"nowrap"}}><i className="fas fa-user"></i>&nbsp;{userDetails?.UserAccount}</span> */}
      </span>
    </div>
    <div className="">
      <span className="ml-1"style={{whiteSpace:"nowrap"}}>&copy; {(new Date().getFullYear())} <a href="https://www.aims360.com" target="_blank" rel="noopener noreferrer">AIMS360</a></span>
    </div>
  </CFooter>
  )
}

export default React.memo(TheFooter)
