import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Adjust the path based on your file structure
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const HeartButton = ({ productId, onWishlistChange }) => {
    const { authToken } = useAuth();
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await axios.get('http://localhost:8080/wishlist', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const wishlist = response.data;
                setIsInWishlist(wishlist.some(item => item._id === productId));
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        fetchWishlist();
    }, [authToken, productId]);

    const handleWishlistToggle = async () => {
        try {
            if (isInWishlist) {
                await axios.delete(`http://localhost:8080/deleteFromWishlist/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
            } else {
                await axios.post(`http://localhost:8080/addToWishlist/${productId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
            }

            setIsInWishlist(!isInWishlist);
            onWishlistChange();
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };

    return (
        <button onClick={handleWishlistToggle} className='fav-btn'>
            <FontAwesomeIcon icon={isInWishlist ? solidHeart : regularHeart} />
        </button>
    );
};

export default HeartButton;
