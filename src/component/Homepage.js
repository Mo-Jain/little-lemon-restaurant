import Chicago from "./Chicago";
import CustomerSay from "./CustomersSay";
import Header from "./Header";
import { MenuItem } from "./MenuItem";
import Specials from "./Specials";

export default function Homepage({descriptions,images,dishes,prices,user}){
    return (
        <>
            <Header />
            <Specials descriptions={descriptions.slice(0,3)} images={images} dishes={dishes} prices={prices}/>
            <CustomerSay/>
            <Chicago/>
            
        </>
    );
}