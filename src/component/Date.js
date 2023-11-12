import DatePicker from "./DatePicker.js";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";  
import dateFormat from "dateformat";


const Date = ({selected,setSelected,icon,placeholder,heading,dispatch})=>{
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
        if(isActive && def){
            setSelected(days[value.getDay()]+','+months[value.getMonth()]+' '+dateFormat(value,'d'));
        }
    })
   
    
    useEffect(()=>{
        document.addEventListener("keydown",hideOnEscape,true);
        document.addEventListener("click",hideOnClickOutside,true)
    })

    const hideOnEscape = (e) =>{
        if(e.key==="Escape"){
            setIsActive(false);
            setDef(true);
        }
        
    }
    const hideOnClickOutside  =(e) =>{
        if(refOne.current && !refOne.current.contains(e.target)){
            setIsActive(false);
        }
        setDef(true);
    }
    return (
        <div className="dropdown-select">
            <p className="heading">{heading}</p>
            <div className="dropdown" ref={refOne}>
                <div className={`dropdown-btn ${selected!==placeholder?"selected":""}`} onClick={() =>{
                    setIsActive(!isActive);
                }}>
                    <FontAwesomeIcon className="icon" icon={icon} style={{color: "#495E57",}} />
                    <div className={`placeholder ${selected!==placeholder?"date-selected":""}`}>{selected}</div>
                    <div className={`arrow ${isActive?"up":"down"} ${selected!==placeholder?"select":""}`}/>
                </div>
                
                <div className={`dropdown-content ${isActive?"active":"inactive"}`} id="date" >
                    <DatePicker  value={value} onChange={onChange} dispatch={dispatch}/>
                </div>
            </div>
            
        </div>  
    )
}

export default Date;
