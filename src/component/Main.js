import { useReducer, useState } from 'react';
import Homepage from './Homepage';
import Reservation from "./Reservation.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import Reservation2 from "./Reservation2.js";
import MenuItem from './MenuItem.js';

const additional_bruschetta = ["Feta","Parmesan","Dressing"];

const additional_greek_salad = ["Avacado","Seeds","Dressing"];

const additional_lemon_desert = ["Extra cheese","Vanilla","Choclate"];

const brus_desc = "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Topped with chopped tomatoes, oregano and fresh bazil.";

const greek_desc = "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.";

const lemon_desc = "Our trademark dessert coming right from best chefs kitchen to fulfill cravings with the pinch of lemon in it.";

function Main({brusIngred,setBrusIngred,greekIngred,setGreekIngred,lemonIngred,setLemonIngred,brusQty,setBrusQty,greekQty,setGreekQty,lemonQty,setLemonQty}){
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
                <Route path="/bruschetta" element={<MenuItem ingred={brusIngred} setIngred={setBrusIngred} cartQty={brusQty} setCartQty={setBrusQty} additional={additional_bruschetta} heading={"Bruschetta"} price={"7.99"} desc={brus_desc} image={"assets/Bruchetta.jpg"}/>}/>
                <Route path="/greek_salad" element={<MenuItem ingred={greekIngred} setIngred={setGreekIngred} cartQty={greekQty} setCartQty={setGreekQty} additional={additional_greek_salad} heading={"Greek Salad"} price={"12.99"} desc={greek_desc} image={"assets/greek_salad.jpg"}/>}/>
                <Route path="/lemon_desert" element={<MenuItem ingred={lemonIngred} setIngred={setLemonIngred} cartQty={lemonQty} setCartQty={setLemonQty} additional={additional_lemon_desert} heading={"Lemon Desert"} price={"5.99"} desc={lemon_desc} image={"assets/lemon_dessert.jpg"}/>}/>
                
            </Routes>
        </main>
    );
}

export default Main;


<Route index element={<Homepage />} />