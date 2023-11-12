import './App.css';
import Nav from './component/Nav';
import Main from './component/Main';
import Footer from './component/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [brusQty,setBrusQty] = useState(0);
  const [greekQty,setGreekQty] = useState(0);
  const [lemonQty,setLemonQty] = useState(0);
  const [cartItem,setCartItem] = useState(0);
  const [brusIngred,setBrusIngred] = useState({'1':0,'2':0,'3':0});
  const [greekIngred,setGreekIngred] = useState({'1':0,'2':0,'3':0});
  const [lemonIngred,setLemonIngred] = useState({'1':0,'2':0,'3':0});

  useEffect(()=>{
    setCartItem(brusQty+greekQty+lemonQty);
  },[brusQty,greekQty,lemonQty])
  
  return (
   <>
      <Nav cartItem={cartItem}/>
      <div className="dummy"></div>
      <Main brusIngred={brusIngred} setBrusIngred={setBrusIngred} greekIngred={greekIngred} setGreekIngred={setGreekIngred} lemonIngred={lemonIngred} setLemonIngred={setLemonIngred} brusQty={brusQty} setBrusQty={setBrusQty} greekQty={greekQty} setGreekQty={setGreekQty} lemonQty={lemonQty} setLemonQty={setLemonQty}/>
      <Footer/>
   </>
  );
}

export default App;

