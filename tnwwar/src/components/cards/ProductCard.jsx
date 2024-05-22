import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAddToCart from '../../hooks/useAddToCart';
import CartNotification from '../Cart/CartNotification';
import HeartButton from '../cards/HeartButton'; // Adjust the path based on your file structure
import StarRating from '../Home/StarRating';
function ProductCard({ product }) {
    const navigate = useNavigate();
    const { addToCart, showPopup } = useAddToCart();

    const handleClick = () => {
        navigate(`/productDetails/${product._id}`);
    };

    const handleAddToCart = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            await addToCart(product._id);
            console.log('Product added to cart');
        } catch (error) {
            console.error('Failed to add product to cart:', error);
        }
    };

    const handleWishlistClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    return (
        <div className="product-card" onClick={handleClick}>
            <div className="upper-div">
                <img src={product.img_url} alt={product.product_name} className="card-img-top mx-3 product-image" />
            </div>
            <div className="card-body text-center">
                <h3 className="card-title product-name">{product.product_name}</h3>
                <div style={{overflow:"hidden" ,textOverflow:"ellipsis", maxHeight:"3em"}}> <p>{product.description}</p></div>
                <h2>${product.price}</h2>
                <div onClick={handleWishlistClick}>
                    <HeartButton productId={product._id} className="wishlist-button" />
                </div>
                <button className="button" onClick={handleAddToCart}>
                    Add to cart
                    <div className="hoverEffect">
                        <div></div>
                    </div>
                </button>
                <p>{product.product_location}</p>
                <p className='shop-name-card'>{product.shop_name}</p>
                <div style={{width:"100%",alignItems:"center", justifyContent:"center"}} className='d-flex'>
                    <StarRating rating={product.rating} />
                </div>
                <CartNotification show={showPopup} message="Product added to cart" />
            </div>
        </div>
    );
}

export default ProductCard;

