import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass } from '@fortawesome/free-solid-svg-icons';

const AccountReviewModal = ({ isOpen }) => {
    const navigate = useNavigate();

    useEffect(() => {
        let timeoutId;
        if (isOpen) {
            timeoutId = setTimeout(() => {
                navigate('/login'); // Navigate to /login after three seconds
            }, 3000);
        }

        return () => {
            clearTimeout(timeoutId); // Clear the timeout when the component unmounts or when isOpen changes
        };
    }, [isOpen, navigate]);

    if (!isOpen) return null;

    return (
        <div className="signup-seller-modal">
            <div className="signup-seller-modal-content">
                <div className="signup-seller-modal-icon">
                    <FontAwesomeIcon icon={faHourglass} spin />
                </div>
                <div className="signup-seller-modal-text">
                    Your Account is Under Review
                </div>
            </div>
        </div>
    );
};

export default AccountReviewModal;
