import React from 'react';

function DeleteConfirmationPopup({ isOpen, onCancel, onConfirm }) {
    return (
        <div className={`popup ${isOpen ? 'open' : ''}`}>
            <div className="popup-content">
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this item?</p>
                <div className="popup-buttons">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationPopup;
