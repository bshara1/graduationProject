import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';


const StarRatingInput = ({ productId }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const { authToken } = useAuth();

    const handleRatingSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/addRating/${productId}`, { userRating: rating }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (response.status === 201) {
                alert('Rating submitted successfully');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401 && error.response.data === 'you dont puy this product to make a rating') {
                    alert('You need to purchase this product before rating.');
                } else if (error.response.status === 401 && error.response.data === 'you have rate this product before') {
                    alert('You have already rated this product.');
                } else {
                    alert('Failed to submit rating.');
                }
            } else {
                console.error('Error submitting rating:', error);
                alert('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="star-rating-input">
            <h4>Rate this product</h4>
            <div className="stars">
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;

                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                                style={{ display: 'none' }} // Hide the radio input
                            />
                            <span
                                className={`star ${ratingValue <= (hoverRating || rating) ? 'filled' : ''}`}
                                onMouseEnter={() => setHoverRating(ratingValue)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(ratingValue)}
                            >
                                &#9733;
                            </span>
                        </label>
                    );
                })}
            </div>
            <button onClick={handleRatingSubmit} disabled={rating === 0} className='rating-btn'>
                Submit Rating
            </button>
        </div>
    );
};

export default StarRatingInput;
