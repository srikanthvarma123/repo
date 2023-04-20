/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { CButton, CCol, CContainer, CDataTable, CInput, CRow, CSpinner} from "@coreui/react";
import { CLabel } from "@coreui/react";
import { formatGridData } from "src/helpers/common_helper";
import useApiLogsStates from "src/helpers/hooks/useApiLogsStates";
import DatetimeRangePicker from "../helper/DatetimeRangePicker";
import moment from "moment";
export default function Exception() {
  const { isLoading, isRecurring, clientId, requestId, category, odataQuery, tabelData, errorMessage, handleStates, handleNavigate, ZoneSelect, SystemSelect,CategorySelect, RenderFindBtn, RenderRemoveIcon, RefreshButton, CancelButton } = useApiLogsStates("Exception");
  const [displayAdvOptions, setDisplayAdvOptions] = React.useState(odataQuery !== "" || false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let now = new Date();
  let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0))
  let end = moment(start).add(1, "days").subtract(1, "seconds")
  const [dateTime,setDateTime] = useState({
      startTime:start,
      endTime:end,
      state : false
  });  

  
  const getDateTimeRange = (startDate,endDate) =>{  
    if(startDate !=="" && endDate !== ""){
        let stDate = moment(startDate).format("YYYY-MM-DD hh:mm:ss "); 
        let edDate = moment(endDate).format("YYYY-MM-DD hh:mm:ss ");
        setStartDate(stDate);
        setEndDate(edDate); 
        let sD = moment(startDate).format("YYYY-MM-DD hh:mm:ss A Z"); 
        let eD = moment(endDate).format("YYYY-MM-DD hh:mm:ss A Z"); 
        let target = {
            name : "Date Range",
            value : `${sD}to${eD}`
        } 
       handleStates(sD,"startDate")
       handleStates(eD,"endDate")
        console.log("target",target);
        let event = {
            target : target
        }
    }    
    else{
        setStartDate("");
        setEndDate("");  
    }
}  
const dataFields = [
  {key : 'account' , _style :{'white-space' : 'nowrap'}},
  {key : 'category', _style :{'white-space' : 'nowrap'}},
  {key : 'requestId', _style :{width : '30%'}},
  {key : 'Log Date & Time Local', _style :{'white-space' : 'nowrap'}},
  {key : 'Log Date & Time UTC', _style :{'white-space' : 'nowrap'}}
];
  const enableAndDisableAdvSearch = () =>{
    if (displayAdvOptions === false) {
      setDisplayAdvOptions(true);
    }
    else{
      setDisplayAdvOptions(false);
    }
  }
  return (
    <>
      <CContainer>
        <CContainer>

        <CRow className="justify-content-center">
          <CCol className="mb-1 px-1" md="3" sm="12">
          <div className="px-0 ">
              <CLabel className="m-0">Zone</CLabel>
              <ZoneSelect />
            </div>
          </CCol>
          <CCol className="mb-1 px-1" md="3" sm="12">
            <div className="px-1">
              <CLabel className="m-0">System</CLabel>
              <SystemSelect />
            </div>
          </CCol>
          <CCol className="mb-1 px-1" md="4" sm="12">
            <CLabel className="m-0">Category</CLabel>
            <CategorySelect/>
          </CCol>
          
        </CRow>

        <CRow className="justify-content-center">
        <CCol className="mb-1 px-1" md="5" sm="12">
              <CLabel className="m-0">Client ID <span className="text-danger">*</span></CLabel>
              <div className="px-0 d-flex">
                <CInput autoComplete="off" className="hideErrorIcon" value={clientId} placeholder="Client ID" onChange={(e) => handleStates(e?.target?.value, "clientId")} />
                {clientId?.length > 0 && RenderRemoveIcon("clientId")}
              </div>
            </CCol>
          <CCol className="mb-1 px-1" md="5" sm="12">
            <CLabel className="m-0">Request ID </CLabel>
            <div className="px-0 d-flex">
              <CInput autoComplete="off"className="hideErrorIcon" value={requestId} placeholder="Request ID" onChange={(e) => handleStates(e?.target?.value, "requestId")} />
              {requestId?.length > 0 && RenderRemoveIcon("requestId")}
            </div>
          </CCol>
         
        </CRow>
        <CRow className="justify-content-center mb-2">
          <CCol className="mb-1 px-1" md="10" sm="12">
            <div>
              <CLabel className="m-0">Select Date </CLabel>
             <DatetimeRangePicker getDateTimeRange={getDateTimeRange} dateTime={dateTime}  />
            </div>
          </CCol>
        </CRow>
        

        <CRow className="mb-1 justify-content-center">    
          <CCol className="mb-1 px-1" md="10" sm="12">
            {displayAdvOptions && (
                <div className ="d-flex p-0 col-12 w-100">
                <div className="px-0 w-100 d-flex">
                  <CInput autoComplete="off" disabled={requestId?.length > 0} className="hideErrorIcon" value={odataQuery} placeholder="Odata Query" onChange={(e) => handleStates(e?.target?.value, "odataQuery")} />
                  {odataQuery?.length > 0 && RenderRemoveIcon("odataQuery")}
                </div>
                <div style={{ display: `${displayAdvOptions ? "block" : "none"}` }}><RenderFindBtn /></div>
              </div>
            )}
            <div className="d-flex">
            <CButton color="primary" variant="outline" className="mx-1 mt-1" onClick={enableAndDisableAdvSearch}> {!displayAdvOptions ? "Enable" : "Disable"} Advance Search</CButton>
            <div style={{display: `${!displayAdvOptions ? "block" : "none"}`, marginTop: "auto"}}><RenderFindBtn /></div>
            </div>
            </CCol>
        </CRow>

        </CContainer>

        {errorMessage ? (
          <div className="jumbotron text-center">
            <p className="display-5 text-danger">{errorMessage}</p>
          </div>
        ) : (
          <>
              {isLoading ? (
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Loading... <CSpinner />
                </div>
              ) : (
                <>
                  {tabelData?.length > 0 ? (
                    <div
                      className="d-flex p-2"
                      style={{
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <RefreshButton />
                      {isRecurring && <CancelButton />}
                    </div>
                  ) : ""}
                </>
              )}
            {!isLoading && tabelData?.length > 0 ? (
             <CDataTable 
              items={formatGridData(tabelData)}
              fields={dataFields}
              columnFilter
              tableFilter
              footer
              itemsPerPageSelect
              itemsPerPage={50}
              itemsPerPageOptions = {[25, 50, 100]}
              hover
              sorter
              pagination
              onRowClick={(e) => handleNavigate(e)}
              /> 
            )  : ""}
          </>
        )}
      </CContainer>
    </>
  );
}
