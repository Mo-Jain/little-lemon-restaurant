import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css'
import logo from "./img/monochrome_logo.png";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { validateEmail } from "./utils";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import OTPInput, { ResendOTP } from "otp-input-react";
import toast, { Toaster } from 'react-hot-toast';
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    signInWithPopup,
  } from "firebase/auth";
import { auth, googleProvider } from "./config/firebase.js";


const Login = ({open,setOpen,setLoggedIn}) =>{
    const [input,setInput] = useState('');
    const [input1,setInput1] = useState('');
    const [valid,setValid] = useState(true);
    const [valid1,setValid1] = useState(true);
    const [placeholder,setPlaceholder] = useState(true);
    const [validInput,setValidInput] = useState(false);
    const [otp,setOtp]  = useState("");
    const [flag,setFlag] = useState(false);
    const [showOTP,setShowOTP] = useState(false);
    const [focus,setFocus] = useState(true);
    const [countryDialCode,setCountryDialCode] = useState('91');
    const [countryDialCode1,setCountryDialCode1] = useState('91');

    const handleSubmit = (e) =>{
        e.preventDefault();
        if((isNaN(+input) || input.length!==12) && !validateEmail(input)){
            setValid(false);
        }else{
            toast.success('Otp sended successfully!');
            setValidInput(true);
        }
    }
    
    const reset = () =>{
        setInput(countryDialCode);
        setInput1(countryDialCode1);
        setValid(true);
        setValid1(true);
        setPlaceholder(true);
        setValidInput(false);
        setOtp("");
        setFlag(false);
        setShowOTP(false);
    }
    function onCaptchaVerify() {
        if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                  onSignup();
                }
              });
        }
    }

    const onSignup = async() => {
        if(isNaN(+input1) || input1.length!==12){
            setValid1(false);
        }
        else{
            setValid1(true);

            try{
                const recaptcha = new RecaptchaVerifier(auth,"recaptcha",{'size': 'invisible'});
                const confirmation = await signInWithPhoneNumber(auth,input1,recaptcha);
                console.log(confirmation);
                setShowOTP(true);
                toast.success('Otp sent successfully!');
            }
            catch(err){
                console.error(err);
            }

            // onCaptchaVerify();
            // // auth.settings.appVerificationDisabledForTesting = true;
            // // var phoneNumber = "+16505554567";
            // // var testVerificationCode = "123456";

            // // var appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            // //     'size': 'invisible',
            // // });

            // const appVerifier  = window.recaptchaVerifier;
            // const formatPh = '+' + input1;
            // signInWithPhoneNumber(auth, formatPh, appVerifier)
            // .then((confirmationResult) => {
            // window.confirmationResult = confirmationResult;
            // setShowOTP(true);
            // toast.success('Otp sended successfully!');
            // })
            // .catch((error) => {
            //     console.error(error);
            // });
        }
        
       
    }

    function onOTPVerify(){
        window.confirmationResult
        .confirm(otp)
        .then(async (res)=>{
            console.log(res);
            reset();
            setOpen(false);
            setLoggedIn(true);
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
        reset();
        
        setLoggedIn(true);
    }
     const signInWithGoogle = async() =>{
        try{
            await signInWithPopup(auth,googleProvider);
            reset();
            setOpen(false);
            setLoggedIn(true);
        }
        catch(err){
            console.error(err);
        }
     }

    

    
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
                        
                        <div className="login-content " style={{ display: !flag ? "flex" : "none" }}>
                            <form className="login-form" onSubmit={handleSubmit}>
                                <div className="login-input">
                                    <p className={` ${placeholder?"placeholder":"noholder"}`}>Enter Mobile number/Email </p>
                                    <PhoneInput country={'in'} countryCodeEditable={false} value={input} onChange={(phone,country)=>{
                                        setCountryDialCode(country.dialCode);
                                        setInput(phone);
                                    }}/>
                                    
                                    <p className={`valid ${valid?"invisible":""}`}>Please Enter Valid Number/Email</p>
                                </div>
                                <p className="login-policy">By continuing, you agree to Flipkart's <a>Terms of Use</a> and <a>Privacy Policy</a>.</p>
                                
                                <input type="submit" className="button otp-button" value="Request OTP" height='50px'/>
                                <div className = 'orContainer'>
                                    <div className='line'/>
                                    <p>OR</p>
                                    <div className='line'/>
                                </div>
                                <p className="button otp-button" style={{backgroundColor:'#7c7cf6',color:'black' ,border:'1px solid black',borderRadius:'4px'}} onClick={signInWithGoogle} >Sign In with Google</p>
                            </form>
                            <a className="login-account" onClick={()=>setFlag(true)}>New? Create an account</a>
                        </div>
                        <div className={`login-content login-content-otp `} style={{ display: !flag ? "flex" : "none" }}>
                            <form onSubmit={handleOtpSubmit}>
                                <p>Please enter the OTP sent to {input.substring(2)} <span onClick={()=>setValidInput(false)}>Change</span></p>
                                <div id="inputs" className="inputs"> 
                                    <OTPInput OTPLength={6} otpType="number" value={otp} onChange={setOtp} disabled={false} autoFocus className="input otp-container"></OTPInput>
                                </div>
                                <input type="submit" className='button otp-button' value="Verify"/>
                                
                            </form>
                        </div>
                        <div className="login-content ">
                            <div className="login-form" >
                                <div className="login-input">
                                    <span className={` ${placeholder?"placeholder":"noholder"}`}>
                                    Enter Mobile number  
                                    </span>
                                    {showOTP &&
                                    <span id='change' onClick={()=>{
                                        setShowOTP(false);
                                        setOtp("");
                                    }}> Change?</span>}
                                    
                                    <PhoneInput country={'in'} countryCodeEditable={false} value={input1} onChange={(phone,country)=>{
                                        setCountryDialCode1(country.dialCode);
                                        setInput1(phone);
                                    }} disabled={showOTP} disableDropdown={showOTP} autoFocus/>
                                    <p className={`valid ${valid1?"invisible":""}`}>Please Enter Valid Number/Email</p>
                                    
                                </div>
                                <div id='recaptcha'></div>
                                {!showOTP &&
                                <p className="login-policy">By continuing, you agree to Flipkart's <a>Terms of Use</a> and <a>Privacy Policy</a>.</p>
                                }
                                {showOTP &&
                                <>
                                    <div className='otp'>
                                        <p className='otp-msg'>Otp Sent to Mobile</p>
                                        <p className='otp-label'>Enter Otp</p>
                                        <div id="inputs" className="inputs"> 
                                            <OTPInput OTPLength={6} otpType="number" value={otp} onChange={setOtp} autoFocus className="input otp-container"></OTPInput>
                                        </div>
                                    </div>
                                    <p type="submit" id='sign-in' className="button otp-button" onClick={onOTPVerify}>Sign IN</p>
                                </>
                                }
                                {!showOTP &&
                                    <p className="button otp-button" id='sign-in' style={{color:'black' ,border:'1px solid black',borderRadius:'4px'}} onClick={onSignup}>Continue</p>
                                }
                                <p className="button otp-button" style={{backgroundColor:'white',color:'black' ,border:'1px solid black',borderRadius:'4px'}} onClick={()=>setFlag(false)}>Existing user</p>
                                <p className="button otp-button" style={{backgroundColor:'#7c7cf6',color:'black' ,border:'1px solid black',borderRadius:'4px'}} onClick={signInWithGoogle} >Sign In with Google</p>
                                
                            </div>
                            
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