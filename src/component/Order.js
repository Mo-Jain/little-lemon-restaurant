import React, { useEffect, useState } from "react";
import './Order.css'
import {
    getDocs,
    collection,
} from "firebase/firestore";
import { auth, db } from './config/firebase';

const Order = () => {
    const [orderList,setOrderList] = useState([]);

    const getOrderList = async() => {
        try{
            const dishCollectionRef = collection(db,"Buyer-Cart "+auth?.currentUser?.uid);
            const data = await getDocs(dishCollectionRef);
            const filteredData = data.docs.map((doc) =>({
                ...doc.data(),
                id:doc.id,
            }));
            setOrderList(filteredData);
        }
        catch(err){
            console.error(err);
        }
    };

    auth.onAuthStateChanged(getOrderList);
    // console.log(uid);
    
    useEffect(()=>{
        getOrderList(); 
    },[]);
  return (
    <>
      <div className='cartIndex'>    
            <h2>Your Orders</h2>
            {orderList.length<1?
            <div className="addToCart" >
                <div className='empty'>
                    <h4>Your  are yet to order anything!</h4>    
                </div>
            </div>
            :     
            <div className="addToCart" id='orderItem'>                
                <div className="items" >      
                    <div className='itemList'>
                        {orderList&&
                        orderList.map((item)=>{
                            return(
                            <div key={item.name}>
                                <Item item={item} uid={auth?.currentUser?.uid}/>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            }
        </div>   
    </>
  )
};


const Item = ({item,uid}) => {
  return (
    <>
       <div className="item">
            <div className="itemValue">
                    <span>ORDER #</span>
                    <span>TOTAL <p className="value">${item.totalPrice}</p></span>
                    <span>QUNATITY <p className="value">{item.qty}</p></span>

            </div>
            <div className="itemBody">
                <p className="itemStatus">Arrving in 30 minutes</p>
                <div className="itemContent">
                    <div className="itemImage" style={{backgroundImage: `url(${item.image})`}}/>
                    <p className='itemName'><strong>{item.name}</strong></p>
                    {(item.ingred1+item.ingred2+item.ingred3)>0?
                        <div className="itemDetails">
                            <p className='ingredHeading' >Added Ingredients</p>
                            {item.ingred1>0 &&
                            <p className="itemStock">{item.ingreds[0]} - {item.ingred1}</p>}
                            {item.ingred2>0 &&
                            <p className="itemStock">{item.ingreds[1]} - {item.ingred2}</p>}
                            {item.ingred3>0 &&
                            <p className="itemStock">{item.ingreds[2]} - {item.ingred3}</p>}
                        </div>
                    :     
                        <div className="itemDetails">
                            <p className='ingredHeading' >No added Ingredients</p>
                        </div>
                    }
                    
                    <div className="itemButtons">
                        <div className='checkout container'><button className='buttonCheckout trackButton'>Track Order</button></div>
                        <div className='checkout container'><button className='buttonCheckout viewButton'>View item</button></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
};


export default Order;
