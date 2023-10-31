
import Dropdown from "./Dropdown";
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Calendar from 'react-calendar';



const ConfirmedBooking = ({availableTimes})=>{
    const ocassion = ["Birthday","Engagement","Anniversary"];
    const diner = [1,2,3,4,5,6,7,8,9,10];
    const [value, setValue] = useState(new Date());

    const onChange = (e) =>{
        setValue(e.target.value);
    }
    return(
        <header style={{backgroundColor:"#F4CE14",height:"1000px",padding:"30px"}}>
            <div className="header">
                <h1>Reservation</h1>
            </div>
            
            <section>
                <Dropdown heading={"Occassion"} list={ocassion} label={""} icon={faChampagneGlasses} placeholder={"Occassion"}/>
                <Dropdown heading={"Number of Dinner"} list={diner} label={"Dinner"} icon={faUser} placeholder={"No of Dinner"}/>
                <Dropdown heading={"Time"} list={availableTimes.availableTimes} label={"pm"} icon={faClock} placeholder={"Select Time"}/>
            </section>
            <div>
                <Calendar  value={value} />
            </div>
        </header>
    );
}

export default ConfirmedBooking;