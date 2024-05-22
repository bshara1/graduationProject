import { useState } from 'react';
import axios from 'axios';

const useRemoveFromWishlist = (authToken) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const removeFromWishlist = async (itemId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.delete(`http://localhost:8080/deleteFromWishlist/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (response.status === 200) {
                setSuccess(true);
            } else {
                setSuccess(false);
                setError('Failed to remove item from wishlist');
            }
        } catch (error) {
            setSuccess(false);
            setError('Failed to remove item from wishlist');
            console.error('Error removing item from wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    return { removeFromWishlist, loading, error, success };
};

export default useRemoveFromWishlist;
