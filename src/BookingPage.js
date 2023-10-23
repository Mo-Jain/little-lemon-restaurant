import { isDisabled } from "@testing-library/user-event/dist/utils";
import {useState} from "react";

export default function BookingPage(props){
    const [date,setDate] = useState("");
    const [availableTimes,setTime] = useState("Select a time");
    const [guest,setGuest] = useState("");
    const [occassion,setOccassion] = useState("Occassion");
    const styles = {
        display: "grid",
        gap: "20px",
        justifyContent : "center",
        // margin:"30px",
    };
    const isDisabled = () => {    
        return (
          date &&
          availableTimes &&
          guest &&
          occassion !== "Occassion"
        );
      };
    const time = ["17:00" ,"18:00","19:00","20:00","21:00","22:00"];
    const Times = time.map((time)=>{
        return (<option>{time}</option>);
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        props.submitForm(e);
    }
    const handleChange =(e)=>{
        setDate(e.target.value);
        props.dispatch(e);
    }
    return (
        <header>
            <section>
                <form style={{backgroundColor:"#F4CE14"}} onSubmit={handleSubmit}>
                    <fieldset>
                        <div style={styles}>
                        <label for="res-date" style={{marginTop:"30px"}}>Choose date</label>
                        <input type="date" id="res-date" value={date} onChange={handleChange}/>
                        <label for="res-time">Choose time</label>
                        <select id="res-time ">
                            <option value="Select a time" selected hidden disabled>Select a time</option>
                            {
                                props.availableTimes.availableTimes.map(availableTimes => {return <option key={availableTimes}>{availableTimes}</option>})
                            }
                        </select>
                        <label for="guests">Number of guests</label>
                        <input type="number" placeholder="1" min="1" max="10" id="guests" value={guest} onChange={(e) =>{
                                                                    setGuest(e.target.value);
                                                                }}/>
                        <label for="occasion">Occasion</label>
                        <select id="occasion" value={occassion} onChange={(e) =>{
                                                                    setOccassion(e.target.value);
                                                                }}>
                            <option value="Occassion" selected hidden disabled>Occasion</option>
                            <option>Birthday</option>
                            <option>Anniversary</option>
                        </select>
                    
                        <input type="submit" value="Make Your reservation" style={{marginBottom:"30px"}} disabled={isDisabled}/>
                        </div>
                    </fieldset>
                </form>
            </section>
        </header>
    );
}