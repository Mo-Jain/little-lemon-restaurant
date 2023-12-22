import { useEffect, useState } from 'react';
import './AddToCart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate} from 'react-router-dom';
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    setDoc,
    getDoc
} from "firebase/firestore";
import { auth, db,fs } from './config/firebase';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';

// toast.configure();

const AddToCart  = ({user,dispatchToast}) =>{

    const [dishList,setDishList] =useState([]);
    
    const [showModal,setShowModal] = useState(false);
    
    // getting current user uid
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();

   
    const openModal = ()=>{
        setShowModal(true);
    }

    const hideModal=()=>{
        setShowModal(false);
    }

    const updateAddIngredQty = async(dishDoc,qty,index) => {
        try{
            await updateDoc(dishDoc, { [`ingred${index+1}`]:qty+1 });
        }
        catch(err){
            console.error(err);
        }
    };

    const updateSubIngredQty = async(dishDoc,qty,index) => {
        try{
            await updateDoc(dishDoc, { [`ingred${index+1}`]:qty-1 });
        }
        catch(err){
            console.error(err);
        }
    };

    const updateRemoveIngredQty = async(dishDoc,index) => {
        try{
            await updateDoc(dishDoc, { [`ingred${index+1}`]:0 });
        }
        catch(err){
            console.error(err);
        }
    };

    const updateAddQty = async(dishDoc,dishQty) => {
        try{
            await updateDoc(dishDoc, {qty:dishQty+1});
        }
        catch(err){
            console.error(err);
        }
    };

    const updateSubQty = async(dishDoc,dishQty) => {
        try{
            await updateDoc(dishDoc, {qty:dishQty-1});
        }
        catch(err){
            console.error(err);
        }
    };

    const updateHandleOk = async(dishDoc) => {
        try{
            await deleteDoc(dishDoc);
        }
        catch(err){
            console.error(err);
        }
    };

    const getDishList = async() => {
        try{
            const dishCollectionRef = collection(db,"dishes"+user?.uid);
            const data = await getDocs(dishCollectionRef);
            const filteredData = data.docs.map((doc) =>({
                ...doc.data(),
                id:doc.id,
            }));
            setDishList(filteredData);
        }
        catch(err){
            console.error(err);
        }
    };

    auth.onAuthStateChanged(getDishList);
    // console.log(uid);

    useEffect(()=>{
        getDishList(); 
    },[]);

    const handleCheckout = ()=>{
        setShowModal(true);
    }
    // console.log(dishList);

    const qty = dishList.map(data=>{
        return data.qty;
    })
      
    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;
    
    const totalQty = qty.reduce(reducerOfQty,0);

    const price = dishList.map(data=>{
        return Number(data.price)*data.qty;
    })
    
    // reducing the price in a single value
    const reducerOfPrice = (accumulator, currentValue)=>accumulator+currentValue;
    
    const totalPrice = price.reduce(reducerOfPrice,0);

    const ingredPrice = dishList.map(data=>{
        return (data.ingred1+data.ingred2+data.ingred3)*data.qty;
    })
    
    // reducing the ingredient price in a single value
    const reducerOfIngredPrice = (accumulator, currentValue)=>accumulator+currentValue;
    
    const totalIngredPrice = ingredPrice.reduce(reducerOfIngredPrice,0);

    // console.log(totalIngredPrice);
    

     

    return (
        <div className='cartIndex'>
            
            <h2>Food Order</h2>

            {dishList.length<1 ?
            <div className="addToCart" >
                <div className='empty'>
                    <h4>Your Cart is Empty!</h4>    
                </div>
            </div>
            :     
            <div className="addToCart" >
                <div className="items">      
                    <div className='cutlery'>
                        <h5>Cutlery</h5>
                        <div className='cutleryRadio'>
                            <label htmlFor='cutlerySelect'>Help reduce plastic waste. only only ask for cutelry if you need it </label>
                            <input type='radio' className='cutlerySelect' id='cutlerySelect' value='cutlerySelect'/>
                        </div>
                    </div>
                    <h3>Order Summary</h3>
                    <div className='itemList'>
                        {dishList&&
                        dishList.map((dish)=>{
                            return(
                            <div key={dish.name}>
                                <Item dish={dish} uid={user?.uid} updateHandleOk={updateHandleOk} updateAddIngredQty={updateAddIngredQty} updateSubIngredQty={updateSubIngredQty} updateRemoveIngredQty={updateRemoveIngredQty} updateAddQty={updateAddQty} updateSubQty={updateSubQty} />
                            </div>
                            );
                        })}
                    </div>
                </div>
                <div className="priceDetail">
                    <h3>Price Details</h3>
                    <div className='prices'>
                        <div className='price'>
                            <span>Price</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className='price'>
                            <span>Additional Ingredient</span>
                            <span>${totalIngredPrice}.00</span>
                        </div>
                        <div className='price'>
                            <span>Delievry</span>
                            <span>Free</span>
                        </div>
                        <div className='totalPrice'>
                            <strong><span>Total Amount</span></strong>
                            <strong><span>${Number((totalPrice+totalIngredPrice).toFixed(2))}</span></strong>
                            
                        </div>
                    </div>
                    <div className='checkout container'><button className='buttonCheckout' onClick={handleCheckout}>CheckOut</button></div>
                </div>
                {showModal &&
                <div className='overlay'/>}
                {true&&
                <Modal qty={totalQty} showModal={showModal} hideModal={hideModal} price={Number(totalPrice+totalIngredPrice).toFixed(2)}/>
                 }       
            </div>
            }
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable= {false}
                pauseOnHover ={false}
            />  
            
        </div>
    );
}




