/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import _ from "lodash";
import { get_API_URL } from "src/helpers/common_helper";
import useFetch from "src/helpers/hooks/useFetch";
import useURL from "src/helpers/hooks/useURL";
import { CSpinner } from "@coreui/react";
export default function Details() {
  let { getURLData } = useURL();
  let [obj, setObj] = React.useState({});
  const { isLoading, resp, errorMessage, getDetails } = useFetch();
  React.useEffect(()=> setObj(resp[0] || {}) ,[resp]);
  React.useEffect(() => {
    function loadData (){
      let requestId = getURLData("requestId") || "";
      let clientId = getURLData("clientId") || "";
      let data = JSON.parse(localStorage.getItem("apiLogs")) || [];
      let result = _.filter(data, (ele) => ele?.requestId === requestId && ele?.logType === getURLData("type"));
      if (result?.length === 1) setObj(result[0]);
      else {
        if (getURLData("clientId") === "" || getURLData("requestId") === "" || getURLData("type") === "") return;
        else getDetails(get_API_URL(getURLData("zone"), getURLData("type"))({clientId, requestId}).replaceAll (" ", "+"));
      }
    }
    loadData();
  }, []);
  if(_.isEmpty(obj)) return <div className="jumbotron text-center"><h1 className="display-4 text-danger">No Data found</h1></div>;
  return (
    <>
      { !isLoading ? (
        <div className="container mb-2">
          <h3 className="text-center">{`${obj?.logType} Details`}</h3>
          <div className="row">
            <div className=" col-md-6">
              <label className="fw-semibold nowrap">Client Id</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.clientId}
              />
            </div>
            <div className=" col-md-6">
              <label className="fw-semibold nowrap">Application Id</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.applicationId}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label className="fw-semibold nowrap">Customer Account</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.customerAccount}
              />
            </div>
            <div className=" col-md-4">
              <label className="fw-semibold nowrap">Environment</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.environment}
              />
            </div>
            <div className=" col-md-4">
              <label className="fw-semibold nowrap">Version</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.version}
              />
            </div>
          </div>
          <div className="row">
            <div className=" col-md-6">
              <label className="fw-semibold nowrap">Category</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.category}
              />
            </div>
            <div className=" col-md-6">
              <label className="fw-semibold nowrap">Request Id</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.requestId}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">Request URL</label>
               <textarea
                className="form-control"
                disabled
                readOnly
                value={obj?.requestUrl || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">Request Type</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.requestType}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">Log Type</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.logType}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">Request Body</label>
               <textarea
                className="form-control"
                disabled
                readOnly
                value={obj?.requestBody || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label className="fw-semibold nowrap">Thread Name</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.threadName}
              />
            </div>
            <div className="col-md-4">
              <label className="fw-semibold nowrap">IP Address</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.ipAddress}
              />
            </div>
            <div className="col-md-4">
              <label className="fw-semibold nowrap">Machine Name</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.machineName}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">Operating System</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.operatingSystem}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">Reference 1 </label>
               <textarea
                className="form-control"
                disabled
                readOnly
                value={obj?.reference1 || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">Reference 2 </label>
               <textarea
                className="form-control"
                disabled
                readOnly
                value={obj?.reference2 || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">Reference 3 </label>
               <textarea
                className="form-control"
                disabled
                readOnly
                value={obj?.reference3 || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">Reference 4 </label>
               <textarea
                className="form-control"
                disabled
                readOnly
                value={obj?.reference4 || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">Reference 5 </label>
               <textarea
                className="form-control"
                disabled
                readOnly
                value={obj?.reference5 || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label className="fw-semibold nowrap">Log Date and Time Local</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.logDateTimeLocal}
              />
            </div>
            <div className="col-md-6 ">
              <label className="fw-semibold nowrap">Log Date and Time UTC</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.logDateTimeUtc}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 ">
              <label className="fw-semibold nowrap">Status Message</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.statusMessage}
              />
            </div>
            <div className="col-md-6 ">
              <label className="fw-semibold nowrap">Status Code</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.statusCode}
              />
            </div>
          </div>

          {obj?.logType === "Exception" ? (
            <>
              <div className="row">
                <div className="col ">
                  <label className="fw-semibold nowrap">Exception Type</label>
                   <input
                    className="form-control"
                    disabled
                    readOnly
                    value={obj?.exceptionType}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col ">
                  <label className="fw-semibold nowrap">Source Class</label>
                   <textarea
                    className="form-control"
                    disabled
                    readOnly
                    value={obj?.sourceClass || ""}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 ">
                  <label className="fw-semibold nowrap">Error Code</label>
                   <input
                    className="form-control"
                    disabled
                    readOnly
                    value={obj?.errorCode}
                  />
                </div>
                <div className="col-md-6 ">
                  <label className="fw-semibold nowrap">Error Category</label>
                   <input
                    className="form-control"
                    disabled
                    readOnly
                    value={obj?.errorCategory}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="fw-semibold nowrap">Stack Track</label>
                   <textarea
                    className="form-control"
                    disabled
                    readOnly
                    value={obj?.stackTrace || ""}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="fw-semibold nowrap">Exception Message</label>
                   <textarea
                    className="form-control"
                    disabled
                    readOnly
                    value={obj?.exceptionMessage || ""}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="fw-semibold nowrap">Inner Exception</label>
                   <textarea
                    className="form-control"
                    disabled
                    readOnly
                    value={obj?.innerException || ""}
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">Response</label>
               <textarea
                className="form-control"
                disabled
                readOnly
                value={obj?.response || ""}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 ">
              <label className="fw-semibold nowrap">Partition Key</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.partitionKey}
              />
            </div>
            <div className=" col-md-6">
              <label className="fw-semibold nowrap">Row Key</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.rowKey}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label className="fw-semibold nowrap">Machine Mac Id</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.machineMacId}
              />
            </div>
            <div className="col-md-6 ">
              <label className="fw-semibold nowrap">Timestamp</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.timestamp}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="fw-semibold nowrap">E Tag</label>
               <input
                className="form-control"
                disabled
                readOnly
                value={obj?.eTag}
              />
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="" 
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CSpinner />
        </div>
      )}
        {errorMessage ? <>
          <div className="jumbotron text-center">
            <h1 className="display-4 text-danger">{errorMessage}</h1>
          </div>
        </> : ""}
    </>
  );
}
