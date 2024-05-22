import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function RightAside() {
    const [dailyDeals, setDailyDeals] = useState([]);
    const [specialOfferProduct, setSpecialOfferProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all products
        axios.get('http://localhost:8080/allProducts')
            .then(response => {
                // Shuffle the products array
                const shuffledProducts = response.data.sort(() => Math.random() - 0.5);
                // Get the first 10 products for daily deals
                const randomProducts = shuffledProducts.slice(0, shuffledProducts.length/4);
                // Set the fetched random products in state for daily deals
                setDailyDeals(randomProducts);
                // Set a random product for special offer
                const randomSpecialOfferProduct = shuffledProducts[Math.floor(Math.random() * shuffledProducts.length )];
                setSpecialOfferProduct(randomSpecialOfferProduct);
            })
            .catch(error => {
                console.error('Error fetching random products:', error);
            });
    }, []);

    const handleSpecialOfferClick = () => {
        if (specialOfferProduct) {
            navigate(`/productDetails/${specialOfferProduct._id}`);
        }
    };

    return (
        <div className="r_aside-right-aside">
            <div className="special-offer-box" onClick={handleSpecialOfferClick}>
                <h4 className='special_offer_title'>Special Offer</h4>
                {specialOfferProduct && (
                    <img
                        src={specialOfferProduct.img_url}
                        alt="Special Offer"
                        className="special-offer-image" // Apply circular shape style
                    />
                )}
                <p>Buy It Now ➡️ </p>
            </div>

            <div className="r_aside-daily-deals">
                <h2>Daily Deals</h2>
                {dailyDeals.map((deal, index) => (
                    <Link key={index} to={`/productDetails/${deal._id}`} className="r_aside-deal-item-link">
                        <div className="r_aside-deal-item">
                            <img src={deal.img_url} alt={deal.product_name} className="r_aside-deal-item-img" />
                            <div className="r_aside-deal-item-info">
                                <h3>{deal.product_name}</h3>
                                <p>${deal.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RightAside;
