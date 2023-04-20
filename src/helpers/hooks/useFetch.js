/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { CButton } from "@coreui/react";
import axios from "axios";
let recursion = true;
export default function useFetch() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRecurring, setIsRecurring] = React.useState(recursion);
  const [resp, setResp] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [token , setToken] = React.useState('');
  const AIMS360TokenURL = 'https://dev-runwayauth-west1.aims360runway.com/api/getLoggingToken/ApiLogsSecret';
  const RunwayTokenURL =  'https://dev-runwayauth-west1.aims360runway.com/api/getLoggingToken/apilogsSecret-runway';
  const CancelButton = () => <CButton color="secondary" style={{display: recursion ? "block" : "none"}} onClick={()=> {recursion = false}}>{"Cancel"}</CButton>
const system = JSON.parse(localStorage.getItem('System'));
 
  const SetHeaders = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
useEffect(()=>{
  getToken();
},[system])
 const GetService =  (url) => axios.get(url, SetHeaders());

const getToken =  () => {
  const SetTokenHeaders = () => ({
    headers: {
      'x-functions-key' : 'NkR8QwV_qyvIWtz1xkrEGvdeX5LuaCxIL1RCM8NKW2NkAzFusmu6EQ==',
    },
  });
  if (system === 'AIMS360') {
   axios.get(AIMS360TokenURL , SetTokenHeaders()).then(res => setToken(res.data))
  return token
  }
  else{
     axios.get(RunwayTokenURL , SetTokenHeaders()).then(res => setToken(res.data))
    return token
  }
}
  const handleNextLink = (link) => GetService(link).then(async (res) => {
        if (res?.status === 200 && res?.data?.value?.length > 0) {
          if (res?.data?.message?.toLowerCase() === "network error") setErrorMessage(res?.data?.message);
          const respVal = res?.data?.value || [];
          if (res?.data?.["@odata.nextLink"] && recursion)  {setIsRecurring(true); handleNextLink(res?.data?.["@odata.nextLink"])}
          else setIsRecurring(false);
          setResp((prevState) => [...prevState, ...respVal]);
        }else setIsRecurring(false);
      }).catch((e) => setErrorMessage(e?.response?.data?.error?.message));
  const getDetails = (url) => {
    setResp([]);
    setIsLoading(true);
    setErrorMessage("");
    recursion = true;
    GetService(url).then(async (res) => {
        if (res?.status === 200 && res?.data?.value?.length > 0) {
          if (res?.data?.message?.toLowerCase() === "network error") setErrorMessage(res?.data?.message);
          const respVal = res?.data?.value || [];
          setResp((prevState) => [...prevState, ...respVal]);
          if (res?.data?.["@odata.nextLink"]) {setIsRecurring(true); handleNextLink(res?.data?.["@odata.nextLink"]);}
          else setIsRecurring(false);
        }else{
          setErrorMessage("No Data Found");
          setIsRecurring(false);
          recursion = false;
          setIsLoading(false)  
        }
      }).catch((e) => {
        setResp([]);
        recursion = false;
        setErrorMessage(e?.response?.data?.error?.message);
      }).finally(() => setIsLoading(false));
  };
  return { isLoading, isRecurring, resp, errorMessage, getDetails, CancelButton, GetService};
}
