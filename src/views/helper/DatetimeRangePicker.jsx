import React, { useEffect, useState } from "react";
import moment from "moment";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import {CInput} from '@coreui/react';
// import "./SyncData.scss";
import { useSelector } from "react-redux";

const DatetimeRangePicker = ({getDateTimeRange, dateTime}) => { 
  const [state, setState] = useState({
    start: dateTime?.startTime,
    end: dateTime?.endTime,
    secondDisplay: false,
  }); 
  const [dateVal, setDateVal] =  useState('');
  const darkMode = useSelector((state) => state.darkMode);
  useEffect(()=>{ 
    if(dateTime?.state){
      let value = `${dateTime?.startTime.format("MM-DD-YYYY hh:mm a")} - ${dateTime?.endTime.format("MM-DD-YYYY hh:mm a")}`;
      setDateVal(value);
      applyCallback(dateTime?.startTime, dateTime?.endTime)
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dateTime])  
  
  const applyCallback = (startDate, endDate) => {
    setState({
      start: startDate,
      end: endDate,
    });   
     let value = `${startDate.format("MM-DD-YYYY hh:mm a")} - ${endDate.format("MM-DD-YYYY hh:mm a")}`;
     setDateVal(value)
     getDateTimeRange(startDate._d,endDate._d)    
  };

  //Default to select DateTime range
  let ranges = {
    "Today Only": [moment(dateTime?.startTime), moment(dateTime?.endTime)],
    "Yesterday Only": [
      moment(dateTime?.startTime).subtract(1, "days"),
      moment(dateTime?.endTime).subtract(1, "days"),
    ],
    "3 Days": [moment(dateTime?.startTime).subtract(3, "days"), moment(dateTime?.endTime)],
    "1 Week": [moment(dateTime?.startTime).subtract(7, "days"), moment(dateTime?.endTime)],
  };
  //DateTime Format to display in inputbox
  let local = {
    format: "MM-DD-YYYYThh:mm a",
    sundayFirst: false,    
  };
  const rangeCallback = (index, value) => {
    console.log(index, value);
  }
  
  return (
    <div>
      <DateTimeRangeContainer
        start={state.start}
        end={state.end}
        local={local}
        applyCallback={applyCallback} 
        rangeCallback={rangeCallback}      
        smartMode 
        twelveHoursClock
        darkMode = {darkMode ? true : false}
        ranges = {ranges}
        autoApply
        autoPosition={true}
      >
        <CInput  id="dateTime"  autoComplete="off" type="text" placeholder="Select Date" value={dateVal} onChange = {(e)=>{ console.log("")}}/>
        { dateVal === "" }
      </DateTimeRangeContainer>
    </div>
  );
};
export default DatetimeRangePicker;
