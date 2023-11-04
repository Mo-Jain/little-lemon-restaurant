import DatePicker from "./DatePicker.js";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";  
import dateFormat from "dateformat";


const Date = ({selected,setSelected,icon,placeholder,heading})=>{
    var today = new window.Date();
    const [isActive,setIsActive] = useState(false);
    const [value,onChange] = useState(today);
    // const [date,setDate] =useState(days[value.getDay()]+','+months[value.getMonth()]+' '+dateFormat(value,'d'));
    const refOne = useRef(null);
    const [def,setDef] = useState(false);
   
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    
    var months =   ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August", 
    "September",
    "October",
    "November",
    "December",
    ];
    
    useEffect(()=>{
        document.addEventListener("keydown",hideOnEscape,true);
        document.addEventListener("click",hideOnClickOutside,true);
        // onChange(today);
    })

    useEffect(()=>{
        if(def){
            setSelected(days[value.getDay()]+','+months[value.getMonth()]+' '+dateFormat(value,'d'));
        }
    },[value])

    const hideOnEscape = (e) =>{
        if(e.key==="Escape"){
            setIsActive(false);
        }
        
    }
    const hideOnClickOutside  =(e) =>{
        if(refOne.current && !refOne.current.contains(e.target)){
            setIsActive(false);
        }
        
    }
    return (
        <div className="dropdown-select">
            <p className="heading">{heading}</p>
            <div className="dropdown">
                <div className={`dropdown-btn ${selected!==placeholder?"selected":""}`} onClick={() =>{
                    setIsActive(!isActive);
                    setDef(true);
                }}>
                    <FontAwesomeIcon className="icon" icon={icon} style={{color: "#495E57",}} />
                    <div>{selected}</div>
                    <div className={`arrow ${isActive?"up":"down"} ${selected!==placeholder?"select":""}`}/>
                </div>
                {isActive &&
                <div className={`dropdown-content `} ref={refOne}>
                    <DatePicker  value={value} onChange={onChange}/>
                </div>
                
                }
            </div>
        </div>  
    )
}

export default Date;
