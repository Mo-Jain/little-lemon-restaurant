import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Dropdown = (props)=>{
    const[selected,setSelected] = useState(props.placeholder);
    return (
        <div className="dropdown-select">
            <p className="heading">{props.heading}</p>
            <DropdownButton selected={selected} setSelected={setSelected} list={props.list} label={props.label} icon={props.icon} placeholder={props.placeholder}/>
        </div>  
    );
}

const DropdownButton = ({selected,setSelected,list,label,icon,placeholder})=>{
    const [isActive,setIsActive] = useState(false);
    return (
        <div>
            <div className="dropdown">
                <div className={`dropdown-btn ${selected!==placeholder?"selected":""}`} onClick={() =>setIsActive(!isActive)}>
                    <FontAwesomeIcon className="icon" icon={icon} style={{color: "#495E57",}} />
                    <div>{selected}</div>
                    <div className={`arrow ${isActive?"up":"down"} ${selected!==placeholder?"select":""}`}/>
                </div>
                {isActive ? 
                <div className={`dropdown-content ${list.length>=4?"grid":""}`}>
                    {list.map(items => {
                        return(<div className="dropdown-item" onClick={(e)=>{
                            setSelected(e.target.textContent)
                            setIsActive(!isActive)
                        }}>{items} {label}</div>)
                    })}
                </div>
                :
                ""
                }
                
            </div>
        </div>  
    )
}

export default Dropdown;