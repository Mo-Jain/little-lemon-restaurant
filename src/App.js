import './App.css';
import Nav from './component/Nav';
import Main from './component/Main';
import Footer from './component/Footer';
import { useEffect, useState } from 'react';
import { auth ,db} from './component/config/firebase';
import {
  getDocs,
  collection,
} from "firebase/firestore";


function App() {
  const [brusQty,setBrusQty] = useState(0);
  const [greekQty,setGreekQty] = useState(0);
  const [lemonQty,setLemonQty] = useState(0);
  const [grilledQty,setGrilledQty] = useState(0);
  const [pastaQty,setPastaQty] = useState(0);
  const [cartItem,setCartItem] = useState(0);
  const [loggedIn,setLoggedIn]= useState(false);
  const [brusIngred,setBrusIngred] = useState({'1':0,'2':0,'3':0});
  const [greekIngred,setGreekIngred] = useState({'1':0,'2':0,'3':0});
  const [lemonIngred,setLemonIngred] = useState({'1':0,'2':0,'3':0});
  const [grilledIngred,setGrilledIngred] = useState({'1':0,'2':0,'3':0});
  const [pastaIngred,setPastaIngred] = useState({'1':0,'2':0,'3':0});
  const ingred_bruschetta = ["Feta","Parmesan","Dressing"];
  const ingred_greek_salad = ["Avacado","Seeds","Dressing"];
  const ingred_lemon_desert = ["Extra cheese","Vanilla","Choclate"];
  const ingred_grilled_fish = ["Extra cheese","lemon","black pepper"];
  const ingred_pasta = ["Extra sauce","capsicum","corn"];
  const [loginOpen,setLoginOpen] = useState(false);
  const [user, setUser] = useState();
  const [userData,setUserData] = useState([]);

  function onAuthStateChanged(user) {
    setUser(user);
  }

  // function GetCurrentUser(){
  //       const [user, setUser]=useState(null);
  //       useEffect(()=>{
  //           auth.onAuthStateChanged(async(user)=>{
  //               if(user){
                    
  //                   const dishCollectionRef = collection(db,"dishes"+user?.uid);
  //                   const data = await getDocs(dishCollectionRef);
  //                   const filteredData = data.docs.map((doc) =>({
  //                       ...doc.data(),
  //                       id:doc.id,
  //                   }));
  //                   setUser(filteredData);                
  //               }
  //               else{
  //                   setUser(null);
  //               }
  //           })
  //       },[])
  //       return user;
  //   }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const getDishList = async() => {
      try{
          const dishCollectionRef = collection(db,"dishes"+user?.uid);
          const data = await getDocs(dishCollectionRef);
          const filteredData = data.docs.map((doc) =>({
              ...doc.data(),
              id:doc.id,
          }));
          setUserData(filteredData);
      }
      catch(err){
          console.error(err);
      }
  };

  auth.onAuthStateChanged(getDishList);

  useEffect(()=>{
      // console.log(user?.uid);
      getDishList();
           
  },[user])

const qty = userData.map(data=>{
  return data.qty;
})

// reducing the qty in a single value
const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

const totalQty = qty.reduce(reducerOfQty,0);

  // console.log(totalQty);
  

  useEffect(()=>{
    setCartItem(totalQty);
  },[qty])
  
  return (
   <>
      <Nav user={user} loginOpen={loginOpen} setLoginOpen={setLoginOpen} loggedIn={loggedIn} setLoggedIn={setLoggedIn} cartItem={cartItem} ingred_bruschetta ingred_greek_salad ingred_lemon_desert={ingred_lemon_desert} setBrusQty={setBrusQty} setGreekQty={setGreekQty} setLemonQty={setLemonQty}/>
      <div className="dummy"></div>
      <Main user={user} setLoginOpen={setLoginOpen} loggedIn={loggedIn} ingred_pasta={ingred_pasta} ingred_grilled_fish={ingred_grilled_fish} ingred_bruschetta={ingred_bruschetta} ingred_greek_salad={ingred_greek_salad} ingred_lemon_desert={ingred_lemon_desert} brusIngred={brusIngred} setBrusIngred={setBrusIngred} greekIngred={greekIngred} setGreekIngred={setGreekIngred} lemonIngred={lemonIngred} setLemonIngred={setLemonIngred} grilledIngred={grilledIngred} setGrilledIngred={setGrilledIngred} pastaIngred={pastaIngred} setPastaIngred={setPastaIngred} brusQty={brusQty} setBrusQty={setBrusQty} greekQty={greekQty} setGreekQty={setGreekQty} lemonQty={lemonQty} setLemonQty={setLemonQty} grilledQty={grilledQty} setGrilledQty={setGrilledQty} pastaQty={pastaQty} setPastaQty={setPastaQty}/>
      <Footer/>
   </>
  );
}

export default App;

