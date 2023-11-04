import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './DatePicker.css'
import React from 'react';
import dateFormat from "dateformat";



export default function DatePicker({value,onChange}) {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  
 
  return (
    <div >
          <Calendar onChange={(value,event)=>onChange(value)} formatShortWeekday={(locale, date) => dateFormat(date,'ddd')} prev2Label={null} next2Label={null}  value={value} />

          
    </div>
  );
}

