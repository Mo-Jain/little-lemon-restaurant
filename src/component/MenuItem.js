import { useState } from "react";
import "./MenuItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import {NavLink } from "react-router-dom";
import {auth, db} from "./config/firebase";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    setDoc
} from "firebase/firestore";
import { useEffect } from "react";

export default function MenuItem({index,setLoginOpen,price,additional,desc,heading,image,cartQty,setCartQty,ingred,setIngred,user}){
    
    const [dishList,setDishList] = useState([]);
    const dishCollectionRef = collection(db,"dishes");
    
    const [added,setAdded] = useState(false);
    const [isPresent,setIsPresent] = useState(false);

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
    
    

    const getDishList = async() => {
        try{
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
    useEffect(()=>{
        getDishList();
    },[]);
    
    
    
    const addIngredQty = async(index)=>{
        const dishDoc = doc(db, "dishes"+uid, heading);
        setIngred({...ingred,[`${index+1}`]:ingred[`${index+1}`]+1});
        try{
            await updateDoc(dishDoc, { [`ingred${index+1}`]:ingred[`${index+1}`]+1 });
        }
        catch(err){
            console.error(err);
        }
        
    };
    const subIngredQty = async(index)=>{
        const dishDoc = doc(db, "dishes"+uid, heading);
        setIngred({...ingred,[`${index+1}`]:ingred[`${index+1}`]-1});
        try{
            await updateDoc(dishDoc, {[`ingred${index+1}`]:ingred[`${index+1}`]-1});
        }
        catch(err){
            console.error(err);
        }
    };

    const addQty = async() =>{ 
        if(uid===null){
            setLoginOpen(true);
        }
        else{    
            setCartQty(cartQty+1);
            if(cartQty===0){
                setAdded(true);
                setTimeout(()=>{
                    setAdded(false);
                },1500);
            }
            try{
                await setDoc(doc(db, "dishes"+uid, heading), {
                    desc:desc,
                    ingred1:ingred['1'],
                    ingred2:ingred['2'],
                    ingred3:ingred['3'],
                    name:heading,
                    price:price,
                    qty:cartQty+1,
                    ingreds:additional,
                    image:image,
                    index:index,
            
                });

                getDishList();
            }
            catch(err){
                console.error(err);
            }
        }
    };
    const subQty = async() =>{       
        setCartQty(cartQty-1);
        const dishDoc = doc(db, "dishes"+uid, heading);
        try{
            if(cartQty<=1){
                await deleteDoc(dishDoc);
            }
            else{
                await updateDoc(dishDoc, { qty: cartQty-1 });
            }
        }
        catch(err){
            console.error(err);
        }
    }
    return (
        <div className="menu-item">
            <div className="menu-item-sub">
                <div className="menu-poster main" style={{backgroundImage: `url(${image})`}}></div>
                <div className="main">
                    <h1>{heading}</h1>
                    <div className="rating">
                        <div className="container">
                            <img className="icon star" src="assets/star.jpg"/>
                            <img className="icon star" src="assets/star.jpg"/>
                            <img className="icon star" src="assets/star.jpg"/>
                            <img className="icon star" src="assets/star.jpg"/>
                        </div>
                        <span>4/5</span>
                    </div>
                    <div className="menu-item-content">
                        <p className="price">Price: ${price}</p>
                        <p>{desc}</p>
                    </div>
                </div>
                
            </div>
            <div className="menu-item-sub">
                <div className="additional-list main">
                    <h2 className="additional-list-heading">Add</h2>
                    {additional.map((item,index) =>{
                    return(<div className="additional-ingredient" key={item}>
                        <label htmlFor="additional-ingredient-price">
                            <span>{item}</span>
                            <span>$1.00</span>
                        </label>
                        {ingred[`${index+1}`]===0 ?
                        <button className="additional-ingredient-add" onClick={()=>addIngredQty(index)} >Add</button>
                        :
                        <div className="additional-ingredient-added">
                            <span onClick={()=>subIngredQty(index)}>-</span>
                            <span>{ingred[index+1]}</span>
                            <span onClick={()=>addIngredQty(index)}>+</span>
                        </div>
                        }
                        </div>);
                    })}
                </div>
                <div className="main">
                    <div className="menu-item-delivery">
                        <div className='delivery'>
                        <FontAwesomeIcon icon={faTruckFast} flip="horizontal" style={{color: "#2a313c",}} />
                        <p>Delivery Time: <span>20 minutes</span></p>
                        </div>
                        <span className="button change-button">Change</span>
                    </div>
                    <div className="menu-item-buttons">
                        {cartQty===0?
                        <span className="button" id ="button1" onClick={addQty}>Add to Cart</span>
                        :
                        <span className="button" id ="clickedButton1" style={{justifyContent:'space-between'}}>
                            <span onClick={subQty}>-</span>
                            <span>{cartQty}</span>
                            <span onClick={addQty}>+</span>
                        </span>
                        }
                        <NavLink className="button" id ="button2" to="/cart" ><span >Place Order</span></NavLink>
                    </div>
                    <p>isPresent : {isPresent.toString()}</p>
                </div>
                
                <span className={`cartPopup ${added?"visible":""}`}>
                    <FontAwesomeIcon icon={faCheck} className="check" />
                    Added to cart
                </span>
            </div>
        </div>
    );
}