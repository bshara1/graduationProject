import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAddToCart from '../../hooks/useAddToCart';
import CartNotification from "../Cart/CartNotification";
import { useAuth } from '../../context/AuthContext';
import HeartButton from '../cards/HeartButton';
import StarRating from '../Home/StarRating';

function Offertab() {
    const [allProducts, setAllProducts] = useState([]);
    const [randomProduct, setRandomProduct] = useState(null);
    const { addToCart, showPopup } = useAddToCart();
    const { authToken } = useAuth(); // Get the authentication token from the AuthContext

    useEffect(() => {
        axios.get('http://localhost:8080/allProducts')
            .then(response => {
                setAllProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching all products:', error);
            });
    }, []);

    useEffect(() => {
        if (allProducts.length > 0) {
            const randomIndex = Math.floor(Math.random() * allProducts.length);
            setRandomProduct(allProducts[randomIndex]);
        }
    }, [allProducts]);

    const handleCardClick = () => {
        // Prevent click event propagation to avoid triggering actions on buttons
        // No need to handle the event since we're preventing propagation
    };

    const handleAddToCartClick = (event) => {
        // Prevent click event propagation to avoid navigating to the product details page
        event.stopPropagation();
        // Execute addToCart action
        addToCart(randomProduct._id);
    };

    return (
        <div onClick={handleCardClick}>
            {randomProduct ? (
                <div className="Offer-card">
                    <Link to={`/productDetails/${randomProduct._id}`}>
                        <img
                            src={randomProduct.img_url}
                            alt={randomProduct.product_name}
                        />
                    </Link>
                    <div className="offer-details">
                        <h2 className="offer_product_name">{randomProduct.product_name}</h2>
                        <p className="offer_product_description">{randomProduct.description}</p>
                        <p className="offer_product_price">Price: ${randomProduct.price}</p>
                        <StarRating rating={randomProduct.rating} />
                        <div className="offer-right-details">
                            <p className="offer_product_category"><span>Category </span>{randomProduct.product_category.category_name}</p>
                            <p className="offer_product_category"><span>Shop Name  </span>{randomProduct.shop_name}</p>
                            <p className="offer_product_location"><span>Location </span>{randomProduct.product_location}</p>
                        </div>
                        <div className="d-flex">
                            <button className="button" onClick={handleAddToCartClick}>
                                Add to cart
                                <div className="hoverEffect">
                                    <div></div>
                                </div>
                            </button>
                            <HeartButton productId={randomProduct._id} />
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <CartNotification show={showPopup} message="Product added to cart" />
        </div>
    );
}

export default Offertab;
