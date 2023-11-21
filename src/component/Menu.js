import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({description,images,dishes,prices}) =>{
    return (
        <>
            <div className='menu'>
                <h1 className='heading'>Menu</h1>
                <MenuCard description={description} images={images} dishes={dishes} prices={prices}/> 
            </div>  
        </>
    );
}

const MenuCard = ({description,images,dishes,prices}) => {


    return  (
        <div className='menu-cards'>
            {
                dishes.map((dish,index) => {
                    return(
                        <>
                  
                        {index===0 && <h2 className='menu_sub_heading'>Starter</h2>}
                        {index===2 && <h2 className='menu_sub_heading' >Mains</h2>}
                        {index===4 && <h2 className='menu_sub_heading'>Desert</h2>}
                        <Link to= {`/${dishes[index].trim().replaceAll(' ', '_').toLowerCase()}`}>
                        <div className='menu-card'>
                            <img src={images[index]} id='card-image'/>
                            <div className='card-content'>
                                <h3 className='card-heading'>{dish}</h3>
                                <p>{description[index]}</p>
                                <span>${prices[index]}</span>
                            </div>
                        </div>
                        </Link>
                        </>
                    );                    
                })
            }
            
        </div>
    );
}

export default Menu;