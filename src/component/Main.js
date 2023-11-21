import { useReducer, useState } from 'react';
import Homepage from './Homepage';
import Reservation from "./Reservation.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import Reservation2 from "./Reservation2.js";
import MenuItem from './MenuItem.js';
import AddToCart from './AddToCart.js';
import Menu from './Menu';
import CreditCard from './CreditCard.js';


const brus_desc = "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Topped with chopped tomatoes, oregano and fresh bazil.";

const greek_desc = "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.";

const lemon_desc = "Our trademark dessert coming right from best chefs kitchen to fulfill your cravings with delicious desert the pinch of lemon in it which also takes care of your health too. ";

const grilled_desc = "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.";

const pasta_desc = "Our Special pasta made with exclusive recipe will make your snack time hunger with our trademark ingredients along with love."

const description = [greek_desc,brus_desc,grilled_desc,pasta_desc,lemon_desc];

function Main({ingred_pasta,ingred_grilled_fish,grilledIngred,setGrilledIngred,pastaIngred,setPastaIngred,grilledQty,setGrilledQty,pastaQty,setPastaQty,loggedIn,setLoginOpen,ingred_bruschetta,ingred_greek_salad,ingred_lemon_desert,brusIngred,setBrusIngred,greekIngred,setGreekIngred,lemonIngred,setLemonIngred,brusQty,setBrusQty,greekQty,setGreekQty,lemonQty,setLemonQty}){
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
    const images = ["assets/greek_salad.jpg","assets/Bruchetta.jpg","assets/grilled_fish.jpg","assets/pasta.jpg","assets/lemon_dessert.jpg"]
    const dishes = ['Greek Salad','Bruschetta','Grilled Fish','Pasta','Lemon Desert'];
    const prices = ['12.99','7.99','5.99','20.00','18.99'];

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
        <main id="main">         
            <Routes>
                <Route index element={<Homepage descriptions={description} images={images} dishes={dishes} prices={prices}/>} />
                {/* <Route path="/confirmed" element={<Booking availableTimes={state} dispatch={dispatch} submitForm={submitForm}/>} /> */}
                <Route path="/booking" element={<Reservation availableTimes={state} dispatch={dispatch} submitForm={submitForm} date={date} setDate={setDate} time={time} setTime={setTime} seating={seating} setSeating={setSeating} occassion={occassion} setOccassion={setOccassion} diner={diner} setDiner={setDiner}/> } />
                <Route path="/confirmed1" element={<Reservation2 date={date} time={time} seating={seating} occassion={occassion} diner={diner}/> } />
                <Route path="/card_detail" element={<CreditCard/>}/>
                <Route path="/greek_salad" element={<MenuItem ingred={greekIngred} setIngred={setGreekIngred} cartQty={greekQty} setCartQty={setGreekQty} additional={ingred_greek_salad} heading={"Greek Salad"} price={"12.99"} desc={description[0]} image={images[0]}/>}/>
                <Route path="/bruschetta" element={<MenuItem ingred={brusIngred} setIngred={setBrusIngred} cartQty={brusQty} setCartQty={setBrusQty} additional={ingred_bruschetta} heading={"Bruschetta"} price={"7.99"} desc={description[1]} image={images[1]}/>}/>
                <Route path="/lemon_desert" element={<MenuItem ingred={lemonIngred} setIngred={setLemonIngred} cartQty={lemonQty} setCartQty={setLemonQty} additional={ingred_lemon_desert} heading={"Lemon Desert"} price={"5.99"} desc={description[2]} image={images[2]}/>}/>
                <Route path="/grilled_fish" element={<MenuItem ingred={grilledIngred} setIngred={setGrilledIngred} cartQty={grilledQty} setCartQty={setGrilledQty} additional={ingred_grilled_fish} heading={"Grilled Fish"} price={"20.00"} desc={description[3]} image={images[3]}/>}/>
                <Route path="/pasta" element={<MenuItem ingred={pastaIngred} setIngred={setPastaIngred} cartQty={pastaQty} setCartQty={setPastaQty} additional={ingred_pasta} heading={"Pasta"} price={"18.99"} desc={description[4]} image={images[4]}/>}/>
                <Route path="/cart" element={<AddToCart setLoginOpen={setLoginOpen} loggedIn={loggedIn} grilledIngred={grilledIngred} setGrilledIngred={setGrilledIngred} pastaIngred={pastaIngred} setPastaIngred={setPastaIngred} brusIngred={brusIngred} setBrusIngred={setBrusIngred} greekIngred={greekIngred} setGreekIngred={setGreekIngred} lemonIngred={lemonIngred} setLemonIngred={setLemonIngred} ingred_pasta={ingred_pasta} ingred_grilled_fish={ingred_grilled_fish} ingred_bruschetta={ingred_bruschetta} ingred_greek_salad={ingred_greek_salad} ingred_lemon_desert={ingred_lemon_desert} images={images} brusQty={brusQty} setBrusQty={setBrusQty} greekQty={greekQty} setGreekQty={setGreekQty} lemonQty={lemonQty} setLemonQty={setLemonQty} grilledQty={grilledQty} setGrilledQty={setGrilledQty} pastaQty={pastaQty} setPastaQty={setPastaQty}/>}/>
                <Route path="/menu" element={<Menu description={description} images={images} dishes={dishes} prices={prices}/>}/>
            </Routes>
        </main>
    );
}

export default Main;


<Route index element={<Homepage />} />