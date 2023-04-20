// import React from 'react'
import { Link } from 'react-router-dom'
import {
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import logo from '../../../assets/icons/logo-dark-light.png';
import './UnderMaintenance.css';

const UnderMaintenance = () => {
  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
          <div className='clearfix justify-content-center d-flex align-items-center'>
            <CRow className="">
                <CIcon
                  name="logo-negative"
                  src={logo}
                  height={65}
                />
              </CRow>
            </div>
            <div className="clearfix justify-content-center d-flex align-items-center mb-5">
             <div>
             <p className="pt-3 m-0 resized">Application is under Maintenance.</p>
              <p className="text-muted float-left">Please come after some time.</p>
              <Link to="/" className="ml-2">Go back</Link>
              </div>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default UnderMaintenance
