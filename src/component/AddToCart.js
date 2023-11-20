import { useEffect, useState } from 'react';
import './AddToCart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
const AddToCart  = ({loggedIn,setLoginOpen,ingred_bruschetta,ingred_greek_salad,ingred_lemon_desert,images,brusQty,setBrusQty,greekQty,setGreekQty,lemonQty,setLemonQty,brusIngred,setBrusIngred,greekIngred,setGreekIngred,lemonIngred,setLemonIngred,ingred_pasta,ingred_grilled_fish,grilledIngred,setGrilledIngred,pastaIngred,setPastaIngred,grilledQty,setGrilledQty,pastaQty,setPastaQty}) =>{
    const brusIngredQty = Object.values(brusIngred).reduce((a, b) => a + b);
    const greekIngredQty = Object.values(greekIngred).reduce((a, b) => a + b);
    const lemonIngredQty = Object.values(lemonIngred).reduce((a, b) => a + b);
    const grilledIngredQty = Object.values(grilledIngred).reduce((a, b) => a + b);
    const pastaIngredQty = Object.values(pastaIngred).reduce((a, b) => a + b);
    const [sumIngred,setSumIngred] = useState(0);
    const [sumQty,setSumQty] = useState(0.00);
    
    const handleCheckout = ()=>{
        if(!loggedIn){
            setLoginOpen(true);
        }
    }

    useEffect(()=>{
        setSumIngred(brusIngredQty*brusQty+greekIngredQty*greekQty+lemonIngredQty*lemonQty+grilledIngredQty*grilledQty+pastaIngredQty*pastaQty);
        setSumQty(12.99*greekQty+7.99*brusQty+5.99*lemonQty+20.00*grilledQty+18.99*pastaQty);       
    })
    
    
    return (
        <div className='cartIndex'>
            <h2>Food Order</h2>
            {sumQty?
            
            <div className="addToCart" >
                <div className="items">
                    
                    <div className='cutlery'>
                        <h5>Cutlery</h5>
                        <div className='cutleryRadio'>
                            <label htmlFor='cutlerySelect'>Help reduce plastic waste. only only ask for cutelry if you need it </label>
                            <input type='radio' className='cutlerySelect'/>
                        </div>
                    </div>
                    <h3>Order Summary</h3>
                    <div className='itemList'>
                        <Item name='GreekSalad' price='12.99' ingreds={ingred_greek_salad} image={images[0]} qty={greekQty} setQty={setGreekQty} ingredQty={greekIngred} setIngredQty={setGreekIngred}/>
                        <Item name='Bruschetta' price='7.99' ingreds={ingred_bruschetta} image={images[1]} qty={brusQty} setQty={setBrusQty}  ingredQty={brusIngred} setIngredQty={setBrusIngred}/>
                        <Item name='Lemon Desert' price='5.99' ingreds={ingred_lemon_desert} image={images[2]} qty={lemonQty} setQty={setLemonQty}  ingredQty={lemonIngred} setIngredQty={setLemonIngred}/>
                        <Item name='Grilled Fish' price='20.00' ingreds={ingred_grilled_fish} image={images[3]} qty={grilledQty} setQty={setGrilledQty}  ingredQty={grilledIngred} setIngredQty={setGrilledIngred}/>
                        <Item name='Pasta' price='18.99' ingreds={ingred_pasta} image={images[4]} qty={pastaQty} setQty={setPastaQty}  ingredQty={pastaIngred} setIngredQty={setPastaIngred}/>
                    </div>
                </div>
                <div className="priceDetail">
                    <h3>Price Details</h3>

                    <div className='prices'>
                        <div className='price'>
                            <span>Price</span>
                            <span>${Number((sumQty).toFixed(2))}</span>
                        </div>
                        <div className='price'>
                            <span>Additional Ingredient</span>
                            <span>${sumIngred}.00</span>
                        </div>
                        <div className='price'>
                            <span>Delievry</span>
                            <span>Free</span>
                        </div>
                        <div className='totalPrice'>
                            <strong><span>Total Amount</span></strong>
                            <strong><span>${Number((sumQty+sumIngred).toFixed(2))}</span></strong>
                            
                        </div>
                    </div>
                    <div className='checkout container'><button className='buttonCheckout' onClick={handleCheckout}>CheckOut</button></div>
                </div>
            </div>
            :
            <div className="addToCart items" id='cart' >
                <div className='empty'>
                    <h4>Your Cart is Empty!</h4>
                </div>
            </div>
            }
        </div>
    );
}

const Item = ({name,price,ingreds,image,qty,setQty,ingredQty,setIngredQty}) =>{
    const [overlay,setOverlay] = useState(false);
    const [popup,setPopup] = useState(false);
    const [isFavorite,setIsFavorite] = useState(false);
    const [markFavorite,setMarkFavorite] = useState(true);
    const handleRemove = () =>{
        setOverlay(!overlay);
        setPopup(!popup);
    }

    const handleOk = () =>{
        setOverlay(!overlay);
        setPopup(!popup);
        setQty(0);
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

    return (
        <>
        {qty>0?
        <div className="item">
            <div className="itemContent">
                <div className="itemImage" style={{backgroundImage: `url(${image})`}}/>
                <div className="itemDetails">
                    <p className='itemName'><strong>{name}</strong></p>
                    <p className='itemStock'>In Stock</p>
                    <p className='ingredHeading' >Additional Ingredient</p>
                    {ingreds.map((ingred,index) =>{
                        return(
                        <div className="addditionalIngred">
                            <span className='ingredName'>{ingred}</span>
                            {ingredQty[`${index+1}`]>0?
                            <>
                                <span className='ingredQtyChange' onClick={()=>setIngredQty({...ingredQty,[`${index+1}`]:ingredQty[`${index+1}`]-1})}>-</span>
                                <span className='ingredQty'>{ingredQty[index+1]}</span>
                                <span className='ingredQtyChange' onClick={()=>setIngredQty({...ingredQty,[`${index+1}`]:ingredQty[`${index+1}`]+1})}>+</span>
                                <button className="ingredButton" onClick={()=>setIngredQty({...ingredQty,[`${index+1}`]:0})}>Remove</button>
                            </>
                            :
                            <button className="addIngred" onClick={()=>setIngredQty({...ingredQty,[`${index+1}`]:ingredQty[`${index+1}`]+1})} >Add</button>
                            }
                            
                        </div>);
                    })}
                </div>
                <div className="itemPrice">
                    <b><p >${price}</p></b>
                    <p className='shipping'>Free Shipping</p>
                </div>
            </div>
            <div className="itemButtons">
                <span className="itemQty">
                    <span className='qtyChange' onClick={()=> setQty(qty-1)}>-</span>
                    <span className='qty'>{qty}</span>
                    <span className='qtyChange' onClick={()=> setQty(qty+1)}>+</span>
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