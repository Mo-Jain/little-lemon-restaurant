import {  Link } from "react-router-dom";

export default function CallToAction(){
    return (
        <div className="contain">
        <div className="hero container">
            {/* <div className="content"> */}
                <h1>Little Lemon</h1>
                <h2>Chicago</h2>
                <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                <Link to="/booking" ><button className="button">Reserve Table</button></Link>
            {/* </div> */}
            <img src="assets/header.jpg" alt="restuarant"/>
        </div>
        </div>
    );
}