import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reservation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import creditcard from "./img/creditcard.svg";
import checkedIcon from './img/checked.png'
import uncheckedIcon from './img/unchecked.png'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const CreditCard = () => {
    const [cardNumber,setCardNumber] = useState("");
    const [name,setName] = useState("");
    const [expiryDate,setExpiryDate] = useState("");
    const [cvv,setCvv] = useState("");
    const [error,setError] = useState(false);
    const [submit,setSubmit] =useState(false);
    const handleClick = () => setChecked(!checked);
    const [checked,setChecked] = useState(false);
    const [textChecked,setTextChecked] = useState(false);
    
    const [errorMesaage,setErrorMessage] = useState("");
    const [displayMsg,setDisplayMsg] = useState(false);
    const handleTextClick = () => setTextChecked(!textChecked);

    const isValid = () => {
        return (
            cardNumber &&
            name &&
            expiryDate &&
            cvv
        )
    }
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(true);
        if(isValid()){
            setSubmit(true);
            setTimeout(()=>{
                setSubmit(false);
                navigate("/");
            },1500)
            
        }
        else{
            
            setErrorMessage("Please Enter required fields");            
            setDisplayMsg(true);
            setTimeout(()=>{
                setDisplayMsg(false);
                setErrorMessage("");
            },1500)
        }
        
    }
    return (
        <>
            <form className="reservation_form" onSubmit={handleSubmit}>
                <header className='reservation' >
                    
                    <div className="res res_card" >
                        <div className="res-heading">
                            <h2>Little Lemon</h2>
                            <h3>Chicago</h3>
                        </div>

                        <h4>Credit Card Details</h4>
                        <div className='content ' >                            
                            <div className='input'>
                                <input type="text" className={`invalid ${error && !cardNumber?"border":""}`} value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)} maxLength={12} placeholder='*Card Number'/>
                                {error && !cardNumber && <div>
                                <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />
                                <span className={`invalid ${cardNumber?"red":""}`}>Card Number required</span>
                                </div>}
                            </div>
                            <div className='input'>                                
                                <input type="text" value={name} className={`invalid ${error && !name?"border":""}`} onChange={(e)=>setName(e.target.value)} maxLength={20} placeholder='*Name'/>
                                {error && !name && <div>
                                <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />
                                <span className={`invalid ${name?"red":""}`}>Name required</span>
                                </div>}
                            </div>
                        </div>
                        <div id="card" className='content card_content' >                            
                            <div className='input'>
                                <p>*Expiry Date</p>
                                <input type="text" className={`invalid expiry_date`} value={expiryDate} maxLength={7} onChange={(e)=>setExpiryDate(e.target.value)} />
                                {error && !expiryDate && <div>
                                <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />
                                <span className={`invalid ${expiryDate?"red":""}`}>Expiry date required</span>
                                </div>}
                            </div>
                            <div className='input'>
                                <p>*CVV</p>
                                <input type="text" value={cvv} className={`invalid cvv`} onChange={(e)=>setCvv(e.target.value)} maxLength={4}/>
                                {error && !cvv && <div>
                                <FontAwesomeIcon icon={faTriangleExclamation} className='invalid' />
                                <span className={`invalid ${cvv?"red":""}`}>CVV required</span>
                                </div>}
                            </div>
                            <div className='input'>
                                <p> </p>
                                <div className={`cvv_logo `}>
                                    <img src={creditcard}/>
                                </div>
                            </div>
                        </div>
                        <div className="seating_option detail_check" >
                             {checked?
                            <img src={checkedIcon} onClick={handleClick} id='radioIcon'/>
                            :
                            <img src={uncheckedIcon} onClick={handleClick} id='radioIcon'/>
                            }
                            
                            <span onClick={handleClick}>Send be booking details via mail</span>
                        </div>
                        <div className="seating_option detail_check" >
                             {textChecked?
                            <img src={checkedIcon} onClick={handleTextClick} id='radioIcon'/>
                            :
                            <img src={uncheckedIcon} onClick={handleTextClick} id='radioIcon'/>
                            }
                            
                            <span onClick={handleTextClick}>Send be booking details via text</span>
                        </div>
                    </div>
                        
                </header>
                {submit && 
                <div className='popupParent'>
                    <div className="popup">
                        <p><strong>Your Reservation has been confirmed check your email</strong></p>
                    </div>
                </div>
                }
                {displayMsg && <div className="error-popup">
                    <p><strong> {errorMesaage}</strong></p>
                </div>}
                <div className="image_center">
                <section className="images">
                    <img src="assets\pasta.jpg"/>
                    <img src="assets\grilled_fish.jpg"/>
                    <img src="assets\Mario-adrian1.jpg"/>
                </section>
                </div>
                <input type='submit' className={`reserve_button book `}  value="Book" />
            </form>
        </>
    );
}

export default CreditCard;