
import Dropdown from "./Dropdown";
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import 'react-calendar/dist/Calendar.css';
import Date from './Date.js';
import { useState } from "react";
import { Routes, Route, useNavigate ,Link} from "react-router-dom";
import Reservation2 from "./Reservation2";
import './Reservation.css';

//occassion,setOccassion,availableTimes,diner,setDiner,time,setTime,date,setDate

const ConfirmedBooking = ({availableTimes,occassion,setOccassion,diner,setDiner,time,setTime,date,setDate,seating,setSeating})=>{
    // const[occassion,setOccassion] = useState("Occassion");
    // const[diner,setDiner] = useState("No of Diner");
    // const[time,setTime] = useState("Select Time");
    // const[date,setDate] = useState("Select Date");
    const ocassion = ["Birthday","Engagement","Anniversary"];
    const numbers = [1,2,3,4,5,6,7,8,9,10];
    
    return(
        <>
        {/* <Routes>
            <Route path="/confirmed1" element={<Reservation2 date={date} time={time} occassion={occassion} diner={diner}/> } />
        </Routes> */}
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
                <Date heading={"Date"} selected={date} setSelected={setDate}  icon={faCalendar} placeholder={"Select Date"}/>
                <Dropdown heading={"Number of Diner"} selected={diner} setSelected={setDiner} list={numbers} label={"Diner"} icon={faUser} placeholder={"No of Diner"}/>
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
        <Link to="/confirmed1"><button className="reserve_button">Reserve Table</button></Link> 
        </>
    );
}

export default ConfirmedBooking;