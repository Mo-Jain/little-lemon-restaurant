import React from "react";
import BookingPage from "./BookingPage";

const Booking = (props)=>{
    return (
        <>
            <BookingPage availableTimes={props.availableTimes} dispatch={props.dispatch} submitForm={props.submitForm}></BookingPage>
        </>
    )
}

export default Booking;