const Item = ({dish,uid,updateHandleOk,updateAddIngredQty,updateSubIngredQty,updateRemoveIngredQty,updateAddQty,updateSubQty}) =>{
    const [overlay,setOverlay] = useState(false);
    const [popup,setPopup] = useState(false);
    const [isFavorite,setIsFavorite] = useState(false);
    const [markFavorite,setMarkFavorite] = useState(true);
    // const [ingredsQty,setIngredsQty] = useState({'1':ingredQty1,'2':ingredQty2,'3':ingredQty3});
    
      
    const [ingredQty,setIngredQty] = useState([]);

    

    useEffect(()=>{
        setIngredQty([dish?.ingred1,dish?.ingred2,dish?.ingred3]);
    },[dish.ingred1,dish.ingred2,dish.ingred3])
    
    const handleRemove = () =>{
        setOverlay(!overlay);
        setPopup(!popup);
    }

    
    const handleFavorite = () =>{
        setMarkFavorite(!markFavorite);
        if(markFavorite){
            setIsFavorite(true);
            setTimeout(()=>{
                setIsFavorite(false);
            },1500);
        }
    }

    const handleOk = async() =>{
        setOverlay(!overlay);
        setPopup(!popup);
        const dishDoc = doc(db, "dishes"+uid, dish.name);
        updateHandleOk(dishDoc);

    }

    const addIngredQty = async(index) =>{
 
        const dishDoc = doc(db, "dishes"+uid, dish.name);
        updateAddIngredQty(dishDoc,ingredQty[index],index);

    }
    const subIngredQty = async(index) =>{
 
        const dishDoc = doc(db, "dishes"+uid, dish.name);
        updateSubIngredQty(dishDoc,ingredQty[index],index);
       
    }
    const removeIngredQty = async(index) =>{
        const dishDoc = doc(db, "dishes"+uid, dish.name);
        updateRemoveIngredQty(dishDoc,index);
      
    }

    const addQty = async() => {
        const dishDoc = doc(db, "dishes"+uid, dish.name);
        updateAddQty(dishDoc,dish.qty);
        
    }
    const subQty = async() => {
        const dishDoc = doc(db, "dishes"+uid, dish.name);
        updateSubQty(dishDoc,dish.qty);
       
    }
    

    return (
        <>
        {dish.qty>0?
        <div className="item">
            <div className="itemContent">
                <div className="itemImage" style={{backgroundImage: `url(${dish.image})`}}/>
                <div className="itemDetails">
                    <p className='itemName'><strong>{dish.name}</strong></p>
                    <p className='itemStock'>In Stock</p>
                    <p className='ingredHeading' >Additional Ingredient</p>
                    {dish.ingreds.map((ingred,index) =>{
                        return(
                        <div className="addditionalIngred" key={ingred}>
                            <span className='ingredName'>{ingred}</span>
                            {ingredQty[index]>0?
                            <>
                                <span className='ingredQtyChange' onClick={()=>subIngredQty(index)}>-</span>
                                <span className='ingredQty'>{ingredQty[index]}</span>
                                <span className='ingredQtyChange' onClick={()=>addIngredQty(index)}>+</span>
                                <button className="ingredButton" onClick={()=>removeIngredQty(index)}>Remove</button>
                            </>
                            :
                            <button className="addIngred" onClick={()=>addIngredQty(index)} >Add</button>
                            }
                            
                        </div>);
                    })}
                  
                </div>
                <div className="itemPrice">
                    <b><p >${dish.price}</p></b>
                    <p className='shipping'>Free Shipping</p>
                </div>
            </div>
            <div className="itemButtons">
                <span className="itemQty">
                    <span className='qtyChange' onClick={subQty}>-</span>
                    <span className='qty'>{dish.qty}</span>
                    <span className='qtyChange' onClick={addQty}>+</span>
                </span>
                <span className="changeButton" onClick={handleFavorite}>{markFavorite?"Mark":"Unmark"} Favourites</span>
                <span className="changeButton" onClick={handleRemove}>Remove</span>
            </div>
            {overlay &&
            <div className='overlay'/>}
            
            <div className={`removePopup ${popup?"":"scaled"}`}>
                <p className='popupMsg'>Are you sure you want to remove the item</p>
                <div className='popupButtons'> 
                    <button className='popupButton ok' onClick={handleOk}>OK</button>
                    <button className='popupButton cancel' onClick={handleRemove}>Cancel</button>
                </div>
            </div>
            <span className={`favoritePopup ${isFavorite?"visible":""}`}>
                    <FontAwesomeIcon icon={faCheck} className="check" />
                    Marked Favourite
            </span>
        </div>
        :
        ""
        }
        </>
    )
}

export default AddToCart;