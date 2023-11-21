import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css'
import logo from "./img/monochrome_logo.png";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { validateEmail } from "./utils";
const Login = ({open,setOpen,setLoggedIn}) =>{
    const [input,setInput] = useState('');
    const [valid,setValid] = useState(true);
    const [placeholder,setPlaceholder] = useState(true);
    const [validInput,setValidInput] = useState(false);
    const [inputOtp1,setInputOtp1] = useState("");
    const [inputOtp2,setInputOtp2] = useState("");
    const [inputOtp3,setInputOtp3] = useState("");
    const [inputOtp4,setInputOtp4] = useState("");
    const [inputOtp5,setInputOtp5] = useState("");
    const [inputOtp6,setInputOtp6] = useState("");
    const handleChange  = (e)=>{
        setInput(e.target.value);
        setValid(true);
    }   
    const handleSubmit = (e) =>{
        e.preventDefault();
        if((isNaN(+input) || input.length!==10) && !validateEmail(input)){
            setValid(false);
        }else{
            setValidInput(true);
        }
    }

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setInputOtp1("");
        setInputOtp2("");
        setInputOtp3("");
        setInputOtp4("");
        setInputOtp5("");
        setInputOtp6("");
        setInput("");
        setValidInput(false);
        setOpen(false);
        setLoggedIn(true);
    }

    useEffect(()=>{
        const inputs = document.getElementById("inputs");
        inputs.addEventListener("input",function(e){
            const target = e.target; 
            const val = target.value; 
        
            if (isNaN(val)) { 
                target.value = ""; 
                return; 
            } 
        
            if (val != "") { 
                const next = target.nextElementSibling; 
                if (next) { 
                    next.focus(); 
                } 
            } 
        });

        inputs.addEventListener("keyup", function (e) { 
            const target = e.target; 
            const key = e.key.toLowerCase(); 
          
            if (key == "backspace" || key == "delete") { 
                target.value = ""; 
                const prev = target.previousElementSibling; 
                if (prev) { 
                    prev.focus(); 
                } 
                return; 
            }
            if(key=="arrowleft"){
                const prev = target.previousElementSibling; 
                if (prev) { 
                    prev.focus(); 
                } 
                return;
            }
            if(key=="arrowright"){
                const next = target.nextElementSibling; 
                if (next) { 
                    next.focus(); 
                } 
                return;
            }
        });
    })

    
    return(
        <>
        <div className={`login-overlay`} style={!open?{display:'none'}:{}}>
            <div className="login">
                <div className={`login-box ${validInput?"validInput":""}`}> 
                    <div className="login-msg">
                        <div className='msg-content'>
                            <h2>Login</h2>
                            <p>Get access to your Orders, Wishlist and Recommendations</p>
                        </div>
                        <div className="login-logo">
                            <h3>Little Lemon</h3>
                            <img src ={logo}  />
                        </div>
                    </div>
                    <div className='container login-contents'>
                        <div className="login-content ">
                            <form className="login-form" onSubmit={handleSubmit}>
                                <div className="login-input">
                                    <p className={` ${placeholder?"placeholder":"noholder"}`}>Enter Mobile number/Email </p>
                                    <input type="text" value={input} className={`input ${valid?"":"notValid"}`} onChange={handleChange} onFocus={()=>setPlaceholder(false)} onBlur={()=>setPlaceholder(true)}/>
                                    <p className={`valid ${valid?"invisible":""}`}>Please Enter Valid Number/Email</p>
                                </div>
                                <p className="login-policy">By continuing, you agree to Flipkart's <a>Terms of Use</a> and <a>Privacy Policy</a>.</p>
                                <input type="submit" className="button otp-button" value="Request OTP" height='50px'/>
                            </form>
                            <a className="login-account">New? Create an account</a>
                        </div>
                        <div className={`login-content login-content-otp `}>
                            <form onSubmit={handleOtpSubmit}>
                                <p>Please enter the OTP sent to {input} <span onClick={()=>setValidInput(false)}>Change</span></p>
                                <div id="inputs" className="inputs"> 
                                    <input className="input" type="text" value={inputOtp1} required onChange={(e)=>setInputOtp1(e.target.value)}
                                        inputMode="numeric" maxLength="1" /> 
                                    <input className="input" type="text" value={inputOtp2} required onChange={(e)=>setInputOtp2(e.target.value)}
                                        inputMode="numeric" maxLength="1" /> 
                                    <input className="input" type="text" value={inputOtp3} required onChange={(e)=>setInputOtp3(e.target.value)}
                                        inputMode="numeric" maxLength="1" /> 
                                    <input className="input" type="text" value={inputOtp4} required onChange={(e)=>setInputOtp4(e.target.value)}
                                        inputMode="numeric" maxLength="1" /> 
                                    <input className="input" type="text" value={inputOtp5} required onChange={(e)=>setInputOtp5(e.target.value)}
                                        inputMode="numeric" maxLength="1" /> 
                                    <input className="input" type="text" value={inputOtp6} required onChange={(e)=>setInputOtp6(e.target.value)}
                                        inputMode="numeric" maxLength="1" /> 
                                </div>
                                <input type="submit" className='button otp-button' value="Verify"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='login-close'>
                <FontAwesomeIcon icon={faXmark} className='xmark' onClick={()=>setOpen(false)} />
            </div>
        </div>
        </>
    )
}

export default Login;