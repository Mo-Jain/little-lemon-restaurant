export default function Specials(){
    return (
        <div className="highlights">
            <div className="container">
            <div className="heading">
                <h2>This Weeks Specials</h2>
                <p className="button">Online Menu</p>
            </div>
            <div className="card container">
                <div>
                    <img src="assets/greek_salad.jpg" className="dish"/>
                    <div className="cards">
                        <div className="container">
                            <h3>Greek Salad</h3>
                            <h4>$12.99</h4>
                        </div>
                        <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. 
                        </p>
                        <div className="container">
                            <span>Order a delivery</span>
                            <img className="icon" src="assets/bike_icon.jpg" />
                        </div>
                    </div>
                </div>
                <div>
                    <img src="assets/Bruchetta.jpg" className="dish"/>
                    <div className="cards">
                        <div className="container">
                            <h3>Greek Salad</h3>
                            <h4>$7.99</h4>
                        </div>
                        <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. 
                        </p>
                        <div className="container">
                        <span>Order a delivery</span>
                            <img className="icon" src="assets/bike_icon.jpg" />
                        </div>
                    </div>
                </div>
                <div>
                    <img src="assets/lemon_dessert.jpg" className="dish"/>
                    <div className="cards">
                        <div className="container">
                            <h3>Greek Salad</h3>
                            <h4>$5.99</h4>
                        </div>
                        <p>Our trademark dessert coming right from best chefs kitchen to fulfill cravings with the pinch of lemon in it.</p>
                        <div className="container">
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