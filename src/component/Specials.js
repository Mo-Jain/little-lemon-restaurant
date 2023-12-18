import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import Dish from "./img/Dish icon.svg"

export default function Specials({descriptions,images,dishes,prices}){
    return (
        <>
       
        <div className="highlights">
            <div className="container">
            <div className="heading">
                <h2>This Weeks Specials</h2>
                <Link to='/menu'><p className="button">Online Menu</p></Link>
            </div>
            <div className="cards container">
                {descriptions.map((description,index)=>{
                    return(
                        <Link to={`/${dishes[index].trim().replaceAll(' ', '_').toLowerCase()}`} key={index}>
                            <div className="card" >
                                <img src={images[index]} className="dish"/>
                                <div className="card-content">
                                    <div className="container">
                                        <h3>{dishes[index]}</h3>
                                        <h4>${prices[index]}</h4>
                                    </div>
                                    <p>{description}</p>
                                    <div className="container" id="order">
                                        <span>Order a delivery</span>
                                        <img className="icon" src={Dish} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            </div>
        </div>
        </>
    );
}