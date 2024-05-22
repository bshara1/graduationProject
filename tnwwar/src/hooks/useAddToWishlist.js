// useAddToWishlist.js
import { useState } from 'react';
import axios from 'axios';

const useAddToWishlist = (authToken) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const addToWishlist = async (itemId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`http://localhost:8080/addToWishlist/${itemId}`, null, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                setSuccess(true);
            } else {
                setSuccess(false);
                setError('Failed to add item to wishlist');
            }
        } catch (error) {
            setSuccess(false);
            setError('Failed to add item to wishlist');
            console.error('Error adding item to wishlist:', error);
        } finally {
            setLoading(false);
        }
    };


    return { addToWishlist, loading, error, success };
};

export default useAddToWishlist;
