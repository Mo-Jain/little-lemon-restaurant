import { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './DatePicker.css'
import React from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DatePicker() {
  const [value, onChange] = useState<Value>(new Date());
  const [day,setDay] = useState("");

  return (
    <div >
          <Calendar onChange={onChange}  value={value} onClickDay={(v, e) => console.log(v)}/>
    </div>
  );
}