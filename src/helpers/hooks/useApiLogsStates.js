/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import _ from "lodash";
import { CButton, CSpinner } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useURL from "src/helpers/hooks/useURL";
import useFetch from "src/helpers/hooks/useFetch";
import ASelect from "../components/ASelect/ASelect";
import { get_API_URL, switchFnc, TYPE } from "src/helpers/common_helper";
import { useState } from "react";
export default function useApiLogsStates(type = "") {
  const { getURLData, setURLData } = useURL();
  const {
    isLoading,
    isRecurring,
    resp,
    errorMessage,
    getDetails,
    CancelButton,
    GetService,
  } = useFetch();
  // State Variables
  let stDate = new Date(new Date().setDate(new Date().getDate() - 1));
  let edDate = new Date(new Date());
  const [zone, setZone] = React.useState(getURLData("zone") || "West");
  const [system, setSystem] = React.useState(getURLData("system") || "select");
  const [clientId, setClientId] = React.useState(getURLData("clientId") || "");
  const [requestId, setRequestId] = React.useState(
    getURLData("requestId") || ""
  );
  const [category, setCategory] = React.useState(getURLData("category") || "");
  const [odataQuery, setOdataQuery] = React.useState(
    getURLData("odataQuery") || ""
  );
  const [startDate, setStartDate] = React.useState(
    getURLData("startDate") || stDate
  );
  const [endDate, setEndDate] = React.useState(getURLData("endDate") || edDate);
  const [tabelData, setTabelData] = React.useState([]);
  const[loading,setLoading]=useState(false);
  const [categoryOptions,SetCategoryOptions]=useState([]);
  React.useEffect(() => setTabelData(resp), [resp]);
  React.useEffect(() => localStorage.setItem('System' , JSON.stringify(system)),[system]);
  // Helpers
  const zoneOptions = () => {
    let options = [];
    for (let zon in TYPE?.ZONE)
      options?.push({ label: TYPE?.ZONE?.[zon], value: zon });
    return options;
  };
  const systemOptions = () => {
    let options = [];
    for (let sys in TYPE?.SYSTEM)
      options?.push({ label: TYPE?.SYSTEM?.[sys], value: sys });
    return options;
  };
  useEffect(() => {
    setLoading(true)
    let options = [];
   let Url = zone.toLowerCase() === "west" ? " https://apiwest.aims360.rest/exceptionmanagement/odata/v1/categories" :
                                              " https://apieast.aims360.rest/exceptionmanagement/odata/v1/categories"
    GetService(Url).then(res =>{
      if (res?.status === 200) {
        res?.data?.value?.forEach(e => {
          options.push({label:e?.categoryName, value:e?.categoryName});
        });
      }
      else{
        setLoading(false);
      }
    })
    SetCategoryOptions(options);
    setLoading(false);
  }, [system, zone]);
  function handleSubmit(e) {
    e?.preventDefault();
    if (!type) return console.log("Hook called Without any type defined"); // Possibly avoid danger
    setTabelData([]);
    if (!clientId) return;
    getDetails(
      get_API_URL(
        zone,
        type
      )({
        clientId,
        requestId,
        category,
        timestamp: { startDate, endDate },
        odataQuery,
      }).replaceAll(" ", "+")
    );
  }
  let stateChangeFnc = {
    zone: (val) => {
      setZone(val);
      setURLData("zone", val);
    },
    system: (val) => {
      setSystem(val);
      setURLData("system", val);
    },
    clientId: (val) => {
      setClientId(val);
      setURLData("clientId", val);
    },
    requestId: (val) => {
      setRequestId(val);
      setURLData("requestId", val);
    },
    category: (val) => {
      setCategory(val);
      setURLData("category", val);
    },
    odataQuery: (val) => {
      setOdataQuery(val);
      setURLData("odataQuery", val);
    },
    startDate: (val) => {
      setStartDate(val);
      setURLData("startDate", val || "");
    },
    endDate: (val) => {
      setEndDate(val);
      setURLData("endDate", val || "");
    },
    _default: () => {
      return;
    },
  };
  const handleNavigate = (e) => {
    let data =
      _.filter(tabelData, (dat) => dat?.requestId === e?.requestId) || [];
    localStorage.setItem("apiLogs", JSON.stringify(data));
    let obj = data[0] || {};
    window
      .open(
        `/#/details?type=${obj?.logType}&zone=${getURLData("zone")}&clientId=${
          obj?.clientId
        }&requestId=${obj?.requestId}`,
        "_blank"
      )
      ?.focus();
  };
  const handleStates = (val, type = "") => {
    switchFnc(stateChangeFnc)(val, type);}
  // Commmon Components
  const RefreshButton = () => (
    <CButton
      color="primary"
      disabled={isLoading || isRecurring}
      onClick={handleSubmit}
      className={`${isRecurring ? "mx-2" : "m-0"}`}
    >
      {isLoading || isRecurring ? (
        <CSpinner component="span" size="sm" aria-hidden="true" />
      ) : (
        "Refresh"
      )}
    </CButton>
  );
  const ZoneSelect = () => (
    <ASelect
      label="Zone"
      value={{ label: zone, value: TYPE?.ZONE[zone] }}
      options={zoneOptions()}
      onChange={(e) => {
        handleStates(e?.label, "zone");
      }}
    />
  );
  const SystemSelect = () => (
    <ASelect
      label="System"
      value={{ label: system, value: TYPE?.SYSTEM[system] }}
      options={systemOptions()}
      onChange={(e) => handleStates(e?.label, "system")}
    />
  );
  const CategorySelect = () => (
    <ASelect
      _default={'Select Categorys'}
      label="Category"
      value={{ label: category, value: TYPE?.SYSTEM[category] }}
      options={categoryOptions}
      onChange={(e) => handleStates(e?.label, "category")}
      isLoading={loading}
    />
  );
  const RenderFindBtn = () => (
    <CButton
      color="primary"
      size="md"
      className="d-flex ml-2 align-items-center justify-content-center btn-block"
      onClick={handleSubmit}
      disabled={isLoading}
      style={{ height: "33px", width: "81px" }}
    >
      {
        isLoading ? (
          <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
        ) : (
          "Search"
        ) /*<FontAwesomeIcon className="" icon={faSearch} />*/
      }
    </CButton>
  );
  const RenderRemoveIcon = (state) => (
    <i
      className="fa fa-times fa-1x text-danger py-2"
      role="button"
      style={{ marginLeft: "-14px", marginTop: "2px" }}
      onClick={() => handleStates("", state)}
    ></i>
  );
  return {
    // variables
    isLoading,
    isRecurring,
    clientId,
    requestId,
    category,
    endDate,
    startDate,
    odataQuery,
    tabelData,
    errorMessage,
    // Functions
    handleStates,
    handleNavigate,
    // Components
    ZoneSelect,
    SystemSelect,
    CategorySelect,
    RenderFindBtn,
    RenderRemoveIcon,
    RefreshButton,
    CancelButton,
  };
}
