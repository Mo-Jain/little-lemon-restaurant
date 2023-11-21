import './Reservation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import {  useState } from 'react';
import checkedIcon from './img/checked.png'
import uncheckedIcon from './img/unchecked.png'

const Reservation2  = function({occassion,diner,time,date,seating}){
    const isOccassion = occassion==="Occassion";
    const isDate = date==="Select Date";
    const isTime = time==="Select Time";
    const isDiner = diner==="No of Diner";
    const isSeating = seating==="Select seating";
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [error,setError] = useState(false);
    
    const [checked,setChecked] = useState(false);
    const [errorMesaage,setErrorMessage] = useState("");
    const [displayMsg,setDisplayMsg] = useState(false);

    // const clearForm = () =>{
    //     setDate("Select Date");
    //     setDiner("No of Diner");
    //     setOccassion("Occassion");
    //     setTime("Select Time");
    //     setSeating("Select seating");
    //     setFirstName("");
    //     setEmail("");
    //     setLastName("");
    //     setPhone("");
    // }

    const navigate = useNavigate();
    const handleClick = () => setChecked(!checked);

    const isValid = () => {
        return (
            firstName &&
            email &&
            phone.length >= 8 &&
            lastName &&
            !isDate &&
            !isDiner &&
            !isOccassion &&
            !isSeating &&
            !isTime &&
            checked 
        )
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        setError(true);
        if(isValid()){
            navigate("/card_detail");
        }else{
            
            setErrorMessage("Please Enter required fields");
            if(!checked){
                if(errorMesaage){
                    setErrorMessage("Please agree to our policy");
                }else{
                    setErrorMessage("Please Enter required fields & agree to our policy");
                }
            }
            
            setDisplayMsg(true);
            setTimeout(()=>{
                setDisplayMsg(false);
                setErrorMessage("");
            },1500)
        }
        
    }

    return (
        <form className="reservation_form" >
            <header className='reservation' >
                <div className="res" id='content'>
                    
                    <div className='content' id='left'>
                        <div className='input'>
                            <p>*First Name</p>
                            <input type="text" className={`invalid ${error && !firstName?"border":""}`} value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder='First Name'/>
                            {error && !firstName && <div>
                                <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />
                                <span className={`invalid ${firstName?"red":""}`}>First name required</span>
                            </div>}
                        </div>
                        <div className='input'>
                            <p>*Last Name</p>
                            <input type="text" value={lastName} className={`invalid ${error && !lastName?"border":""}`} onChange={(e)=>setLastName(e.target.value)} placeholder='Last Name'/>
                            {error && !lastName &&<div>
                                <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />
                                <span className={`invalid ${!lastName?"red":""}`}>Last name required</span>
                            </div>}
                        </div>
                        
                    </div>
                    
                    <div className='content' id='right'>
                        <div className='input'>
                            <p>*Email</p>
                            <input type="text" className={`invalid ${error && !email?"border":""}`} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
                            {error && !email &&<div>
                                <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />
                                <span className={`invalid ${email?"red":""}`}>Email required</span>
                            </div>}
                        </div>
                        <div className='input'>
                            <p>*Phone Number</p>
                            <div id="phone" className={`invalid ${error && !phone?"phone-border":"no-border"} phone`}>
                                <select name="Country" className="phone_country">
                                    <option value="India">IND</option>
                                    <option value="USA">US</option>
                                    <option value="England">ENG</option>
                                    <option value="South Africa">SA</option>
                                    <option value="Australia">AUS</option>
                                </select>
                                <input type="text" value={phone}  onChange={(e)=>setPhone(e.target.value)} placeholder='Phone Number'/>
                            </div>
                            {error && !(phone.length >= 8) &&<div>
                                    <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />
                                    <span className={`invalid ${phone?"red":""}`}>10 Digit phone number required</span>
                                </div>}
                        </div>
                    </div>
                    <div id="content1"> 
                        <div className='states'>
                            <div className='states_link'>
                                <Link to="/booking"><div className={`state ${isDate?"red":""}`}>
                                    <FontAwesomeIcon className={`icon ${isDate?"red":""}`} icon={faCalendar}  />
                                    <div className='state_label'>
                                        {isDate && <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />}
                                        <span>{isDate?date:date.split(",")[1]}</span>
                                    </div>
                                </div></Link>
                                <Link to="/booking"><div className={`state ${isDiner?"red":""}`}>
                                    <FontAwesomeIcon className={`icon ${isDiner?"red":""}`} icon={faUser}  />
                                    <div className='state_label'>
                                        {isDiner && <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />}
                                        <span>{diner}</span>
                                    </div>
                                </div></Link>
                            
                                <Link to="/booking"><div className={`state ${isOccassion?"red":""}`}>
                                    <FontAwesomeIcon className={`icon ${isOccassion?"red":""}`} icon={faChampagneGlasses}  />
                                    <div className='state_label'>
                                        {isOccassion && <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />}
                                        <span>{occassion}</span>
                                    </div>
                                </div></Link>
                                <Link to="/booking"><div className={`state ${isTime?"red":""}`}>
                                    <FontAwesomeIcon className={`icon ${isTime?"red":""}`} icon={faClock}  />
                                    <div className='state_label'>
                                        {isTime && <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />}
                                        <span>{time}</span>
                                    </div>
                                </div></Link>
                            </div>
                            <Link to="/booking"><div className={`state_label ${isSeating?"red":""}`} id='seating'>
                                {isSeating && <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' color='red'/>}
                                <p className={`seating_state ${isSeating?"red":""}`}>{seating}</p>
                            </div></Link>
                        </div>
                    </div>
                    <div className='comment'>
                            <p>Special Request(Optional)</p>
                            <textarea placeholder='Comment'/>
                    </div>

                    <div className="seating_option" >
                            {checked?
                            <img src={checkedIcon} onClick={handleClick} id='radioIcon'/>
                            :
                            <img src={uncheckedIcon} onClick={handleClick} id='radioIcon'/>
                            }
                            <span onClick={handleClick}>You agree to our friendly policy</span>
                    </div>
                
                </div>
            </header>
            
            {displayMsg && <div className="error-popup">
                <p><strong> {errorMesaage}</strong></p>
            </div>}
            <div className="image_center">
            <section className="images">
                <img src="assets\pasta.jpg"/>
                <img src="assets\grilled_fish.jpg"/>
                <img src="assets\Mario-adrian1.jpg"/>
            </section>
            </div>
            <button className={`reserve_button `} onClick={handleSubmit} >Create Reservation </button>
        </form>
    );
}

export default Reservation2;

// if(isDate){
            //     if(!errorMesaage){
            //         setErrorMessage("date");
            //     }else{
            //         setErrorMessage(errorMesaage+", date");
            //     }
            // }
            // if(isDiner){
            //     if(!errorMesaage){
            //         setErrorMessage("number of dinner");
            //     }else{
            //         setErrorMessage(errorMesaage+", number of dinner");
            //     }
            // }
            // if(isOccassion){
            //     if(!errorMesaage){
            //         setErrorMessage("occassion");
            //     }else{
            //         setErrorMessage(errorMesaage+", occassion");
            //     }
            // }
            // if(isSeating){
            //     if(!errorMesaage){
            //         setErrorMessage("seating");
            //     }else{
            //         setErrorMessage(errorMesaage+", seating");
            //     }
            // }   
            // if(isTime){
            //     if(!errorMesaage){
            //         setErrorMessage("time");
            //     }else{
            //         setErrorMessage(errorMesaage+", time");
            //     }
            // }
            // if(!(firstName && email && phone.length >= 8 && lastName)){
            //     if(errorMesaage){
            //         setErrorMessage("required fields");
            //     }else{
            //         setErrorMessage(errorMesaage+"& required fields");
            //     }
            // }