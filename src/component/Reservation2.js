import './Reservation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Reservation2  = function({occassion,diner,time,date,seating}){
    const isOccassion = occassion==="Occassion";
    const isDate = date==="Select Date";
    const isTime = time==="Select Time";
    const isDiner = diner==="No of Diner";
    const isSeating = seating==="Select seating";

    return (
        <>
            <header className='reservation' >
                <div className="res" id='content'>
                    <div className='content' id='left'>
                        <div className='input'>
                            <p>*First Name</p>
                            <input type="text" placeholder='First Name'/>
                        </div>
                        <div className='input'>
                            <p>*Email</p>
                            <input type="text" placeholder='Email'/>
                        </div>
                    </div>
                    
                    <div className='content' id='right'>
                        <div className='input'>
                            <p>*Last Name</p>
                            <input type="text" placeholder='Last Name'/>
                        </div>
                        <div className='input'>
                            <p>*Phone Number</p>
                            <input type="text" placeholder='Phone Number'/>
                        </div>
                    </div>
                    <div className='states'>
                        <div className='states_link'>
                            <Link to="/booking"><div className={`state ${isDate?"red":""}`}>
                                <FontAwesomeIcon className={`icon ${isDate?"red":""}`} icon={faCalendar}  />
                                <div className='state_label'>
                                    {isDate && <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />}
                                    <span>{date}</span>
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
                        <div className={`state_label ${isSeating?"red":""}`} id='seating'>
                            {isSeating && <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' color='red'/>}
                            <p className={`seating_state ${isOccassion?"red":""}`}>{seating}</p>
                        </div>
                        <div className="seating_option" >
                            <input type="radio" id="indoor" value="Indoor seating"  name="seating"/>
                            <label htmlFor="indoor">You agree to our friendly policy</label>
                        </div>
                    </div>
                    <div>
                        <p>Special Request</p>
                        <textarea placeholder='Comment'/>
                    </div>
                
                </div>
            </header>
            <div className="image_center">
            <section className="images">
                <img src="assets\pasta.jpg"/>
                <img src="assets\grilled_fish.jpg"/>
                <img src="assets\Mario-adrian1.jpg"/>
            </section>
        </div>
        <button className="reserve_button">Create Reservation</button>
        </>
    );
}

export default Reservation2;