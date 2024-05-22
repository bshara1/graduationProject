import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Aside from '../components/a-sideBar/Aside';
import useTabNavigation from '../hooks/useTabNavigation';
import Header from "../components/header/header";
import RightAside from '../components/Right-aside/RightAside';
import ProductCarousel from '../components/Home/ProductCarousel';
import useAddToCart from '../hooks/useAddToCart';
import CartNotification from '../components/Cart/CartNotification';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/Home/StarRating';
import HeartButton from '../components/cards/HeartButton';
import StarRatingInput from '../components/rating/StarRatingInput';


function ProductDetails() {
    const { id } = useParams();
    const { activeTab, handleTabChange } = useTabNavigation();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [bestOfProducts, setBestOfProducts] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [showAllComments, setShowAllComments] = useState(false);
    const { addToCart, showPopup } = useAddToCart();
    const { authToken } = useAuth();

    useEffect(() => {
        // Fetch product details
        axios.get(`http://localhost:8080/productDetails/${id}`)
            .then(response => {
                const { productDetails, relatedProducts, bestOfProduct } = response.data;
                setProduct(productDetails);
                setRelatedProducts(relatedProducts);
                setBestOfProducts(bestOfProduct);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [id, newComment, authToken]);

    const handleAddToCart = async () => {
        try {
            if (product) {
                await addToCart(product._id);
                console.log('Product added to cart');
            }
        } catch (error) {
            console.error('Failed to add product to cart:', error);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/addComment/${id}`, { userComment: newComment }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            console.log('Comment added successfully');
            setNewComment('');
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    const handleShowMoreComments = () => {
        setShowAllComments(true);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                    <Aside activeTab={activeTab} handleTabChange={handleTabChange} />
                </div>
                <div className='col-sm-8'>
                    <Header />
                    <div className='products_details_container'>
                        <h2>Product Details</h2>
                        <div className='products_details_content'>
                            <div className='product_image_container'>
                                <img src={product.img_url} alt={product.product_name} />
                            </div>
                            <div className='product_details_container'>
                                <h3>{product.product_name}</h3>
                                <div className='heart-rating'>
                                    <StarRating rating={product.rating} />
                                    <HeartButton productId={product._id} />
                                </div>
                                <h5>Description</h5>
                                <p>{product.description}</p>
                                <h5>Price</h5>
                                <p>${product.price}</p>
                                <h5>Category</h5>
                                <p>{product.product_category.category_name}</p>
                                <button className="button" onClick={handleAddToCart}>
                                    Add to cart
                                    <div className="hoverEffect">
                                        <div></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className='container'>
                            <div className='comments_section'>
                                <h4>Reviews ({product.comments.length})</h4>
                                {product.comments.slice(0, showAllComments ? product.comments.length : 2).map(comment => (
                                    <div className='comment' key={comment._id}>
                                        <div className='comment-data'>
                                            <img src={comment.comment_user.profile_img} className='comment-img' alt="User" />
                                            <p className='comment_user'>{comment.comment_user.user_name}</p>
                                        </div>
                                        <p className='comment-text'>{comment.comment}</p>
                                        <p className='comment_time'>{new Date(comment.comment_At).toLocaleString()}</p>
                                    </div>
                                ))}
                                {product.comments.length === 0 && <p>No comments yet</p>}
                                {product.comments.length > 2 && !showAllComments && <a className='showmore-comments' onClick={handleShowMoreComments}>Show More Comments ...</a>}
                                <div className='comment_form'>
                                    <h4>Add a Review</h4>
                                    <form onSubmit={handleSubmitComment}>
                                        <textarea
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Write your comment here..."
                                        />
                                        <button type="submit">Submit</button>
                                    </form>
                                </div>
                            </div>
                            <StarRatingInput productId={product._id} />
                        </div>
                        <div className='container mt-5'>
                            <h2>Best of Products</h2>
                            <ProductCarousel products={bestOfProducts} />
                        </div>
                        <div className='container mt-5'>
                            <h2>Suggested Products</h2>
                            <ProductCarousel products={relatedProducts} />
                        </div>
                    </div>
                </div>
                <div className='col-sm-2'>
                    <RightAside />
                </div>
            </div>
            <CartNotification show={showPopup} message="Product added to cart" />
        </div>
    );
}

export default ProductDetails;
