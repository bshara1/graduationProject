// CartNotification.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


function CartNotification({ show, message }) {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // Hide after 3 seconds
        return () => clearTimeout(timer);
    }, [show]);

    return (
        <>
            {isVisible && (
                <div className="cart-notification-overlay">
                    <div className="cart-notification">
                        <FontAwesomeIcon icon={faCheckCircle} className="notification-icon" />
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default CartNotification;
