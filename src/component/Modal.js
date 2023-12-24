import React, { useState } from "react"
import './Modal.css';
import PhoneInput from "react-phone-input-2";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "./config/firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({qty,price,hideModal,showModal}) => {
  const [cell, setCell]=useState(null);
  const [residentialAddress, setResidentialAddress]=useState('');
  const [cartPrice,setCartPrice]=useState(price); 
  const [cartQty,setCartQty]=useState(qty)
  const [countryDialCode,setCountryDialCode] = useState();
  const [isDisabled,setIsDisabled] = useState(false);
  const [checkOut,setCheckout] = useState(false);
  
  const navigate = useNavigate();
  const handleCashOnDelivery = async(e) =>{
      setIsDisabled(true);
      e.preventDefault();
      console.log(e);
      const uid = auth?.currentUser?.uid;
      console.log(auth.currentUser);
      const user = auth?.currentUser;

      await addDoc(collection(db, "Buyer-Personal-Info"), {
          Name: user.displayName,
          Email: user.email, 
          CellNo: cell,
          ResidentialAddress: residentialAddress,
          CartPrice: cartPrice,
          CartQty: cartQty
      })
      const cartData = await getDocs(collection(db,"dishes"+uid));
      // const cartData = await fs.collection('Cart ' + uid).get();
      for(var snap of cartData.docs){
          var data = snap.data();
          data.ID = snap.id;
          data.totalPrice = Number(price).toFixed(2);
          const newDishRef = doc(collection(db, "Buyer-Cart "+uid));
          await setDoc(newDishRef, data);
          const dishDoc = doc(db, "dishes"+uid, snap.id);
          await deleteDoc(dishDoc);
          // await fs.collection('Cart ' + uid).doc(snap.id).delete();
      }
      toast('Your order has been placed successfully');
      hideModal();
      navigate('/');
      setIsDisabled(false);
      setCheckout(false);
    }

    const handleCancel=(e)=>{
      e.preventDefault();
      hideModal();
      setCheckout(false);
    }
    const handleToken = async(token)=>{
        // console.log(token);
        hideModal();
        try
        {
          const cart = {name: 'All Products', price}
          const response = await axios.post('http://localhost:8080/checkout',{
              token,
              cart
          })
          
          console.log(response);
          let {status}=response.data;
          console.log(status);
          if(status==='success'){
              navigate('/');
              const props = {
                  position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
              }
              // dispatchToast('Your order has been placed successfully',props);
              toast('Your order has been placed successfully');
              const uid = auth?.currentUser?.uid;
              
              const dishCollectionRef = collection(db,"dishes"+uid);
              const carts = await getDocs(dishCollectionRef);
              for(var snap of carts.docs){
                  var data = snap.data();
                  data.ID = snap.id;
                  data.totalPrice = price;
                  const newDishRef = doc(collection(db, "Buyer-Cart "+uid));
                  await setDoc(newDishRef, data);
                  const dishDoc = doc(db, "dishes"+uid, snap.id);
                  await deleteDoc(dishDoc);
              }
          }
          else{
              alert('Something went wrong in checkout');
          }
          setCheckout(false);
        }
        catch(err){
          toast.error('Server not responding');
          console.error(err);
        }
     }
  return (
    <div className={`modelContainer ${showModal?"":"scaled"}`}>
      <div className={`removePopup1`}>
          {!checkOut &&
            <>
              <div className="closeIcon">
                <FontAwesomeIcon icon={faXmark} className='xmark' onClick={()=>hideModal()} />
              </div>
              <p className='popupMsg'>Total Amount ${price}</p>
              <div className='checkout container'> <StripeCheckout
                  stripeKey='pk_test_51OMvMVSJgqK34k6mA8zsNXHJxPXlZU4dWwmUufYK0Pykz3aA5V5YhBLO6niLRVWsdVfV9mEZVSeTXXPvQX69qM4200PxMPpAqo'
                  token={handleToken}
                  billingAddress
                  shippingAddress
                  name='All Products'
                  amount={price*100}
                  onClick={()=>hideModal()}
              ></StripeCheckout></div>  
              <div className = 'orContainer'>
                  <div className='line'/>
                  <p>OR</p>
                  <div className='line'/>
              </div>  
              <div className='checkout container'><button className='buttonCheckout' onClick={()=>setCheckout(true)}>Cash On Delivery</button></div>
            </>
          }
          {checkOut&&
          <><p className='popupMsg'>Cash on delievery</p>
          <form className='form-group' onSubmit={handleCashOnDelivery}>
            <label>Mobile Number</label>
            <PhoneInput country={'in'} countryCodeEditable={false} value={cell} required onChange={(phone, country) => {
              setCountryDialCode(country.dialCode);
              setCell(phone);
            } } />
            <br></br>
            <input type="text" className='form-control' placeholder='Residential Address'
              required onChange={(e) => setResidentialAddress(e.target.value)}
              value={residentialAddress} />
            <br></br>
            <label for='form-control'>Total Quantity</label>
            <input type="text" className='form-control readOnly' readOnly
              required value={cartQty} />
            <br></br>
            <label for='form-control'>Total Price</label>
            <input type="text" className='form-control readOnly' readOnly
              required value={cartPrice} />
            <br></br>
            <div className='popupButtons'>
              <button type='submit' className={`popupButton ok ${isDisabled ? "disabled" : ""}`} disabled={isDisabled}>Submit</button>
              <span className='popupButton cancel' onClick={handleCancel}>Cancel</span>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover={false} />
          </form></>
            }
      </div>
      {/* <div className='popupClose' style={checkOut?{height:'460px'}:{}}>
          <FontAwesomeIcon icon={faXmark} className='xmark' onClick={()=>hideModal()} />
      </div> */}
    </div>
  )};

export default Modal



