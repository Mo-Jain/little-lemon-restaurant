import { useState } from "react";
import {  Link } from "react-router-dom";

function Nav(){

    const [menuOpen,setMenuOpen] = useState(false);

    const toggleMenu = () =>{
        setMenuOpen(!menuOpen);
    }
    return (
        <nav className="container">
            <Link to="/">
            <img src="assets/logo.jpg" alt="little lemon" height="50px"/>
            </Link>

            <div className="menu-icon" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            <ul type="none" className={`container nav-links ${menuOpen ? "visible":""}`}>
                <li><Link to="/">Home</Link></li>
                <li><a href="#about">About</a></li>
                <li><a href="#">Menu</a></li>
                <li><a href="#">Reservations</a></li>
                <li><a href="#">Order online</a></li>
                <li><a href="#">Login</a></li>
            </ul>
        </nav>
    );
}

export default Nav;









