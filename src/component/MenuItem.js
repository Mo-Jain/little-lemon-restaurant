import { useState } from "react";
import "./MenuItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function MenuItem({price,additional,desc,heading,image,cartQty,setCartQty,ingred,setIngred}){
    

    const [added,setAdded] = useState(false);



    const addQty = () =>{
        
        setCartQty(cartQty+1);
        if(cartQty===0){
            setAdded(true);
            setTimeout(()=>{
                setAdded(false);
            },1500);
        }
    }
    const subQty = () =>{
        
        setCartQty(cartQty-1);
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
                    return(<p className="additional-ingredient" key={item}>
                        <label htmlFor="additional-ingredient-price">
                            <span>{item}</span>
                            <span>$1.00</span>
                        </label>
                        {ingred[`${index+1}`]===0 ?
                        <button className="additional-ingredient-add" onClick={()=>setIngred({...ingred,[`${index+1}`]:ingred[`${index+1}`]+1})} >Add</button>
                        :
                        <div className="additional-ingredient-added">
                            <span onClick={()=>setIngred({...ingred,[`${index+1}`]:ingred[`${index+1}`]-1})}>-</span>
                            <span>{ingred[index+1]}</span>
                            <span onClick={()=>setIngred({...ingred,[`${index+1}`]:ingred[`${index+1}`]+1})}>+</span>
                        </div>
                        }
                        </p>);
                    })}
                </div>
                <div className="main">
                    <div className="menu-item-delivery">
                        <p>Delivery Time: <span>20 minutes</span></p>
                        <span className="button">Change</span>
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
                        <span className="button" id ="button2">Place Order</span>
                    </div>
                </div>
                
                <span className={`cartPopup ${added?"visible":""}`}>
                    <FontAwesomeIcon icon={faCheck} className="check" />
                    Added to cart
                    </span>
            </div>
        </div>
    );
}