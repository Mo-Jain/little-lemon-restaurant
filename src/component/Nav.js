import { useState } from "react";
import {Link, animateScroll as scroll} from "react-scroll";
import {NavLink, useLocation, useNavigate } from "react-router-dom";
import Basket from "./img/Basket.svg"
import Home from "./img/home icon.svg"


import * as Scroll from "react-scroll"
import { useEffect } from "react";

function Nav({cartItem}){

    const [menuOpen,setMenuOpen] = useState(false);
    const path = useLocation().pathname;
    const location = path.split("/")[1];
    const navigate = useNavigate();
    const scroller = Scroll.scroller;

    const toggleMenu  = () => setMenuOpen(!menuOpen);

    useEffect(()=>{
        if(location!==""){
            scroll.scrollToTop({duration:0});
            setMenuOpen(false)
        }
    },[location])

    const goToPageAndScroll = async (selector) => {
        await navigate("/");
        
        await scroller.scrollTo(selector, {
        duration: 400,
        smooth: true,
        offset: -80,
        spy: true
        }        
        );
    };
    return (
        <>
        <div className="dummy navbar" style={{height:'60px'}}></div>

        
        <nav className="navbar container">
            {location!==""?
            <NavLink to="/"><img src={Home} className="menu-icon" /></NavLink>: 
            <div className="menu-icon" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
            }   

            <NavLink to="/">
                <img src="assets/logo.jpg" alt="little lemon" className="logo" height="50px"/>
            </NavLink>

            <div className="nav-link-icon">
            <ul type="none" className={`container nav-links`}>
                { location===""?(
                <>
                    <li><Link 
                        activeClass="active" 
                        to="hero" 
                        spy={true} 
                        smooth={true} 
                        offset={-70} 
                        duration={300} 
                            >Home</Link></li>
                    <li><Link 
                        activeClass="active" 
                        to="highlights" 
                        spy={true} 
                        smooth={true} 
                        offset={-80} 
                        duration={400} 
                            >Menu</Link></li>
                    <li><Link 
                        activeClass="active" 
                        to="about" 
                        spy={true} 
                        smooth={true} 
                        offset={-80} 
                        duration={500} 
                        
                            >About</Link></li>
                    
                    <li><NavLink to="/booking" >Reservation</NavLink></li>
                    <li><a href="#">Order online</a></li>
                    <li><a href="#">Login</a></li>
                </>
                )
                :
                (
                <>
                    <li><a onClick={() => goToPageAndScroll("hero")}>Home</a></li>
                    <li><a onClick={() => goToPageAndScroll("highlights")}>Menu</a></li>
                    <li><a onClick={() => goToPageAndScroll("about")}>About</a></li>                    
                    <li><NavLink to="/booking" >Reservation</NavLink></li>
                    <li><a href="#">Order online</a></li>
                    <li><a href="#">Login</a></li>
                </>
                )
                }
            </ul>
            <ul type="none" className={`sidebar ${menuOpen ? "visible":"invisible"}`}>
                <Link 
                    activeClass="active" 
                    to="hero" 
                    spy={true} 
                    smooth={true} 
                    offset={-70} 
                    duration={300} 
                        ><li>Home</li></Link>
                <Link 
                    activeClass="active" 
                    to="highlights" 
                    spy={true} 
                    smooth={true} 
                    offset={-80} 
                    duration={400} 
                        ><li>Menu</li></Link>
                <Link 
                    activeClass="active" 
                    to="about" 
                    spy={true} 
                    smooth={true} 
                    offset={-80} 
                    duration={500} 
                        ><li>About</li></Link>
                
                <NavLink to="/booking" ><li>Reservation</li></NavLink>
                <li><a href="#">Order online</a></li>
                <li><a href="#">Login</a></li>
            </ul>
            <div className="cart">
                <img src={Basket} className="cart-icon" />
                <div className="cart-number">{cartItem}</div>
            </div>
            </div>
        </nav>
        
        </>
    );
}

export default Nav;









