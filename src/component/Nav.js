import { useRef, useState } from "react";
import {Link, animateScroll as scroll} from "react-scroll";
import {NavLink, useLocation, useNavigate } from "react-router-dom";
import Basket from "./img/Basket.png"
import Home from "./img/home icon.svg"
import * as Scroll from "react-scroll"
import { useEffect } from "react";
import Login from './Login.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase.js";


function Nav({setLoginOpen,loginOpen,cartItem,loggedIn,setLoggedIn,setBrusQty,setGreekQty,setLemonQty}){

    const [menuOpen,setMenuOpen] = useState(false);
    const path = useLocation().pathname;
    const location = path.split("/")[1];
    const navigate = useNavigate();
    const scroller = Scroll.scroller;
    const [isLogin, setIsLogin] = useState(false);
    var user = auth?.currentUser;

    
    const refOne = useRef();
    useEffect(()=>{
        document.addEventListener("keydown",hideOnEscape,true);
        document.addEventListener("click",hideOnClickOutside,true)
    })

    const hideOnEscape = (e) =>{
        if(e.key==="Escape"){
            setMenuOpen(false); 
        }
        
    }
    const hideOnClickOutside  =(e) =>{
        if(refOne.current && !refOne.current.contains(e.target)){
            setMenuOpen (false);
        }
        
    }
    useEffect(()=>{
        if(location!==""){
            scroll.scrollToTop({duration:0});
            setMenuOpen(false)
        }
    },[location])

    useEffect(()=>{
        if(loggedIn){
            setIsLogin(true);
            setTimeout(()=>{
                setIsLogin(false);
            },1500);
        }
    },[loggedIn])

    // useEffect(()=>{
    //     console.log(menuOpen);
    // },[menuOpen])

    const handleLogin  = () =>{
        setLoginOpen(!loginOpen);
    }

    const handleLogout = async() =>{
        setLoggedIn(false);
        setBrusQty(0);
        setGreekQty(0);
        setLemonQty(0);
        try{
            await signOut(auth);
        }
        catch(err){
            console.error(err);
        }
    }

    const goToPageAndScroll = async(selector) => {
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
            <div className="menu-icon" onClick={() =>setMenuOpen(!menuOpen)}>
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
                    <li><NavLink to="/order" >Online orders</NavLink></li>
                    <li>{!user?
                        <a onClick={handleLogin}>Login</a>
                        :
                        <span onClick={handleLogout}>Logout</span>
                        }
                    </li>
                    {/* <li><img src={photoURL} width={'50px'}/></li> */}
                </>
                )
                :
                (
                <>
                    <li><a onClick={() => goToPageAndScroll("hero")}>Home</a></li>
                    <li><a onClick={() => goToPageAndScroll("highlights")}>Menu</a></li>
                    <li><a onClick={() => goToPageAndScroll("about")}>About</a></li>                    
                    <li><NavLink to="/booking" >Reservation</NavLink></li>
                    <li><NavLink to='/order'>Online orders</NavLink></li>
                    <li>{!user?
                        <a onClick={handleLogin}>Login</a>
                        :
                        <span onClick={handleLogout}>Logout</span>
                        }</li>
                </>
                )
                }
            </ul>
            <ul type="none" className={`sidebar ${menuOpen ? "visible":"invisible"}`} ref={refOne}>
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
                <NavLink to='/order'><li>Online orders</li></NavLink>
                <li onClick={user?handleLogout:handleLogin}>{!user?
                    <a onClick={handleLogin}>Login</a>
                    :
                    <span onClick={handleLogout}>Logout</span>
                    }</li>
            </ul>
            <NavLink to="/cart" ><div className="cart">
                <img src={Basket} className="cart-icon" />
                
                {!user?
                <div className="cart-dot"></div>
                :
                cartItem<1?<div className="cart-dot"></div>:<div className="cart-quantity">{cartItem}</div>
                }
            </div></NavLink>
            </div>
            
        </nav>
        <span className={`loginPopup ${isLogin?"visible":""}`}>
                    <FontAwesomeIcon icon={faCheck} className="check" />
                    loggedIn
        </span>
        <div className="loggingIn">
            <Login open={loginOpen} setOpen={setLoginOpen} setLoggedIn={setLoggedIn}/>
        </div>
        </>
    );
}

export default Nav;






