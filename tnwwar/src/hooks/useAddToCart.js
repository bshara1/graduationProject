// useAddToCart.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const useAddToCart = () => {
    const { authToken } = useAuth();
    const [showPopup, setShowPopup] = useState(false);

    const addToCart = async (productId) => {
        try {
            if (!authToken) {
                // Navigate to login page if user is not authenticated
                window.location.href = '/login';
                return;
            }

            const response = await axios.post(`http://localhost:8080/cartIncrement/${productId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            // Show popup when product is successfully added to cart
            setShowPopup(true);

            // Hide popup after 3 seconds
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);

            return response.data;
        } catch (error) {
            throw new Error('Error adding to cart: ' + error.message);
        }
    };

    return { addToCart, showPopup };
};

export default useAddToCart;
