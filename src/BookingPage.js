import { isDisabled } from "@testing-library/user-event/dist/utils";
import {useState} from "react";

export default function BookingPage(props){
    const [date,setDate] = useState("");
    const [time,setTime] = useState("Select a time");
    const [guest,setGuest] = useState("");
    const [occassion,setOccassion] = useState("Occassion");
    const styles = {
        display: "grid",
        gap: "20px",
        justifyContent : "center",
        // margin:"30px",
    };

    const getIsFormValid = () => {    
        return (
          date &&
          guest &&
          time !== "Select a time" &&
          occassion !== "Occassion"
        );
      };
    const handleSubmit = (e)=>{
        e.preventDefault();
        props.submitForm(e);
    }
    const handleChange =(e)=>{
        setDate(e.target.value);
        props.dispatch(e.target.value);
    }
    return (
        <header style={{backgroundColor:"#F4CE14"}}>
            <div className="header">
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
            </div>
            
            <section>
                <form  onSubmit={handleSubmit}>
                    
                    <fieldset>
                        <div style={styles}>
                        <h3>Find a Table for any occasion</h3>
                            <label for="res-date" style={{marginTop:"30px"}}>Choose date*</label>
                            <input type="date" class ="input-field"id="res-date" value={date} onChange={handleChange}/>
                            <label for="res-time">Choose time*</label>
                            <select id="res-time " class ="input-field" value={time} onChange={(e) =>{
                                                                        setTime(e.target.value);
                                                                    }}>
                                <option value="Select a time" selected hidden disabled>Select a time</option>
                                {
                                    props.availableTimes.availableTimes.map(availableTimes => {return <option key={availableTimes}>{availableTimes}</option>})
                                }
                            </select>
                            
                            <label for="guests">Number of guests*</label>
                            <input type="number" class ="input-field" placeholder="Enter Number" min="1" max="10" id="guests" value={guest} onChange={(e) =>{
                                                                        setGuest(e.target.value);
                                                                    }}/>
                            <label for="occasion">Occasion*</label>
                            <select id="occasion" class ="input-field" value={occassion} onChange={(e) =>{
                                                                        setOccassion(e.target.value);
                                                                    }}>
                                <option value="Occassion" selected hidden disabled>Occassion</option>
                                <option>Birthday</option>
                                <option>Anniversary</option>
                            </select>
                        
                            <input id="submit" className={!getIsFormValid() ? "disabled":""} type="submit" value="Make Your reservation" style={{marginBottom:"30px"}} disabled={!getIsFormValid()}/>
                        </div>
                    </fieldset>
                </form>
            </section>
        </header>
    );
}