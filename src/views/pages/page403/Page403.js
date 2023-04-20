import {
  CCol,
  CContainer,
  CRow
} from '@coreui/react'

const Page403 = () => { 
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oops! Your session was expired.</h4>
              <p className="text-muted float-left">The please login to application to reactivate your session</p>            
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page403
