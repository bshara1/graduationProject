import React from 'react';

const AccountReviewModal = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="signup-seller-modal">
            <div className="signup-seller-modal-content">
                <div className="signup-seller-modal-icon">
                   
                </div>
                <div className="signup-seller-modal-text">
                    Your Account is Under Review
                </div>
            </div>
        </div>
    );
};

export default AccountReviewModal;
