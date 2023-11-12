import Chicago from "./Chicago";
import CustomerSay from "./CustomersSay";
import Header from "./Header";
import { MenuItem } from "./MenuItem";
import Specials from "./Specials";

export default function Homepage(){
    return (
        <>
            <Header />
            <Specials />
            <CustomerSay/>
            <Chicago/>
            
        </>
    );
}