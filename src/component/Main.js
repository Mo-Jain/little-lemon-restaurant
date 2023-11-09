import { useReducer, useState } from 'react';
import Homepage from './Homepage';
import Reservation from "./Reservation.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import Reservation2 from "./Reservation2.js";

function Main(){
    const seededRandom = function (seed) {
        var m = 2**35 - 31;
        var a = 185852;
        var s = seed % m;
        return function () {
            return (s = s * a % m) / m;
        };
    }

    const fetchAPI = function(date) {
        let result = [];
        let random = seededRandom(date.getDate());

        for(let i = 5; i <= 11; i++) {
            if(random() < 0.5) {
                result.push(i + ':00');
            }
            if(random() >= 0.5) {
                result.push(i + ':30');
            }
        }
        return result;
    };
    const submitAPI = function(formData){
        return true;
    }
    const initialState = {availableTimes:fetchAPI(new Date())};
    const [state,dispatch] = useReducer(updateTimes,initialState);
    const [occassion,setOccassion] = useState("Occassion");
    const [diner,setDiner] = useState("No of Diner");
    const [time,setTime] = useState("Select Time");
    const [date,setDate] = useState("Select Date");
    const [seating,setSeating] = useState("Select seating");

    function updateTimes(state,date){
        return {availableTimes:fetchAPI(new Date(date))} 
    }

    const navigate = useNavigate();
    function submitForm(formData){
        if(submitAPI(formData)){
            navigate("/confirmed1");
        }
    }
    

    const[selected,setSelected] = useState("Occassion");
    
    return (
        <main>         
            <Routes>
                <Route index element={<Homepage />} />
                {/* <Route path="/confirmed" element={<Booking availableTimes={state} dispatch={dispatch} submitForm={submitForm}/>} /> */}
                <Route path="/booking" element={<Reservation availableTimes={state} dispatch={dispatch} submitForm={submitForm} date={date} setDate={setDate} time={time} setTime={setTime} seating={seating} setSeating={setSeating} occassion={occassion} setOccassion={setOccassion} diner={diner} setDiner={setDiner}/> } />
                <Route path="/confirmed1" element={<Reservation2 date={date} setDate={setDate} time={time} setTime={setTime} seating={seating} setSeating={setSeating} occassion={occassion} setOccassion={setOccassion} diner={diner} setDiner={setDiner}/> } />
            </Routes>
        </main>
    );
}

export default Main;


<Route index element={<Homepage />} />