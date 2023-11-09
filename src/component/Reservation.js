
import Dropdown from "./Dropdown.js";
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import 'react-calendar/dist/Calendar.css';
import Date from './Date.js';
import {Link} from "react-router-dom";
import './Reservation.css';


const Reservation = ({availableTimes,occassion,setOccassion,diner,setDiner,time,setTime,date,setDate,seating,setSeating,dispatch,submitForm})=>{
    // const[occassion,setOccassion] = useState("Occassion");
    // const[diner,setDiner] = useState("No of Diner");
    // const[time,setTime] = useState("Select Time");
    // const[date,setDate] = useState("Select Date");
    const ocassion = ["Birthday","Engagement","Anniversary"];
    const numbers = [1,2,3,4,5,6,7,8,9,10];
    const handleSubmit = (e)=>{
        e.preventDefault();
        submitForm(e);
    }
    const isDisabled = () => {    
        return (
          date !== "Select Date"&&
          diner !== "No of Diner" &&
          time !== "Select Time" &&
          occassion !== "Occassion"
        );
    };
    
    return(
        <form  onSubmit={handleSubmit}>
            <header className='reservation'>
                <div className="res">
                    <div className="heading">
                        <h1>Reservation</h1>
                    </div>
                    <section className="seating" >
                            <div className="seating_option" onClick={()=> setSeating("Indoor seating") }>
                                <input type="radio" id="indoor" checked={seating==="Indoor seating"} value="Indoor seating"  name="seating"/>
                                <label htmlFor="indoor">Indoor seating</label>
                            </div>
                            <div className="seating_option" onClick={()=> setSeating("Outdoor seating")  }>
                                <input type="radio" id="outdoor" checked={seating==="Outdoor seating"} value="Outdoor seating" name="seating"/>
                                <label htmlFor="outdoor">Outdoor seating</label>
                            </div>
                            
                    </section>
                    <section className="reservation-content">
                        <Date heading={"Date"} selected={date} setSelected={setDate}  icon={faCalendar} placeholder={"Select Date"} dispatch={dispatch}/>
                        <Dropdown heading={"Number of Diner"} selected={diner} setSelected={setDiner} list={numbers} label={"Diner"} icon={faUser} placeholder={"No of Diner"}/>
                    </section>
                    <section className="reservation-content">
                        <Dropdown heading={"Occassion"} selected={occassion} setSelected={setOccassion} list={ocassion} label={""} icon={faChampagneGlasses} placeholder={"Occassion"}/>
                        <Dropdown heading={"Time"} selected={time} setSelected={setTime} list={availableTimes.availableTimes} label={"pm"} icon={faClock} placeholder={"Select Time"}/>
                        
                    </section>
                </div>
            </header>
            <div className="image_center">
                <section className="images">
                    <img src="assets\restaurant_chef.jpg"/>
                    <img src="assets\restaurant.jpg"/>
                    <img src="assets\header.jpg"/>
                </section>
            </div>
            <Link to="/confirmed1"><input type="submit" className={"reserve_button"} value="Reserve Table"/> </Link>
        </form>
    );
}

export default Reservation;