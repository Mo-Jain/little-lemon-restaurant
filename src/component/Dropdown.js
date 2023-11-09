import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Dropdown = ({selected,setSelected,heading,list,label,icon,placeholder})=>{
    const [isActive,setIsActive] = useState(false);
    const refOne = useRef();
    useEffect(()=>{
        document.addEventListener("keydown",hideOnEscape,true);
        document.addEventListener("click",hideOnClickOutside,true)
    })

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
            <div className="dropdown" ref={refOne}>
                <div className={`dropdown-btn ${selected!==placeholder?"selected":""}`} onClick={() =>setIsActive(!isActive)}>
                    <FontAwesomeIcon className={`icon ${selected!==placeholder?"invisible":""}`} icon={icon} style={{color: "#495E57",}} />
                    <div className={`placeholder ${selected!==placeholder?"selected":""}`}>{selected}</div>
                    <div className={`arrow ${isActive?"up":"down"} ${selected!==placeholder?"select":""}`}/>
                </div>
                
                <div className={`dropdown-content ${isActive?"active":"inactive"} ${list.length>=4?"grid":""}`} >
                    {list.map(items => {
                        return(<div className="dropdown-item" onClick={(e)=>{
                            setSelected(e.target.textContent)
                            setIsActive(!isActive)
                        }}>{items} {label}</div>)
                    })}
                </div>
                
                
                
            </div>
        </div>  
    )
}

export default Dropdown;