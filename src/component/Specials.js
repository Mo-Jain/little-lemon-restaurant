export default function Specials(){
    return (
        <div className="highlights">
            <div className="container">
            <div className="heading">
                <h2>This Weeks Specials</h2>
                <p className="button">Online Menu</p>
            </div>
            <div className="cards container">
                <div className="card">
                    <img src="assets/greek_salad.jpg" className="dish"/>
                    <div className="card-content">
                        <div className="container">
                            <h3>Greek Salad</h3>
                            <h4>$12.99</h4>
                        </div>
                        <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. 
                        </p>
                        <div className="container" id="order">
                            <span>Order a delivery</span>
                            <img className="icon" src="assets/bike_icon.jpg" />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="assets/Bruchetta.jpg" className="dish"/>
                    <div className="card-content">
                        <div className="container">
                            <h3>Bruchetta</h3>
                            <h4>$7.99</h4>
                        </div>
                        <p>Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Topped with chopped tomatoes, oregano and fresh bazil.
                            
                        </p>
                        <div className="container" id="order">
                        <span>Order a delivery</span>
                            <img className="icon" src="assets/bike_icon.jpg" />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <img src="assets/lemon_dessert.jpg" className="dish"/>
                    <div className="card-content">
                        <div className="container">
                            <h3>Lemon dessert</h3>
                            <h4>$5.99</h4>
                        </div>
                        <p>Our trademark dessert coming right from best chefs kitchen to fulfill cravings with the pinch of lemon in it.</p>
                        <div className="container" id="order">
                        <span>Order a delivery</span>
                            <img className="icon" src="assets/bike_icon.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}