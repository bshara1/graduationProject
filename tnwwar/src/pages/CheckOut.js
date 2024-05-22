import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Adjust the path based on your file structure

function CheckoutPage() {
    const [checkoutUrl, setCheckoutUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useAuth(); // Get authToken from context
    const navigate = useNavigate();

    const fetchCheckoutSession = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/create-checkout-session', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setCheckoutUrl(response.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError('Error fetching checkout session');
            console.error('Error fetching checkout session:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authToken) {
            fetchCheckoutSession();
        } else {
            setError('You need to be logged in to proceed to checkout.');
            setLoading(false);
        }
    }, [authToken]);

    const handleRetry = () => {
        fetchCheckoutSession();
    };

    return (
        <div className='backg center-check'>
            <div className=" checkout">
                <h1>Checkout</h1>

                <p>Complete your purchase by clicking the button below:</p>
                {loading ? (
                    <p>Transaction Under Reviwe Please Wait</p>
                ) : error ? (
                    <div>
                        <p>{error}</p>
                        <button className="btn btn-primary" onClick={handleRetry}>
                            Retry Checkout
                        </button>
                    </div>
                ) : (
                    <a href={checkoutUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        Proceed to Checkout
                    </a>
                )}
                <Link to="/cart" className="btn btn-secondary " style={{ marginLeft: "25px" }}>Back to Cart</Link>
            </div>
        </div>
    );
}

export default CheckoutPage;
